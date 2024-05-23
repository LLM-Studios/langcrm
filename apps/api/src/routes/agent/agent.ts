import { Agent } from "$modules/agent";
import { logger } from "$lib/logger";
import prisma from "@repo/database/prisma";
import { Priority } from "@prisma/client";
import { ChatCompletionMessageParam, ChatCompletionTool } from "openai/src/resources/chat/index.js";

const system_prompt = "Your task is to extract information about the user from their input and use your tools to update the database schema accordingly. For creating new keys, use the 'extend_schema' tool. For updating existing keys, use the 'update_schema' tool. ";

const tools = [ 
    {
      type: "function",
      function: {
        name: "extend_schema",
        description: "Create a new key in the schema and assign a value to it. Can not be used to update existing keys.",
        parameters: {
          type: "object",
          properties: {
            key: {
                type: "string",
                description: "The key to extend the schema with.",
            },
            value: {
                type: "string",
                description: "The value to extend the schema with.",
            },
            description: {
                type: "string",
                description: "The description of the key to extend the schema with.",
            },
            type: {
                type: "string",
                description: "The type of the key to extend the schema with.",
            },
            priority: {
                enum: ["VERY_LOW", "LOW", "MEDIUM", "HIGH", "REQUIRED"],
                description: "The priority of the key to extend the schema with. Defaults to LOW.",
            }
          },
          required: ["key", "value", "description", "type"],
        },
      }
    },
    {
      type: "function",
      function: {
        name: "update_schema",
        description: "Update an existing key in the database with the given value. Can not be used to extend the schema.",
        parameters: {
          type: "object",
          properties: {
            key: {
                type: "string",
                description: "The key to use to update the database.",
            },
            value: {
                type: "string",
                description: "The value to update the database with.",
            }
          },
          required: ["key", "value"],
        },
      }
    }
] as ChatCompletionTool[];

const functions = {
    extend_schema: async (params: {key: string, value: string, description: string, type: string, priority: Priority}, metadata: {distinctId: string}) => {
        logger.debug({ msg: 'Extending schema', params, metadata });
        const { key, value, description, type, priority } = params;
        await prisma.key.create({
            data: { 
              id: key, 
              description,
              type,
              priority,
              values: {
                create: {  
                  value, 
                  distinctId: metadata.distinctId 
                }
              }
            }
        }).catch((error) => {
          logger.error({ msg: 'Failed to update schema', params, error });
          return 'Failed'
        });
        return 'Success'
    },
    update_schema: async (params: {key: string, value: string}, metadata: {distinctId: string}) => {
        logger.debug({ msg: 'Updating schema', params, metadata });
        const { key, value } = params;
        await prisma.value.create({
            data: { 
              key: { 
                connect: { 
                  id: key 
                } 
              },
              value,
              distinctId: metadata.distinctId
            }
        }).catch((error) => {
            logger.error({ msg: 'Failed to update schema', params, error });
            return 'Failed'
        });
        return 'Success'
    }
} as Record<string, (..._args: any[]) => Promise<string>>;

const examples = [
    { role: "system", content: "---Start of examples---" },
    { role: "user", content: "Plan a trip to Berlin." },
    { role: "assistant", content: "", tool_calls: [
      {
        id: "example-1",
        type: "function",
        function: {
          name: "extend_schema",
          arguments: JSON.stringify({ 
            key: "upcoming-travel-destination", 
            value: "Berlin",
            description: "The destination of the user's upcoming trip.",
            type: "string",
            priority: "MEDIUM"
          })
        }
      }
    ], },
    { role: "tool", tool_call_id: "example-1", content: "Success" },
    { role: "assistant", content: "Here are the most interesting things to do in Berlin ..." },
    { role: "user", content: "I think I'd rather visit Hamburg." },
    { role: "assistant", content: "", tool_calls: [
      {
        id: "example-3",
        type: "function",
        function: {
          name: "update_schema",
          arguments: JSON.stringify({ 
            key: "upcoming-travel-destination", 
            value: "Hamburg",
          })
        }
      }
    ], },
    { role: "tool", tool_call_id: "example-3", content: "Success" },
    { role: "assistant", content: "Ok, let's plan a trip to Hamburg ..." },
    { role: "user", content: "What are the best vegan restaurants in Hamburg?" },
    { role: "assistant", content: "", tool_calls: [
      {
        id: "example-2",
        type: "function",
        function: {
          name: "extend_schema",
          arguments: JSON.stringify({ 
            key: "food-preferences", 
            value: "vegan",
            description: "The user's food preferences.",
            type: "string",
            priority: "HIGH"
          })
        }
      }
    ], },
    { role: "tool", tool_call_id: "example-2", content: "Success" },
    { role: "assistant", content: "Here are the best vegan restaurants in Hamburg ..." },
    { role: "system", content: "---End of examples---" },
] as ChatCompletionMessageParam[];
 
const agent = new Agent({ 
    model: "gpt-3.5-turbo", 
    system_prompt: system_prompt,
    tools: tools,
    functions: functions,
    examples: examples
});

export default agent;

