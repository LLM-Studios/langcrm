import { prisma } from "@repo/database/prisma";

const getValues = async (
  workspaceId: string,
  distinctId: string,
  keyIds?: string[],
) => {
  const schemaKeys = await prisma.key.findMany({
    where: {
      workspaceId: workspaceId,
      ...(keyIds && { id: { in: keyIds } }),
    },
    include: {
      values: {
        where: {
          distinctId: distinctId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  if (!schemaKeys) {
    throw new Error("Failed to fetch schema keys");
  }

  return schemaKeys;
};

const getData = async (
  workspaceId: string,
  distinctId?: string,
  keyIds?: string[],
) => {
  const data = await prisma.value.findMany({
    where: {
      workspaceId,
      ...(distinctId && { distinctId }),
      ...(keyIds && { keyId: { in: keyIds } }),
    },
  });

  if (!data) {
    throw new Error("Failed to fetch data");
  }

  return data;
};

const updateValue = async (
  workspaceId: string,
  distinctId: string,
  keyId: string,
  value: string,
) => {
  const data = await prisma.value.upsert({
    where: {
      id: keyId,
    },
    create: {
      keyId,
      workspaceId,
      distinctId,
      value,
    },
    update: {
      key: {
        connect: {
          id_workspaceId: {
            id: keyId,
            workspaceId,
          },
        },
      },
      value,
      distinctId: distinctId,
      workspace: {
        connect: {
          id: workspaceId,
        },
      },
    },
  });

  if (!data) {
    throw new Error("Failed to update data");
  }

  return data;
};

const deleteData = async (
  workspaceId: string,
  distinctId: string,
  keys?: string[],
) => {
  const data = await prisma.value.deleteMany({
    where: {
      workspaceId,
      distinctId,
      ...(keys && { keyId: { in: keys } }),
    },
  });

  if (!data) {
    throw new Error("Failed to delete data");
  }

  return data;
};

export default {
  getValues,
  getData,
  updateValue,
  deleteData,
};
