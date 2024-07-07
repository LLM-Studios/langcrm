import { agent, formatMessage } from "$modules/data/extract-key-value";
import { Assertion, evaluate, EvaluateTestSuite } from "promptfoo";

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
    providers: ["openai:gpt-3.5-turbo", "openai:gpt-4o"],
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
    tests: [
      {
        vars: {
          schema: {
            name: "Matteo",
            age: "23",
          },
        },
        assert: [
          {
            type: "contains",
            value: "Italy",
          },
        ] as Assertion[],
      },
    ],
  } as EvaluateTestSuite);
  console.log(JSON.stringify(results.table, null, 2));
}

export default run;
