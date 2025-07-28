import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export async function getChatResponse ( userInput ) {
    const model = new ChatOpenAI({
        model: "gpt-4o-mini",
        apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = ChatPromptTemplate.fromMessages( [
        [ "system", "You are a helpful assistant for a marketing website. Provide concise, friendly, and professional response." ],
        [ "user", "{input}" ]
    ] );

    const chain = prompt( model ).pipe( new StringOutputParser)

    try {
        const response = await chain.invoke( { input: userInput } );
        
        return response;
    } catch ( e ) {
        console.error( 'Error in LangChain', e );

        return 'Sorry, something went wrong. Please rety again.';
    }
}