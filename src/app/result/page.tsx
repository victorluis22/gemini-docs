"use client"

import { MDXRemote } from 'next-mdx-remote';
import { LegacyRef, MutableRefObject, useContext, useRef } from 'react';
import { ResponseContext } from '@/context/responseContext';
import { useMDXComponents } from '@/mdx-components';
import { Fab } from '@mui/material';
import { Save } from '@mui/icons-material';

export default function Result() {
  const responseContext = useContext(ResponseContext)

  const handlePrint = () => {
    window.print()
  }

  if (!responseContext?.response) return <>Loading...</>

  return (
    <main className="flex grow flex-col items-center justify-center ">
      <div className="bg-white flex flex-col grow m-5 p-7 shadow-lg rounded-md" id='printable'>
        <MDXRemote {...responseContext.response} components={useMDXComponents}/>
      </div>

      <div className='fixed bottom-5 right-5'>
        <Fab color="primary" aria-label="save" onClick={() => handlePrint()}>
          <Save />
        </Fab>
      </div>
    </main>
  );
}
