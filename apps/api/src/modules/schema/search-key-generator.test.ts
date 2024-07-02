import { describe, it, expect, beforeEach } from "vitest";
import { generateSearchKeyQueries } from "./search-key-generator";

describe("generateSearchKeyQueries", () => {
  it("should generate the correct search keys based on input", async () => {
    const input = "I am looking for the best coffee shops in Berlin.";
    const response = await generateSearchKeyQueries(input);
    console.log("input: " + input);
    console.log("response: ", response);
    expect(response).toBeTypeOf("object");
    expect(response.length).toBeGreaterThan(0);
    expect(response[0]).toBeTypeOf("string");
  });
});
