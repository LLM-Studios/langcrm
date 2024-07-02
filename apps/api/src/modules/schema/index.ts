import { generateSearchKeyQueries } from "$modules/schema/search-key-generator";
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
	keyData: Omit<Prisma.KeyUpsertArgs["create"], "workspaceId" | "id">
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
	data: Prisma.KeyUpdateInput
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

const getValues = async (
	workspaceId: string,
	distinctId: string,
	keys?: string[]
) => {
	const schemaKeys = await prisma.key.findMany({
		where: {
			workspaceId: workspaceId,
			...(keys && { id: { in: keys } }),
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

const searchRelevantKeys = async (workspaceId: string, input: string) => {
	const searchKeyQueries = await generateSearchKeyQueries(input);

	return Promise.all(
		searchKeyQueries.map((k) => searchKeys(workspaceId, k))
	).then((keys) => keys.flat());
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

export default {
	getSchema,
	getData,
	getKey,
	upsertKey,
	getValues,
	updateValue,
	deleteData,
	searchKeys,
	searchRelevantKeys,
	deleteKey,
	updateKey,
};
