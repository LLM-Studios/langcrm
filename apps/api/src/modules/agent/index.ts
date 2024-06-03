import { logger } from "$lib/logger";
import OpenAI from "openai";
import { observeOpenAI } from "langfuse";

/**
 * Agent
 * @class
 * @property {string} model
 * @property {(args: Record<string, string>) => string} system_prompt
 * @property {OpenAI.Chat.Completions.ChatCompletionTool[]} tools
 * @property {Record<string, (...args: any[]) => Promise<string>>} functions
 * @property {OpenAI.Chat.Completions.ChatCompletionMessageParam[]} examples
 * @property {Record<string, any>} metadata
 *
 * Used to invoke OpenAI API, should not be extended beyond OpenAI API specification.
 */
export class Agent {
  private model: string;
  private system_prompt: (args: Record<string, string>) => string;
  private tools?: OpenAI.Chat.Completions.ChatCompletionTool[];
  private functions?: Record<string, (..._args: any[]) => Promise<string>>;
  private examples: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  public metadata?: Record<string, any>;

  constructor(params: {
    model?: string;
    system_prompt: (args: Record<string, string>) => string;
    tools?: OpenAI.Chat.Completions.ChatCompletionTool[];
    functions?: Record<string, (..._args: any[]) => Promise<string>>;
    examples?: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  }) {
    const { model, system_prompt, tools, functions, examples } = params;
    this.model = model || "gpt-3.5-turbo";
    this.system_prompt = system_prompt;
    this.tools = tools;
    this.functions = functions;
    this.examples = examples || [];
  }

  /**
   * invoke
   * @param {OpenAI.Chat.Completions.ChatCompletionMessageParam[]} messages
   * @param {Record<string, string>} prompt_args
   * @returns {Promise<string>}
   *
   * @example
   * ```ts
   * const agent = new Agent({ model: "gpt-3.5-turbo", system_prompt: "You are a helpful assistant.", tools: [] });
   * const response = await agent.invoke("What is the meaning of life?");
   * ```
   */
  public async invoke(params: {
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
    prompt_args?: Record<string, string>;
  }): Promise<string | null> {
    const { messages, prompt_args } = params;
    const openai = observeOpenAI(new OpenAI(), {
      metadata: this.metadata,
      userId: this.metadata?.userId,
      sessionId: this.metadata?.workspaceId,
    });
    const prompt = this.system_prompt(prompt_args || {});
    const completion = await openai.chat.completions.create({
      model: this.model,
      tools: this.tools,
      messages: [
        { role: "system", content: prompt },
        ...this.examples,
        ...messages,
      ],
    });

    if (!completion.choices[0]) {
      return null;
    }

    const message = completion.choices[0].message;

    if (message.tool_calls) {
      return this.handleToolCalls({
        messages: [...messages, message],
        toolCalls: message.tool_calls,
        prompt_args,
      });
    }

    return message.content;
  }

  private async handleToolCalls(params: {
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
    toolCalls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[];
    prompt_args?: Record<string, string>;
  }) {
    const { messages, toolCalls, prompt_args } = params;
    for (const toolCall of toolCalls) {
      logger.debug({ toolCall });

      const name = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);
      const functionToCall = this.functions![name];

      if (!functionToCall) {
        logger.error(`Function ${name} not found`);
        continue;
      }

      const response = await functionToCall(args, this.metadata);

      messages.push({
        tool_call_id: toolCall.id,
        role: "tool",
        content: response,
      });
    }
    return this.invoke({ messages, prompt_args });
  }
}
