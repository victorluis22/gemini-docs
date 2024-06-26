"use client"

import React, { createContext, useEffect, useState } from "react";

export type repositoryContextType = {
    name: string
    owner: string,
    branch: string,
    files: Array<any> | null;
    
    saveRepo: (repo: Array<any>) => void;
};

export const RepositoryContext = createContext<repositoryContextType | null>(null)

export const RepositoryProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const [repository, setRepository] = useState<Array<any> | null>(null);

    useEffect(() =>{
        const repo = localStorage.getItem('repository')
        
        if(repo) {
            setRepository(JSON.parse(repo))
        }
    }, [])

    const saveRepo = async (repo: Array<any>) => {
        localStorage.setItem('repository', JSON.stringify(repo))

        setRepository(repo)
    }

    return(
        <RepositoryContext.Provider value={{repository, saveRepo}}>
            {children}
        </RepositoryContext.Provider>
    )
}