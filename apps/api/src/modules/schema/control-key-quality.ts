import { Agent } from "$modules/agent";
import { Key } from "@prisma/client";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const system_prompt = (
  args: Record<string, any>,
) => `Your task is to analyze the input and assure the quality of the data. You will receive the original input, along with a list of objects representing extracted inputs that follow the following schema:

Input Keys Schema:
{
  "type": "object",
  "properties": {
    "id": {
        "type": "string",
        "description": "Name of the key."
    },
    "description": {
        "type": "string",
        "description": "Detailed information about the key’s purpose and usage."
    },
    "priority": {
        "type": "string",
        "enum": ["REQUIRED", "HIGH", "MEDIUM", "LOW"],
        "description": "Priority level of the key."
    },
    "tags": {
        "type": "array",
        "items": {
            "type": "string"
        },
        "description": "Tags associated with the key."
    },
    "type": {
        "type": "string",
        "enum": ["TEXT", "NUMBER", "BOOLEAN"],
        "description": "Type of the key."
    }
  },
  "required": ["name", "description", "priority", "tags", "type"]
}

Your job is to judge whether the each object follows these criteria:
1. The id does not include any hint on the value of the data itself f.e. a key describing the user language should be "personal.language" not "personal.language.german"
2. The description fits the key and is not overly verbose as well as easy to understand
3. The priority is appropriate, f.e. personal information should be "HIGH" whereas other information can be "MEDIUM" or "LOW"
4. The tags are not empty and and are thematically fitting for the key
5. The type is appropriate for the given key
6. The key makes sense given the original input
7. The key is not a duplicate of the original input

Apply these guidelines to all possible types of keys.

Return the objects that correctly follow the criteria. 
Modify the ones that are useful but not following the criteria and return them.
Discard the ones that are not useful at all or in some form duplicate.

Your output has to be a valid JSON object that follows this schema:

Output Schema:
{
  "type": "object",
  "properties": {
    "keys": {
      "type": "array",
      "description": "A refined list of objects that follow the criteria.",
      "items": {{ INPUT SCHEMA }}
    }
  },
  "required": ["keys"]
}
`;

const examples = [
  {
    role: "user",
    content: `Input: Just got back from an amazing skydiving trip in New Zealand! Met some great people, and the experience was unforgettable. I'm now looking for recommendations on high-quality outdoor gear.
    Keys: ${JSON.stringify([
      {
        id: "experience.skydiving.newzealand",
        description: "The experience of the skydiving trip in New Zealand.",
        priority: "HIGH",
        tags: ["experience", "skydiving", "newzealand"],
        type: "TEXT",
      },
    ], null, 2)}`,
  },
  {
    role: "assistant",
    content: JSON.stringify({
      keys: [
        {
          id: "travel.experience",
          description: "A recent travel experience.",
          priority: "HIGH",
          tags: ["travel", "experience"],
          type: "TEXT",
        },
      ],
    }),
  },
  {
    role: "user",
    content: `Input: I love playing basketball on weekends and enjoy watching NBA games. My favorite team is the Lakers.
    Keys: ${JSON.stringify([
      {
        id: "hobby.basketball.weekends",
        description: "Playing basketball on weekends.",
        priority: "MEDIUM",
        tags: ["hobby", "basketball", "weekends"],
        type: "TEXT",
      },
      {
        id: "favorite.team.lakers",
        description: "Favorite NBA team is the Lakers.",
        priority: "LOW",
        tags: ["favorite", "team", "lakers"],
        type: "TEXT",
      },
    ], null, 2)}`,
  },
  {
    role: "assistant",
    content: JSON.stringify({
      keys: [
        {
          id: "hobby.basketball",
          description: "Playing basketball as a hobby.",
          priority: "MEDIUM",
          tags: ["hobby", "basketball"],
          type: "TEXT",
        },
        {
          id: "sports.favorite_team",
          description: "Favorite sports team.",
          priority: "LOW",
          tags: ["sports", "favorite_team"],
          type: "TEXT",
        },
      ],
    }),
  },
  {
    role: "user",
    content: `Input: I recently started a new job as a software engineer at a tech startup. The work environment is fast-paced and collaborative.
    Keys: ${JSON.stringify([
      {
        id: "job.software_engineer.tech_startup",
        description: "New job as a software engineer at a tech startup.",
        priority: "HIGH",
        tags: ["job", "software_engineer", "tech_startup"],
        type: "TEXT",
      },
      {
        id: "work_environment.fast_paced_collaborative",
        description: "Work environment is fast-paced and collaborative.",
        priority: "MEDIUM",
        tags: ["work_environment", "fast_paced", "collaborative"],
        type: "TEXT",
      },
    ], null, 2)}`,
  },
  {
    role: "assistant",
    content: JSON.stringify({
      keys: [
        {
          id: "job.title",
          description: "Job title.",
          priority: "HIGH",
          tags: ["job", "title"],
          type: "TEXT",
        },
        {
          id: "job.industry",
          description: "Industry of the job.",
          priority: "MEDIUM",
          tags: ["job", "industry"],
          type: "TEXT",
        },
        {
          id: "work_environment",
          description: "Description of the work environment.",
          priority: "MEDIUM",
          tags: ["work", "environment"],
          type: "TEXT",
        },
      ],
    }),
  },
] as ChatCompletionMessageParam[];

export const agent = new Agent({
  system_prompt,
  // examples,
});

export const controlKeysQuality = async (input: string, keys: Key[]) => {
  const response = await agent.invoke({
    messages: [
      {
        role: "user",
        content: `Input: ${input}
        Keys: ${JSON.stringify(keys, null, 2)}`,
      },
    ],
  });

  if (!response) {
    throw new Error("No response from agent");
  }

  const result = JSON.parse(response) as {
    keys: Omit<
      Key,
      "workspaceId" | "createdAt" | "updatedAt"
    >[];
  };

  return result["keys"];
};
