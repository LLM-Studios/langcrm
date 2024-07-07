import { agent } from "$modules/schema/generate-key";
import { Assertion, evaluate, EvaluateTestSuite } from "promptfoo";

const input =
  "- name: personal.language\n- description: Language of the user\n- value: German";

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
          },
        ] as Assertion[],
      },
    ],
  } as EvaluateTestSuite);
  console.log(JSON.stringify(results.table, null, 2));
}

export default run;
