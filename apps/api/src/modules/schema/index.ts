import { searchSchemaKeyVectors, upsertKeyVector } from "./vectors";
import { prisma, Prisma } from "@repo/database/prisma";

const getSchema = async (workspaceId: string) => {
	const schema = await prisma.key.findMany({
		where: {
			workspaceId,
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

const upsertKey = async (createKeyData: Prisma.KeyCreateManyInput) => {
	const data = await prisma.key.upsert({
		where: {
			id_workspaceId: {
				id: createKeyData.id,
				workspaceId: createKeyData.workspaceId,
			},
		},
		update: createKeyData,
		create: createKeyData,
	});

	if (!data) {
		throw new Error("Failed to upsert schema key");
	}

	upsertKeyVector(data);

	return data;
};

const getValues = async (workspaceId: string, distinctId: string) => {
	const schemaKeys = await prisma.key.findMany({
		where: {
			workspaceId: workspaceId,
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
	keys?: string[]
) => {
	const data = await prisma.value.findMany({
		where: {
			workspaceId,
			...(distinctId && { distinctId }),
			...(keys && { keyId: { in: keys } }),
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
	key: string,
	value: string
) => {
	const data = await prisma.value.create({
		data: {
			key: {
				connect: {
					id_workspaceId: {
						id: key,
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

const deleteData = async (workspaceId: string, distinctId: string) => {
	const data = await prisma.value.deleteMany({
		where: {
			workspaceId,
			distinctId,
		},
	});

	if (!data) {
		throw new Error("Failed to delete data");
	}

	return data;
};

const searchKeys = async (workspaceId: string, query: string) => {
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

export default {
	getSchema,
	getData,
	upsertKey,
	getValues,
	updateValue,
	deleteData,
	searchKeys,
};
