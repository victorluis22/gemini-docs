"use client"

import { MDXRemote } from 'next-mdx-remote';
import { useMDXComponents } from '@/mdx-components';
import { Fab } from '@mui/material';
import { Save } from '@mui/icons-material';
import { useGeminiResponse } from '@/context/geminiResponseContext';

export default function Result() {
  const { response } = useGeminiResponse();

  const handlePrint = () => {
    window.scrollTo(0, 0);
    window.print();
  }

  if (!response) return <>Loading...</>

  return (
    <main className="flex grow flex-col items-center justify-center ">
      <div className="bg-white flex flex-col grow m-5 p-7 shadow-lg rounded-md" id='printable'>
        <MDXRemote {...response} components={useMDXComponents}/>
      </div>

      <div className='fixed bottom-5 right-5'>
        <Fab color="primary" aria-label="save" onClick={() => handlePrint()}>
          <Save />
        </Fab>
      </div>
    </main>
  );
}
