import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { Key } from "@repo/database/prisma";

const systemPrompt = () =>
  `You are a data scientist working for a company that provides a platform for users to store and analyze context data. You have been tasked with updating the provided schema for a user based on the input data.`;

const userTemplate = (input: string, schema: string) =>
  `Schema: ${schema}
Input: ${input}

Based on the schema provided, extract all relevant information about the user, their preferences, their behavior, their context, their environment or other relevant data for the langCRM system from the input.`;

export const extractKeyData = async (input: string, key: Key) => {
  const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
  });

  const messages = [new SystemMessage(systemPrompt()), new HumanMessage()];

  const response = await model.invoke(messages);

  return (response.content as string).replace(key.id + ":", "");
};
