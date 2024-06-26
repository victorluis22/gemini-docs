"use client"

import { FormEvent, useContext, useState } from 'react';
import axios from 'axios';
import { Send } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

import FileTree from './components/fileTree';
import { RepositoryContext } from '@/context/repositoryContext';


export default function ProjectPage() {
  const [repoUrl, setRepoUrl] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [branch, setBranch] = useState<string>('main');
  const [repo, setRepo] = useState<string>('');

  const repositoryContext = useContext(RepositoryContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<any[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!repoUrl || !branch) {
      alert('Please fill all required inputs');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('/api/github/fetch/repository', { repoUrl });

      setFiles(res.data.files); // Armazena os arquivos para renderização
      setOwner(res.data.owner)
      setRepo(res.data.repo)

      // responseContext?.saveResponse(res.data.message);
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
      <p>Insira a URL de um repositório público do GitHub para criar a documentação do código contido nele.</p>
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

      {files.length > 0 && (
        <div className="mt-5">
          <FileTree owner={owner} repo={repo} branch={branch} files={files} />
        </div>
      )}
    </main>
  );
}
