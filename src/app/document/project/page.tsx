"use client"

import FileTree from '@/components/fileTree';
import { Button, CircularProgress } from '@mui/material';
import { useRepository } from '@/context/repositoryContext';
import { useEffect, useState } from 'react';

export default function ProjectPage() {
  const { repository, clearRepo } = useRepository();
  const [loading, setLoading] = useState(true);
  const loadingTimeout = 2000

  useEffect(() => {
    // Simula o tempo de carregamento
    setTimeout(() => {
      setLoading(false);
    }, loadingTimeout); 
  }, []);

  if (loading) return <CircularProgress />

  return (
    <>
      {repository.files.length > 0 ?
        (
          <div className="bg-white p-5 rounded-md w-5/6 shadow-md max-w-screen-xl">
            <h1 className='font-bold text-2xl px-5'>Project</h1>
            <div className='flex flex-rol justify-between items-center border-neutral-200 border-b-1 p-5 flex-wrap'>
              <a className='text-blue-800' href={`https://github.com/${repository.owner}/${repository.name}`} target="_blank" rel="noreferrer noopener">https://github.com/{repository.owner}/{repository.name}</a>
              <p>{repository.branch}</p>
            </div>
            <FileTree owner={repository.owner} name={repository.name} branch={repository.branch} files={repository.files} />

            <div className='flex flex-row m-5 gap-2 flex-wrap'>
              <Button color='success' type='submit' variant="contained" href='project/new'>Add Project</Button>
              <Button color='error' type='submit' variant="contained" onClick={() => clearRepo()}>Delete Project</Button>
            </div>
          </div>
        )
        :
        <div className="bg-white p-5 rounded-md w-5/6 shadow-md max-w-screen-xl">
          <div className='flex flex-col gap-5 px-5'>
            <h1 className='font-bold text-2xl'>Project</h1>
            <p>There is no saved project</p>
          </div>
          <div className='flex flex-row m-5 gap-2 flex-wrap'>
            <Button color='success' type='submit' variant="contained" href='project/new'>Add Project</Button>
            <Button color='error' type='submit' variant="contained" onClick={() => clearRepo()}>Delete Project</Button>
          </div>
        </div>
      }
    </>
  );
}
