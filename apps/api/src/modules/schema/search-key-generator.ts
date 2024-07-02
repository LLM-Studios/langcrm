import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";

//const systemPrompt = `You are a data scientist working for a company that provides a platform for users to store and analyze data. You have been tasked with updating the schema for a user's data. The user has provided the following input: "${input}". Based on this input, you need to generate a list of search keys that can be used to identify relevant data in the user's data set. The search keys should be in the format 'key: description'. For example, 'key: activities.recent.skydiving, description: Indicates recent participation in skydiving activity'.`;
const systemPrompt = `Based on the input, extract a list of keys that describe relevant customer intelligence information about the user, their preferences, their behavior, their context, their environment or other relevant data for the langCRM system. The key should describe the abstract type of information that is present in the input, and the description should provide additional context or details about the key. Do not extract any data. Cover all the (hidden) information in the input.

Schema:
{
  "type": "object",
  "properties": {
    "identified-context-keys": {
      "type": "array",
      "description": "An array of keys representing context attributes that describe the user's profile and deepen the system's understanding of the person.",
      "items": {
        "type": "object",
        "properties": {
          "key": {
            "type": "string",
            "description": "Specific detailed identifier using dot notation for nested data representation."
          },
          "description": {
            "type": "string",
            "description": "Detailed information about the context key’s purpose and usage. Describes the abstract type of data stored under this key."
          }
        },
        "required": ["key", "description"]
      }
    }
  },
  "required": ["identified-context-keys"]
}

Create a JSON object based on the provided schema. The object describes the identified context keys in the input. We are just designing the schmea, make sure to abstract the information in a way that is useful for the langCRM system in general. Keys should be abstract and not contain any specific data. The description should provide additional context or details about the key. Keys need to be relevant to the input and cover all the information in the input without depending on the specific data or context.
`;

export const generateSearchKeyQueries = async (input: string) => {
  const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
  });

  const messages = [
    new SystemMessage(systemPrompt),
    new HumanMessage({
      content:
        "Just got back from an amazing skydiving trip in New Zealand! Met some great people, and the experience was unforgettable. I'm now looking for recommendations on high-quality outdoor gear.",
      name: "JohnDoe",
    }),
    new AIMessage(
      JSON.stringify({
        "identified-context-keys": [
          {
            key: "activities.recent.skydiving",
            description: "Indicates recent participation in skydiving activity",
          },
          {
            key: "travel.recent.destination",
            description: "Records the most recent travel destination",
          },
          {
            key: "travel.preferences.adventure",
            description: "Indicates preference for adventure travel",
          },
          {
            key: "personality.traits.adventurous",
            description: "Suggests an adventurous personality trait",
          },
          {
            key: "social.interaction.travel",
            description: "Indicates positive social interactions during travel",
          },
          {
            key: "experience.rating.recent",
            description: "Captures the rating of a recent experience",
          },
          {
            key: "interests.outdoor_activities",
            description: "Indicates interest in outdoor activities",
          },
          {
            key: "shopping.intent.outdoor_gear",
            description: "Shows current shopping intent for outdoor gear",
          },
          {
            key: "preferences.product.quality",
            description: "Indicates preference for high-quality products",
          },
          {
            key: "lifestyle.active",
            description: "Suggests an active lifestyle",
          },
        ],
      }),
    ),
    new HumanMessage({ content: "Hi, how are you?", name: "JohnDoe" }),
    new AIMessage(
      JSON.stringify({
        "identified-context-keys": [
          {
            key: "communication.greeting",
            description:
              "Indicates the user has initiated a conversation with a greeting",
          },
          {
            key: "communication.style.informal",
            description:
              "Suggests the user is using an informal communication style",
          },
          {
            key: "social.interaction.polite",
            description:
              "Indicates the user is engaging in polite social interaction by asking about wellbeing",
          },
        ],
      }),
    ),
    new HumanMessage({
      content: "Ja, Ich habe ein kleines Schloss in Paris.",
      name: "JohnDoe",
    }),
    new AIMessage(
      JSON.stringify({
        "identified-context-keys": [
          {
            key: "property.ownership.castle",
            description: "Suggests the user owns a castle or small palace",
          },
          {
            key: "property.ownership.location.paris",
            description: "The user owns a property located in Paris",
          },
          {
            key: "socioeconomic.status.wealthy",
            description: "Indicators for a high socioeconomic status or wealth",
          },
          {
            key: "cultural.connection.france",
            description:
              "Suggests a connection to French culture or real estate",
          },
          {
            key: "language.skills.multilingual",
            description:
              "The user might be multilingual, speaking different languages",
          },
          {
            key: "lifestyle.luxury",
            description: "Indicators of a luxurious lifestyle",
          },
        ],
      }),
    ),
    new HumanMessage({ content: input, name: "CurrentUser" }),
  ];

  const response = await model.invoke(messages);

  const json = JSON.parse(response.content as string) as {
    "identified-context-keys": [{ key: string; description: string }];
  };

  return json["identified-context-keys"].map(
    (key) => `${key.key}: ${key.description}`,
  );
};
