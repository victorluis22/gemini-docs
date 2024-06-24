import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "" );

export async function POST (req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const prompt = "Imagine que você esteja documentando um código. Leia o código a seguir e faça uma documentação dele. Escreva sua resposta em português brasileiro:"

  if (!file) {
    return Response.json({ message: "No files received." }, { status: 400 });
  }
  
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileContents = buffer.toString('utf-8')

  // Faça a requisição para o Gemini com o código do arquivo.
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent(`${prompt} ${fileContents}`);

    console.log(result)

    return Response.json({ message: result.response.text()}, {status: 200});
  } catch (error) {

    console.error('Error analyzing file with Gemini:', error);

    return Response.json({message: "Failed to analyze file with Gemini"}, {status: 500});
  }
};
