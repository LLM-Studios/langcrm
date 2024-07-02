import { getOpenaiClient } from "$lib/openai";
import { Key } from "@repo/database/prisma";
import { Index } from "@upstash/vector";

const UPSTASH_VECTOR_REST_URL = process.env.UPSTASH_VECTOR_REST_URL;
const UPSTASH_VECTOR_REST_TOKEN = process.env.UPSTASH_VECTOR_REST_TOKEN;

if (!UPSTASH_VECTOR_REST_URL) {
	throw new Error("UPSTASH_VECTOR_REST_URL is required");
}

if (!UPSTASH_VECTOR_REST_TOKEN) {
	throw new Error("UPSTASH_VECTOR_REST_TOKEN is required");
}

export const vectorIndex = new Index({
	url: UPSTASH_VECTOR_REST_URL,
	token: UPSTASH_VECTOR_REST_TOKEN,
});

export const generateEmbeddingVector = async (text: string) => {
	return await getOpenaiClient()
		.embeddings.create({
			input: text,
			model: "text-embedding-3-large",
			dimensions: 1536,
		})
		.then((response) => {
			const embedding = response.data[0];
			if (!embedding) {
				throw new Error("Failed to generate embedding");
			}
			return embedding.embedding;
		});
};

export const upsertKeyVector = async (key: Key) => {
	return await vectorIndex.upsert(
		{
			id: key.id,
			vector: await generateEmbeddingVector(
				key.id + ": " + key.description + " " + key.tags.join(" ")
			),
			metadata: {
				tags: key.tags,
				priority: key.priority,
			},
		},
		{
			namespace: key.workspaceId,
		}
	);
};

export const searchSchemaKeyVectors = async (
	query: string,
	workspaceId: string,
	filter?: string,
	options: {
		topK: number;
		minScore?: number;
	} = {
		topK: 10,
		minScore: 0.7,
	}
) => {
	return await vectorIndex
		.query(
			{
				vector: await generateEmbeddingVector(query),
				topK: options.topK,
				filter,
			},
			{
				namespace: workspaceId,
			}
		)
		.then((response) => {
			return response.filter(
				(result) => !options.minScore || result.score > options.minScore
			);
		});
};

export const deleteSchemaKeyVector = async (
	key: string,
	workspaceId: string
) => {
	return await vectorIndex.delete(key, {
		namespace: workspaceId,
	});
};
