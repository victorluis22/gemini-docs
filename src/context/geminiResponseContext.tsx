"use client"

import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React, { createContext, useContext, useEffect, useState } from "react";

export type geminiResponseContextType = {
    response: MDXRemoteSerializeResult | null;
    saveResponse: (response: string) => void;
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

    const [response, setResponse] = useState<MDXRemoteSerializeResult | null>(null);

    useEffect(() =>{
        const response = localStorage.getItem('response')
        
        if(response) {
            setResponse(JSON.parse(response))
        }
    }, [])

    const saveResponse = async (response: string) => {
        const serializedResponse = await serialize(response)

        localStorage.setItem('response', JSON.stringify(serializedResponse))

        setResponse(serializedResponse)
    }

    return(
        <GeminiResponseContext.Provider value={{response, saveResponse}}>
            {children}
        </GeminiResponseContext.Provider>
    )
}