"use client"

import React, { createContext, useEffect, useState, useContext } from "react";

type repositoryType = {
    name: string
    owner: string,
    branch: string,
    files: Array<any>;
}

export type repositoryContextType = {
    repository: repositoryType,
    saveRepo: (name: string, owner: string, branch: string, files: Array<any>) => void;
};

export const RepositoryContext = createContext<repositoryContextType | null>(null)

export const useRepository = () => {
    const repositoryContext = useContext(RepositoryContext);
  
    if (!repositoryContext) {
      throw new Error(
        "useRepository has to be used within <RepositoryContext.Provider>"
      );
    }
  
    return repositoryContext;
};

export const RepositoryProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [repository, setRepository] = useState<repositoryType>({
        name: "",
        owner: "",
        branch: "",
        files: []
    })

    useEffect(() =>{
        const repo = localStorage.getItem('repository')
        
        if(repo) {
            setRepository(JSON.parse(repo))
        }
    }, [])

    const saveRepo = async (name: string, owner: string, branch: string, files: Array<any>) => {
        const repo: repositoryType = {
            name, 
            owner,
            branch, 
            files
        }

        localStorage.setItem('repository', JSON.stringify(repo))

        setRepository(repo)
    }

    return(
        <RepositoryContext.Provider value={{repository, saveRepo}}>
            {children}
        </RepositoryContext.Provider>
    )
}