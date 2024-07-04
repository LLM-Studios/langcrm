import {
  deleteSchemaKeyVector,
  searchSchemaKeyVectors,
  upsertKeyVector,
} from "./vectors";
import { Key, prisma, Prisma } from "@repo/database/prisma";

const getSchema = async (workspaceId: string, keys?: string[]) => {
  const schema = await prisma.key.findMany({
    where: {
      workspaceId,
      ...(keys && { id: { in: keys } }),
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!schema) {
    throw new Error("Failed to fetch schema");
  }

  return schema;
};

const getKey = async (workspaceId: string, key: string) => {
  const schemaKey = await prisma.key.findUnique({
    where: {
      id_workspaceId: {
        id: key,
        workspaceId,
      },
    },
  });

  if (!schemaKey) {
    throw new Error("Failed to fetch schemaKey");
  }

  return schemaKey;
};

const upsertKey = async (
  workspaceId: string,
  keyId: string,
  keyData: Omit<Prisma.KeyUpsertArgs["create"], "workspaceId" | "id">,
) => {
  const key = await prisma.key.upsert({
    where: {
      id_workspaceId: {
        id: keyId,
        workspaceId: workspaceId,
      },
    },
    update: keyData,
    create: { ...keyData, workspaceId, id: keyId } as Prisma.KeyCreateInput,
  });

  if (!key) {
    throw new Error("Failed to upsert schema key");
  }

  upsertKeyVector(key);

  return key;
};

const updateKey = async (
  workspaceId: string,
  key: string,
  data: Prisma.KeyUpdateInput,
) => {
  const schemaKey = await prisma.key.update({
    where: {
      id_workspaceId: {
        id: key,
        workspaceId,
      },
    },
    data,
  });

  if (!schemaKey) {
    throw new Error("Failed to update schema key");
  }

  upsertKeyVector(schemaKey);

  return schemaKey;
};

const deleteKey = async (workspaceId: string, key: string) => {
  const data = await prisma.key.delete({
    where: {
      id_workspaceId: {
        id: key,
        workspaceId,
      },
    },
  });

  if (!data) {
    throw new Error("Failed to delete key");
  }

  deleteSchemaKeyVector(key, workspaceId);

  return data;
};

const searchKeys = async (workspaceId: string, query: string): Promise<Key[]> => {
  const keyVectors = await searchSchemaKeyVectors(query, workspaceId);

  const keys = await prisma.key.findMany({
    where: {
      workspaceId,
      id: {
        in: keyVectors.map((keyVector) => keyVector.id as string),
      },
    },
  });

  return keys;
};

// const searchRelevantKeys = async (
//   workspaceId: string,
//   input: string,
// ): Promise<Key[]> => {
//   const keys = await generateKeys(input);

//   const result = (
//     await Promise.all(
//       keys.map((key) =>
//         searchKeys(workspaceId, `${key.key}: ${key.description}`),
//       ),
//     )
//   )
//     .flat()
//     .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

//   return result;
// };

export default {
  getSchema,
  getKey,
  upsertKey,
  updateKey,
  deleteKey,
  searchKeys,
};
