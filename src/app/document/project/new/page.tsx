"use client"

import { Send } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useRepository } from '@/context/repositoryContext';

import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NewProject () {
    const [repoUrl, setRepoUrl] = useState<string>('');
    const [branch, setBranch] = useState<string>('main');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()

    const { saveRepo } = useRepository();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!repoUrl || !branch) {
          alert('Please fill all required inputs');
          return;
        }
    
        setLoading(true);
    
        try {
          const res = await axios.post('/api/github/fetch/repository', { repoUrl });
    
          saveRepo(res.data.name, res.data.owner, branch, res.data.files)
    
          setLoading(false);

          router.push(`/document/project`);
        } catch (error) {
    
          console.error('Error fetching repository files:', error);
          alert('Failed to analyze repository');
          setLoading(false);
        }
      };

    return (
        <>
            <div className='flex flex-col bg-white p-5 shadow-md rounded-md w-1/2 gap-5 max-md:w-5/6 max-w-screen-xl'>
                <h1 className='font-bold text-3xl'>Documenting a project</h1>
                <p>Insert the URL of a public GitHub repository to create its documentation. The following programming languages are allowed:</p>
                
                <div className='flex flex-wrap'>
                    <img alt="Javascript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
                    <img alt="Typescript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
                    <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
                    <img alt="Python" src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"/>
                </div>
                <form onSubmit={handleSubmit} className='flex gap-5 flex-wrap'>
                <input
                    type="url"
                    placeholder="https://github.com/user/repository"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                />

                <Button 
                    type='submit' 
                    variant="contained"
                    endIcon={loading ? <CircularProgress size={20}/> : <Send style={{fontSize: 20}}/>} 
                    disabled={loading}>Submit</Button>
                </form>
            </div>
        </>
    )
}