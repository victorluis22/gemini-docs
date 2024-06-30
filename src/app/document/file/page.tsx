"use client"
import { ChangeEvent, FormEvent, useState } from 'react';
import { Send } from '@mui/icons-material';

import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useGeminiResponse } from '@/context/geminiResponseContext';
import allowedFiles from '@/services/allowedFiles';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const { setResponse } = useGeminiResponse();
  const router = useRouter()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const fileExtension = file.name.split(".")[1];

    if (!allowedFiles.includes(fileExtension)){
      return alert("Tipo de arquivo não permitido");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileContents = buffer.toString('utf-8');
    
    setLoading(true)

    try{
      setResponse(fileContents, fileExtension);
      setLoading(false);
      router.push(`/document/result/${file.name}`);
    } catch (error) {
      setLoading(false);
      alert("Erro ao receber resposta do Gemini");
    }
  }


  return (
    <main className="flex grow flex-col items-center justify-center gap-5 m-5">
        <h1 className='font-bold text-3xl'>Documente um arquivo</h1>
        <p>Use a ferramenta para criar uma documentação do código contido em um arquivo. Tipos de arquivo permitidos:</p>
        <div className='flex items-center justify-center flex-wrap'>
          <img alt="Javascript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
          <img alt="Typescript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
          <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
          <img alt="Python" src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"/>
        </div>
        <form onSubmit={handleSubmit} className='flex items-center justify-center gap-5 flex-wrap'>
          <input type="file" accept=".js, .ts, .tsx, .jsx, .py, .ipynb" onChange={handleFileChange}/>
          <Button 
            type='submit' 
            variant="contained"
            
            endIcon={loading ? <CircularProgress size={20}/> : <Send style={{fontSize: 20}}/>} 
            disabled={loading}>Enviar</Button>
        </form>

        <p className='font-light text-sm'>Ou arraste o arquivo para cá...</p>
    </main>
  );
}


