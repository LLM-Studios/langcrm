import { Agent } from "$modules/agent";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { Key, Value } from "@prisma/client";

const system_prompt = (args: Record<string, any>) =>
  `Your task is to extract information from the user input. You will be given a key and a description of the information to extract along with the current value of the key and its type.

Your output object should follow the following format:

Schema:
{
  "type": "object",
  "properties": {
    "key": {
        "type": "string",
        "description": "The key of the information to extract."
    },
    "value": {
        "type": "any",
        "description": "The value of the key."
    },
    "type": {
        "type": "string",
        "enum": ["TEXT", "NUMBER", "BOOLEAN"],
        "description": "Type of the key."
    }
  },
  "required": ["key", "value"]
}

${args.schema ? `This information might be useful to inform your extraction process: ${args.schema}` : ""}

Follow these guidelines when extracting the value:
1. If the information is not found, return "null" as the value. In this case the type can be omitted.
3. If the current value is defined, your output is used to update the value. Only respond with a value if the input indicates that the value has changed.`;

export const formatMessage = (
  key: string,
  description: string,
  type: string,
  currentValue: any | undefined,
  input: string,
) =>
  `Extract the following information: ${key} - ${description}.
The current value is: ${currentValue}
The type of the value is: ${type}

From this input: 
${input}`;

const examples = [
  {
    role: "user",
    content: formatMessage(
      "activities.recent",
      "Recent user activity",
      "TEXT",
      undefined,
      "I recently returned from a mission on the lunar base where I completed a thrilling spacewalk. It was an amazing experience to float in space and repair the satellite.",
    ),
  },
  {
    role: "assistant",
    content: JSON.stringify({
      key: "activities.recent",
      value: "spacewalk, satellite repair",
      type: "TEXT",
    }),
  },
  {
    role: "user",
    content: formatMessage(
      "personal.hobbies",
      "User's hobbies",
      "TEXT",
      undefined,
      "In my free time, I enjoy painting landscapes and playing the guitar. It helps me relax and express my creativity.",
    ),
  },
  {
    role: "assistant",
    content: JSON.stringify({
      key: "personal.hobbies",
      value: "painting landscapes, playing the guitar",
      type: "TEXT",
    }),
  },
  {
    role: "user",
    content: formatMessage(
      "preferences.food",
      "User's food preferences",
      "TEXT",
      undefined,
      "I love Italian cuisine, especially pasta and pizza. I also enjoy trying out new vegetarian recipes.",
    ),
  },
  {
    role: "assistant",
    content: JSON.stringify({
      key: "preferences.food",
      value: "Italian cuisine, pasta, pizza, vegetarian recipes",
      type: "TEXT",
    }),
  },
  {
    role: "user",
    content: formatMessage(
      "environment.work",
      "User's work environment",
      "TEXT",
      undefined,
      "I work in a fast-paced tech startup where collaboration and innovation are key. We use agile methodologies to manage our projects.",
    ),
  },
  {
    role: "assistant",
    content: JSON.stringify({
      key: "environment.work",
      value:
        "fast-paced tech startup, collaboration, innovation, agile methodologies",
      type: "TEXT",
    }),
  },
  {
    role: "user",
    content: formatMessage(
      "personal.language",
      "User's language",
      "TEXT",
      undefined,
      "I am fluent in English and Spanish, and I am currently learning French.",
    ),
  },
  {
    role: "assistant",
    content: JSON.stringify({
      key: "personal.language",
      value: "English, Spanish, learning French",
      type: "TEXT",
    }),
  },
] as ChatCompletionMessageParam[];

export const agent = new Agent({
  system_prompt,
  examples,
});

export const extractKeyValue = async (params: {
  input: string;
  key: Key;
  currentValue?: any;
  relevantData?: ({ values: Value[] } & Key)[];
}) => {
  const { input, key, currentValue, relevantData } = params;

  const schema = relevantData
    ?.map((k) => `${k.id}: ${k.description}: ${k.values[0]?.value ?? ""}`)
    .join("\n");

  const response = await agent.invoke({
    messages: [
      {
        role: "user",
        content: formatMessage(
          key.id,
          key.description,
          key.type,
          currentValue,
          input,
        ),
      },
    ],
    prompt_args: {
      ...(relevantData &&
        relevantData.length > 0 && {
          schema,
        }),
    },
  });

  if (!response) {
    return null;
  }

  const json = JSON.parse(response);

  return json.value.toString();
};
