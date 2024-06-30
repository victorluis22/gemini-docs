"use client"

import { MDXRemote } from 'next-mdx-remote';
import { useMDXComponents } from '@/mdx-components';
import { Accordion, AccordionDetails, AccordionSummary, Fab } from '@mui/material';
import { ExpandMoreOutlined, Save } from '@mui/icons-material';
import { useGeminiResponse } from '@/context/geminiResponseContext';

interface resultProps{
  params: {
    filename: string
  }
}

const Result: React.FC<resultProps> = ({ params }) => {
  const { highlightedCode, serializedResponse } = useGeminiResponse();

  const handlePrint = () => {
    window.scrollTo(0, 0);
    window.print();
  }


  if (!serializedResponse || !highlightedCode) return <>Loading...</>

  return (
    <main className="flex grow flex-col items-center justify-center p-5">
      <div className='w-full' id='not-printable'>
        <Accordion
            component={"div"}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreOutlined />}
            >
              Código
            </AccordionSummary>
            <AccordionDetails>
              <MDXRemote {...highlightedCode}/>
            </AccordionDetails>
          </Accordion>
      </div>

      <div className="bg-white flex flex-col w-full grow my-5 p-7 shadow-lg rounded-md border-zinc-200 border border-b-zinc-500" id='printable'>
        <MDXRemote {...serializedResponse} components={useMDXComponents}/>
      </div>

      <div className='fixed bottom-5 right-5'>
        <Fab color="primary" aria-label="save" onClick={() => handlePrint()}>
          <Save />
        </Fab>
      </div>
    </main>
  );
}

export default Result
