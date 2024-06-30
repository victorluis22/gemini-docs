"use client"

import axios from "axios";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React, { createContext, useContext, useEffect, useState } from "react";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";

export type geminiResponseContextType = {
    highlightedCode: MDXRemoteSerializeResult | null;
    serializedResponse: MDXRemoteSerializeResult | null;
    setResponse: (fileContent: string, fileExtension: string) => void;
};

const GeminiResponseContext = createContext<geminiResponseContextType | null>(null)

export const useGeminiResponse = () => {
    const geminiResponseContext = useContext(GeminiResponseContext);
  
    if (!geminiResponseContext) {
      throw new Error(
        "useGeminiResponse has to be used within <GeminiResponseContext.Provider>"
      );
    }
  
    return geminiResponseContext;
};

export const GeminiResponseProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const [highlightedCode, setHighlightedCode] = useState<MDXRemoteSerializeResult | null>(null);
    const [serializedResponse, setSerializedResponse] = useState<MDXRemoteSerializeResult | null>(null);

    useEffect(() =>{
        const response = localStorage.getItem('response');
        const code = localStorage.getItem('code');
        
        if(response) {
            setSerializedResponse(JSON.parse(response));
        }
        if (code) {
            setHighlightedCode(JSON.parse(code));
        }
    }, [])

    const setResponse = async (fileContent: string, fileExtension: string) => {
        try{
            const response = await axios.post('/api/gemini/document/one', {fileContent});
            const mdxCodeString = "```" + fileExtension + "\n" + fileContent + "```"

            const serializedResponse = await serialize(response.data.message);
            const serializedCode = await serialize(mdxCodeString, { mdxOptions: {
                rehypePlugins: [
                    rehypeCodeTitles,
                    rehypePrism
                ]
            }})

            localStorage.setItem('response', JSON.stringify(serializedResponse));
            localStorage.setItem('code', JSON.stringify(serializedCode))

            setSerializedResponse(serializedResponse);
            setHighlightedCode(serializedCode)

        } catch(error){
            console.log(error)
        }
    }

    return(
        <GeminiResponseContext.Provider value={{ highlightedCode, serializedResponse, setResponse}}>
            {children}
        </GeminiResponseContext.Provider>
    )
}