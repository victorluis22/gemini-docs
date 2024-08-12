import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "" );

export async function POST (req: NextRequest) {
  const { fileContent } = await req.json();
 
  const prompt = "Imagine you are documenting code. Read the code below and document it. Write your answer in English. Include one heading with the sentence: Documentation {filename}"

  if (!fileContent) {
    return Response.json({ message: "No file content received." }, { status: 400 });
  }

  // Faça a requisição para o Gemini com o código do arquivo.
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent(`${prompt} ${fileContent}`);

    return Response.json({ message: result.response.text()}, {status: 200});
  } catch (error) {

    console.error('Error analyzing file content with Gemini:', error);

    return Response.json({message: "Failed to analyze file content with Gemini"}, {status: 500});
  }
};
