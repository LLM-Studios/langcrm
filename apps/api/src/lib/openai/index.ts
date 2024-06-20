import OpenAI from "openai";
import { observeOpenAI } from "langfuse";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
	throw new Error("OPENAI_API_KEY is required");
}

export const getOpenaiClient = (
	userId?: string,
	sessionId?: string,
	metadata?: Record<string, any>
) =>
	observeOpenAI(
		new OpenAI({
			apiKey: OPENAI_API_KEY,
		}),
		{
			metadata,
			userId,
			sessionId,
		}
	);
