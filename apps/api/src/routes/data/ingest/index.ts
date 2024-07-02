import agent from "./agent";
import schema from "$modules/schema";
import { generateSearchKeyQueries } from "../../../modules/schema/search-key-generator";
import { extractKeyData } from "../../../modules/schema/extract-key-data";
import { uniq, uniqBy } from "lodash";
export default async (params: {
	input: string;
	workspaceId: string;
	distinctId: string;
	userId: string;
}) => {
	const { input, workspaceId, distinctId, userId } = params;

	agent.metadata = {
		distinctId: distinctId,
		workspaceId: workspaceId,
		userId: userId,
	};

	const keys = await schema.searchRelevantKeys(workspaceId, input);

	const currentContext = await schema.getValues(
		workspaceId,
		distinctId,
		keys.map((k) => k.id)
	);

	const getValue = (key: string) => {
		const value = currentContext.find((k) => k.id === key);
		return value?.values[0]?.value;
	};

	const ingestData = await Promise.all(
		keys.map(
			(k) =>
				new Promise(async (resolve, reject) => {
					const value = await extractKeyData(input, k, getValue(k.id));
					resolve({
						key: k.id,
						value,
					});
				})
		)
	);

	const extend = (workspaceId: string, input: string) => {
		const searchKeys = generateSearchKeyQueries(input);

		return Promise.all(
			searchKeys.map((k) =>
				schema.searchKeys(workspaceId, k.key + ": " + k.description)
			)
		).then((keys) => uniqBy(keys.flat(), (key) => key.id));
	};

	const additonalKeys = extend(workspaceId, input);

	console.log("ingestData");
	console.log(ingestData);

	// const schemaDef =
	// 	relevantSchema.length > 0
	// 		? relevantSchema
	// 				.map(
	// 					(key) =>
	// 						`${key.id} - ${key.description}: ${key.values
	// 							.map((value) => value.value)
	// 							.filter((value, index, array) => array.indexOf(value) === index)
	// 							.join(", ")}`
	// 				)
	// 				.join("\n")
	// 		: "Empty - use the 'extend_schema' tool to add a key and value.";

	// const output = await agent.invoke({
	// 	messages: [
	// 		{
	// 			role: "user",
	// 			content: input,
	// 		},
	// 	],
	// 	prompt_args: {
	// 		schema: schemaDef,
	// 	},
	// });

	return {
		input,
		output: ingestData,
	};
};
