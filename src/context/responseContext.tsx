"use client"

import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React, { createContext, useEffect, useState } from "react";

export type responseContextType = {
    response: MDXRemoteSerializeResult | null;
    saveResponse: (response: string) => void;
};

export const ResponseContext = createContext<responseContextType | null>(null)

export const ResponseProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

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
        <ResponseContext.Provider value={{response, saveResponse}}>
            {children}
        </ResponseContext.Provider>
    )
}