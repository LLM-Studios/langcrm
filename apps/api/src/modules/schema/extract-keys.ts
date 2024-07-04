import { Agent } from "$modules/agent";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const system_prompt = (
  args: Record<string, any>,
) => `Based on the input, extract a list of keys that describe relevant information about the user, their preferences, their behavior, their context, their environment or other relevant data. 

Schema:
{
  "type": "object",
  "properties": {
    "keys": {
      "type": "array",
      "description": "An array of keys representing attributes that describe the user's profile.",
      "items": {
        "type": "object",
        "properties": {
          "key": {
            "type": "string",
            "description": "Specific detailed identifier using dot notation for nested data representation. Does not contain any specific data or context. It is just an identifier that can be used to look up the data in the database."
          },
          "description": {
            "type": "string",
            "description": "Detailed information about the key’s purpose and usage. Describes the abstract type of data stored under this key. Does not contain any specific data or context."
          },
          "value": {
            "type": "any",
            "description": "The value of the key. This is the actual data that is stored under the key. It is not an identifier or a key."
          }
        },
        "required": ["key", "description"]
      }
    }
  },
  "required": ["keys"]
}

Categories broadly cover "personal", "activities", "interests", "preferences" but you can come up with your own if the input does not fit any of these.

Follow these guidelines when generating keys:
1. Do not include information in the key, f.e. "personal.language.german" should instead be "personal.language" because "german" is a value not a key.

Your output has to be a valid JSON object based on the provided schema.
`;

const examples = [
  {
    role: "user",
    content:
      "Just got back from an amazing skydiving trip in New Zealand! Met some great people, and the experience was unforgettable. I'm now looking for recommendations on high-quality outdoor gear.",
  },
  {
    role: "assistant",
    content: JSON.stringify({
      "keys": [
        {
          key: "activities.recent",
          description: "Indicates recent participation in skydiving activity",
          value: "skydiving"
        },
        {
          key: "travel.recent.destination",
          description: "Records the most recent travel destination",
          value: "New Zealand"
        },
        {
          key: "travel.preferences",
          description: "Indicates preference for adventure travel",
          value: "adventure"
        },
        {
          key: "personality.traits",
          description: "Suggests an adventurous personality trait",
          value: "adventurous"
        },
        {
          key: "social.interaction",
          description: "Indicates positive social interactions during travel",
          value: "travel"
        },
        {
          key: "experience.rating",
          description: "Captures the rating of a recent experience",
          value: "recent"
        },
        {
          key: "interests",
          description: "Indicates interest in outdoor activities",
          value: "outdoor_activities"
        },
        {
          key: "shopping.intent",
          description: "Shows current shopping intent for outdoor gear",
          value: "outdoor_gear"
        },
        {
          key: "preferences",
          description: "Indicates preference for high-quality products",
          value: "high-quality"
        },
        {
          key: "lifestyle",
          description: "Suggests an active lifestyle",
          value: "active"
        },
      ],
    }),
  },
  {
    role: "user",
    content: "Hi, how are you?",
  },
  {
    role: "assistant",
    content: JSON.stringify({
      "keys": [
        {
          key: "communication.style",
          description:
            "Suggests the user is using an informal communication style",
          value: "informal"
        },
        {
          key: "social.interaction",
          description:
            "Indicates the user is engaging in polite social interaction by asking about wellbeing",
          value: "polite"
        },
      ],
    }),
  },
  {
    role: "user",
    content: "Ja, Ich habe ein kleines Schloss in Paris.",
  },
  {
    role: "assistant",
    content: JSON.stringify({
      "keys": [
        {
          key: "property.ownership",
          description: "Suggests the user owns a castle or small palace",
          value: "castle"
        },
        {
          key: "property.ownership.location",
          description: "The user owns a property located in Paris",
          value: "paris"
        },
        {
          key: "socioeconomic.status",
          description: "Indicators for a high socioeconomic status or wealth",
          value: "wealthy"
        },
        {
          key: "cultural.connection",
          description: "Suggests a connection to French culture or real estate",
          value: "france"
        },
        {
          key: "language.skills",
          description:
            "The user might be multilingual, speaking different languages",
          value: "multilingual"
        },
        {
          key: "lifestyle.luxury",
          description: "Indicators of a luxurious lifestyle",
          value: true
        },
        {
          key: "lifestyle.active",
          description: "Suggests an active lifestyle",
          value: true
        },
      ],
    }),
  },
] as ChatCompletionMessageParam[];

const agent = new Agent({
  system_prompt,
  examples,
});

export const extractKeys = async (input: string) => {
  const response = await agent.invoke({
    messages: [
      {
        role: "user",
        content: input,
      },
    ],
  });

  if (!response) {
    throw new Error("No response from agent");
  }

  const result = JSON.parse(response) as {
    "keys": [{ key: string; description: string, value: any }];
  };

  return result["keys"];
};
