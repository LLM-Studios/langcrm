import { Agent } from "$modules/agent";
import { Key } from "@repo/database/prisma";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const system_prompt = (
  args: Record<string, any>,
) => `Your job is to generate a JSON object for a given key. The object should follow the following format:

Schema:
{
  "type": "object",
  "properties": {
    "id": {
        "type": "string",
        "description": "Name of the key."
    },
    "description": {
        "type": "string",
        "description": "Detailed information about the key’s purpose and usage."
    },
    "priority": {
        "type": "string",
        "enum": ["REQUIRED", "HIGH", "MEDIUM", "LOW"],
        "description": "Priority level of the key."
    },
    "tags": {
        "type": "array",
        "items": {
            "type": "string"
        },
        "description": "Tags associated with the key."
    },
    "type": {
        "type": "string",
        "enum": ["TEXT", "NUMBER", "BOOLEAN"],
        "description": "Type of the key."
    }
  },
  "required": ["name", "description", "priority", "tags", "type"]
}

Follow these guidelines when generating keys:
1. Do not include information in the key name, f.e. "personal.language.german" should instead be "personal.language" because "german" is a value not a key.
2. The description should be general and not specific to a value.
3. Judge the priority of the key based on the current schema values as well as common sense. Personally identifiable information should be of high priority.
4. Use thematic tags to categorize the key. These should be general enough to cover all possible values of the key.
5. The type of the key should be the most appropriate type for the value.
`;

const examples = [
  {
    role: "user",
    content:
      "- name: personal.language\n- description: Language of the user\n- value: German",
  },
  {
    role: "assistant",
    content: JSON.stringify({
      id: "personal.language",
      description: "Language of the user",
      priority: "HIGH",
      tags: ["personal", "language"],
      type: "TEXT",
    }),
  },
  {
    role: "user",
    content:
      "- name: personal.age\n- description: Age of the user\n- value: 30",
  },
  {
    role: "assistant",
    content: JSON.stringify({
      id: "personal.age",
      description: "Age of the user",
      priority: "REQUIRED",
      tags: ["personal", "age"],
      type: "NUMBER",
    }),
  },
  {
    role: "user",
    content:
      "- name: contact.email\n- description: Email address of the user\n- value: user@example.com",
  },
  {
    role: "assistant",
    content: JSON.stringify({
      id: "contact.email",
      description: "Email address of the user",
      priority: "HIGH",
      tags: ["contact", "email", "pii"],
      type: "TEXT",
    }),
  },
  {
    role: "user",
    content:
      "- name: personal.age\n- description: Age of the user\n- value: 30",
  },
  {
    role: "assistant",
    content: JSON.stringify({
      id: "personal.age",
      description: "Age of the user",
      priority: "HIGH",
      tags: ["personal", "age"],
      type: "NUMBER",
    }),
  },
  {
    role: "user",
    content:
      "- name: preferences.newsletter\n- description: User's preference for receiving newsletters\n- value: true",
  },
  {
    role: "assistant",
    content: JSON.stringify({
      id: "preferences.newsletter",
      description: "User's preference for receiving newsletters",
      priority: "MEDIUM",
      tags: ["preferences", "newsletter"],
      type: "BOOLEAN",
    }),
  },
] as ChatCompletionMessageParam[];

export const agent = new Agent({
  system_prompt,
  examples,
});

export const generateKey = async (input: string) => {
  const response = await agent.invoke({
    messages: [
      {
        role: "user",
        content: input,
      },
    ],
  });

  if (!response) {
    throw new Error("No response from agent");
  }

  const result = JSON.parse(response) as Omit<
    Key,
    "workspaceId" | "createdAt" | "updatedAt"
  >;

  return result;
};
