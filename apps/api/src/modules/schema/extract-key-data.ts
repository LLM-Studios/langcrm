import {
	HumanMessage,
	SystemMessage,
	AIMessage,
} from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { Key } from "@repo/database/prisma";
import { stringify } from "yaml";

const systemPrompt = () =>
	`You are a senior data analyst at a company offering a platform for users to store and organize their contextual data on a semantic index. Your task is to extract concise summaries of the specified context data from the provided Current Input.

CONSTITUTION:
1.	Identify Relevant Information: Focus solely on the information that corresponds to the given Schema Key within the given Input.
2.	Extract and Summarize: Extract meaningful summaries of all information that relates to the given Schema Key. Ensure that the summaries are concise and accurate.
3.	Return null if No information can be found: If the Input does not contain any information related to the Schema Key, return "null".`;

const formatMessage = (
	key: string,
	description: string,
	currentValue: any | undefined,
	input: string
) =>
	`Schema Key: ${key}
Schema Key Description: ${description}
Last Value: ${currentValue ?? "undefined"}

Extract the "${key}" information from the following input: "${input}"`;

export const extractKeyData = async (input: string, key: Key, value: any) => {
	const model = new ChatOpenAI({
		model: "gpt-3.5-turbo",
		temperature: 0.1,
	});

	const messages = [
		new SystemMessage(systemPrompt()),
		new HumanMessage(
			formatMessage(
				"activities.recent.spacewalk",
				"Indicates recent participation in a spacewalk activity",
				undefined,
				"I recently returned from a mission on the lunar base where I completed a thrilling spacewalk. It was an amazing experience to float in space and repair the satellite."
			)
		),
		new AIMessage(
			"activities.recent.spacewalk: Completed a spacewalk on a mission to the lunar base, repaired the satellite"
		),
		new HumanMessage(
			formatMessage(
				"lifestyle.luxury",
				"Indicators of a luxurious lifestyle, such as expensive purchases or extravagant vacations",
				undefined,
				"Hi"
			)
		),
		new AIMessage("lifestyle.luxury: null"),
		new HumanMessage(
			formatMessage(
				"personal.species",
				"Indicates the species of the user in a sci-fi setting",
				"Xylianian",
				"As a Xylian from the planet Zylox, I have the ability to communicate telepathically with my fellow beings. Our advanced technology allows us to travel between galaxies with ease."
			)
		),
		new AIMessage("personal.species: Xylian from the planet Zylox"),
		new HumanMessage(
			formatMessage(
				"activities.recent.spacewalk",
				"Indicates recent participation in a spacewalk activity",
				undefined,
				"No, I haven't been skydiving recently. I've been busy with work and haven't had time for any activities outside of the office."
			)
		),
		new AIMessage("activities.recent.spacewalk: null"),
		new HumanMessage(
			formatMessage(
				"activities.recent.time_travel",
				"Indicates recent participation in time travel activities",
				"Mid-20th century",
				"Yesterday, I went on an incredible journey to the Jurassic period. It was exhilarating to see dinosaurs in their natural habitat and study their behavior up close."
			)
		),
		new AIMessage(
			"activities.recent.time_travel: Traveled to the Jurassic period to study dinosaurs"
		),
		new HumanMessage(formatMessage(key.id, key.description, value, input)),
	];

	const response = await model.invoke(messages);

	const text = response.content.split(key.id + ": ")[1];
	const isNullResponse = text === "null" || text === null;

	return !isNullResponse ? (text as string) : null;
};
