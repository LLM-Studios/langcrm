import { agent } from "$modules/schema/extract-keys";
import {
  Assertion,
  AssertionValue,
  AssertionValueFunction,
  AssertionValueFunctionResult,
  evaluate,
  EvaluateTestSuite,
} from "promptfoo";

const input =
  "I just came back from a hiking trip through the italian alps. I loved it. But the weather was not great.";

async function run() {
  const results = await evaluate({
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
    providers: ["openai:gpt-3.5-turbo", "openai:gpt-4o"],
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
    tests: [
      {
        assert: [
          {
            type: "is-json",
            value: (async (output, context) => {
              const json = JSON.parse(output);
              const isNonEmptyArray = Array.isArray(json) && json.length > 0;
              const allItemsAreValid = json.every((item: any) => {
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
              const pass = isNonEmptyArray && allItemsAreValid;
              return {
                pass,
              } as AssertionValueFunctionResult;
            }) as AssertionValueFunction,
          },
        ] as Assertion[],
      },
    ],
  } as EvaluateTestSuite);
  console.log(JSON.stringify(results.table, null, 2));
}

export default run;
