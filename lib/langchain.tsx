import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export async function getChatResponse( userInput: string ) {
  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant for a marketing website. Provide concise, friendly, and professional responses."],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(model).pipe(new StringOutputParser());

  try {
    const response = await chain.invoke({ input: userInput });
    return response;
  } catch (error) {
    console.error("Error in LangChain:", error);
    return "Sorry, something went wrong. Please try again!";
  }
}