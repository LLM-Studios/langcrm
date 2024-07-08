import { agent } from "$modules/schema/extract-keys";
import {
  Assertion,
  evaluate,
  EvaluateTestSuite,
} from "promptfoo";
import { printResults } from "./utils";

const input =
  "I just came back from a hiking trip through the italian alps. I loved it. But the weather was not great.";

async function run() {
  const results = await evaluate({
    writeLatestResults: false,
    prompts: [
      async ({ vars }) => {
        return [
          {
            role: "system",
            content: agent.system_prompt(vars as Record<string, string>),
          },
          ...agent.examples,
          {
            role: "user",
            content: input,
          },
        ];
      },
    ],
    providers: [
      "openai:gpt-3.5-turbo",
      "openai:gpt-4o",
    ],
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
    tests: [
      {
        assert: [
          {
            type: "javascript",
            value: (async (output, context) => {
              console.log(output);
              const result = JSON.parse(output);
              if (typeof result !== "object" || !result.hasOwnProperty("keys") || !Array.isArray(result.keys)) {
                return false;
              }
              const allItemsAreValid = (result.keys as any[]).every((item: any) => {
                return (
                  typeof item === "object" &&
                  item !== null &&
                  item.hasOwnProperty("key") &&
                  typeof item.key === "string" &&
                  item.hasOwnProperty("description") &&
                  typeof item.description === "string" &&
                  item.hasOwnProperty("value") &&
                  typeof item.value === "string"
                );
              });
              return allItemsAreValid;
            }),
          },
        ] as Assertion[],
      },
    ],
  } as EvaluateTestSuite);
  results.results.forEach(printResults);
}

export default run;
