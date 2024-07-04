import { Agent } from "$modules/agent";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { Key } from "@repo/database/prisma";

const system_prompt = () =>
  `You are a senior data analyst at a company offering a platform for users to store and organize their contextual data on a semantic index. Your task is to extract concise summaries of the specified context data from the provided Current Input.

CONSTITUTION:
1.	Identify Relevant Information: Focus solely on the information that corresponds to the given Schema Key within the given Input.
2.	Extract and Summarize: Extract meaningful summaries of all information that relates to the given Schema Key. Ensure that the summaries are concise and accurate.
3.	Return null if No information can be found: If the Input does not contain any information related to the Schema Key, return "null".`;

const formatMessage = (
  key: string,
  description: string,
  currentValue: any | undefined,
  input: string,
) =>
  `Schema Key: ${key}
Schema Key Description: ${description}
Last Value: ${currentValue ?? "undefined <- find this in the input"}

Extract the "${key}" information from the following input: "${input}"`;

const examples = [
  {
    role: "user",
    content: formatMessage(
      "activities.recent.spacewalk",
      "Indicates recent participation in a spacewalk activity",
      undefined,
      "I recently returned from a mission on the lunar base where I completed a thrilling spacewalk. It was an amazing experience to float in space and repair the satellite.",
    ),
  },
  {
    role: "assistant",
    content:
      "activities.recent.spacewalk: Completed a spacewalk on a mission to the lunar base, repaired the satellite",
  },
  {
    role: "user",
    content: formatMessage(
      "lifestyle.luxury",
      "Indicators of a luxurious lifestyle, such as expensive purchases or extravagant vacations",
      undefined,
      "I went camping last weekend, I loved it.",
    ),
  },
  {
    role: "assistant",
    content: "lifestyle.luxury: null",
  },
  {
    role: "user",
    content: formatMessage(
      "personal.species",
      "Indicates the species of the user in a sci-fi setting",
      undefined,
      "As a Xylian from the planet Zylox, I have the ability to communicate telepathically with my fellow beings. Our advanced technology allows us to travel between galaxies with ease.",
    ),
  },
  {
    role: "assistant",
    content: "personal.species: Xylian from the planet Zylox",
  },
  {
    role: "user",
    content: formatMessage(
      "activities.recent.spacewalk",
      "Indicates recent participation in a spacewalk activity",
      undefined,
      "No, I haven't been skydiving recently. I've been busy with work and haven't had time for any activities outside of the office.",
    ),
  },
  {
    role: "assistant",
    content: "activities.recent.spacewalk: null",
  },
  {
    role: "user",
    content: formatMessage(
      "activities.recent.time_travel",
      "Indicates recent participation in time travel activities",
      "Mid-20th century",
      "Yesterday, I went on an incredible journey to the Jurassic period. It was exhilarating to see dinosaurs in their natural habitat and study their behavior up close.",
    ),
  },
  {
    role: "assistant",
    content:
      "activities.recent.time_travel: Traveled to the Jurassic period to study dinosaurs",
  },
] as ChatCompletionMessageParam[];

const agent = new Agent({
  system_prompt,
  examples,
});

export const extractKeyValue = async (input: string, key: Key, value: any) => {
  const response = await agent.invoke({
    messages: [
      {
        role: "user",
        content: formatMessage(key.id, key.description, value, input),
      },
    ],
  });

  if (!response || response === "null") {
    return null;
  }

  const result = response.split(key.id + ": ")[1];

  return result;
};
