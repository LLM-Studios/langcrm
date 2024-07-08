import { agent } from "$modules/schema/generate-key";
import {
  Assertion,
  evaluate,
  EvaluateTestSuite,
  GradingResult,
} from "promptfoo";
import { printResults } from "./utils";

const input =
  "- name: personal.language\n- description: Language of the user\n- value: German";

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
    providers: ["openai:gpt-3.5-turbo", "openai:gpt-4o"],
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
    tests: [
      {
        assert: [
          {
            type: "javascript",
            value: async (output, context) => {
              console.log(output);
              const result = JSON.parse(output);
              const isValid =
                typeof result === "object" &&
                result !== null &&
                result.hasOwnProperty("id") &&
                typeof result.id === "string" &&
                result.hasOwnProperty("description") &&
                typeof result.description === "string" &&
                result.hasOwnProperty("priority") &&
                typeof result.priority === "number" &&
                result.hasOwnProperty("tags") &&
                Array.isArray(result.tags) &&
                result.hasOwnProperty("type") &&
                typeof result.type === "string";
              return isValid;
            },
          },
        ] as Assertion[],
      },
    ],
  } as EvaluateTestSuite);
  results.results.forEach(printResults);
}

export default run;
