import { describe, it, expect, beforeEach } from "vitest";
import { ChatOpenAI } from "@langchain/openai";
import { extractKeyData } from "./extract-key-data";
import { Key } from "@repo/database/prisma";

describe("extractKeyData", () => {
  let model: ChatOpenAI;

  beforeEach(() => {
    model = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });
  });

  it("should generate the correct search keys based on input", async () => {
    const input =
      "My name is John Doe, I am 25 years old and I live in New York. I am looking for the best coffee shops in Berlin.";
    const key = {
      id: "personal.name",
      description:
        "User's name, including first name, last name, and any other relevant names.",
    } as Key;
    const response = await extractKeyData(input, key, undefined);

    const input1 =
      "My name is John Doe, I am 25 years old and I live in New York. I am looking for the best coffee shops in Berlin.";
    const key1 = {
      id: "interests.locations",
      description:
        "User's interest in specific types of local attractions or activities, such as restaurants.",
    } as Key;
    const response1 = await extractKeyData(input1, key1, undefined);

    const input2 =
      "My name is John Doe, I am 25 years old and I live in New York. I am looking for the best coffee shops in Berlin.";
    const key2 = {
      id: "activities.recent.skydiving",
      description: "Indicates recent participation in skydiving activity",
    } as Key;
    const response2 = await extractKeyData(input2, key2, undefined);

    console.log("input: " + input);
    console.log("key: " + key.id);
    console.log("response: " + response);
    expect(response).toBeTypeOf("string");
    expect(response).toContain("John Doe");
    console.log("--------------------");
    console.log("input: " + input1);
    console.log("key: " + key1.id);
    console.log("response: " + response1);
    expect(response1).toBeTypeOf("string");
    console.log("--------------------");
    console.log("input: " + input2);
    console.log("key: " + key2.id);
    console.log("response: " + response2);
    expect(response2).toBeNull();
  });
});
