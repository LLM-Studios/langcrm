import { agent, formatMessage } from "$modules/data/extract-key-value";
import { Assertion, evaluate, EvaluateTestSuite, GradingResult } from "promptfoo";
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
            content: formatMessage(
              "travel.recent",
              "The user's recent travel destination",
              "string",
              undefined,
              input,
            ),
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
              const isValid = (
                typeof result === "object" &&
                result !== null &&
                result.hasOwnProperty("key") &&
                typeof result.key === "string" &&
                result.hasOwnProperty("value")
              );
              return isValid;
            }),
          },
        ] as Assertion[],
      },
    ],
  } as EvaluateTestSuite);
  results.results.forEach(printResults);
}

export default run;
