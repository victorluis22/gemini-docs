"use client"

import { FormEvent, useState } from 'react';
import axios from 'axios';
import { Send } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { useRepository } from '@/context/repositoryContext';

import FileTree from './components/fileTree';

export default function ProjectPage() {
  const [repoUrl, setRepoUrl] = useState<string>('');
  const [branch, setBranch] = useState<string>('main');
  const [loading, setLoading] = useState<boolean>(false);

  const { repository, saveRepo } = useRepository();

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
    } catch (error) {

      console.error('Error fetching repository files:', error);
      alert('Failed to analyze repository');
      setLoading(false);
    }
  };

  return (
    <main className="flex grow flex-col items-center justify-center gap-5 m-5">
      <h1 className='font-bold text-3xl'>Documente um Repositório do GitHub</h1>
      <p>Insira a URL de um repositório público do GitHub para criar a documentação do código contido nele. Tipos de arquivo que serão documentados:</p>
      <div className='flex items-center justify-center flex-wrap'>
          <img alt="Javascript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
          <img alt="Typescript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
          <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
          <img alt="Python" src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"/>
        </div>
      <form onSubmit={handleSubmit} className='flex items-center justify-center gap-5 flex-wrap'>
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
          disabled={loading}>Analisar</Button>
      </form>

      {repository.files.length > 0 && (
        <div className="bg-white p-5 m-5 rounded-md w-full shadow-md">
          <FileTree owner={repository.owner} name={repository.name} branch={repository.branch} files={repository.files} />
        </div>
      )}
    </main>
  );
}
