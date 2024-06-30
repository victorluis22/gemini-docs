"use client"
import React from 'react';
import { ExpandMoreOutlined, Folder, InsertDriveFileOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useGeminiResponse } from '@/context/geminiResponseContext';
import allowedFiles from '@/services/allowedFiles';

interface FileTreeProps {
  files: any[];
  owner: string,
  name: string,
  branch: string,
  parentPath?: string;
}


const FileTree: React.FC<FileTreeProps> = ({ files, owner, name, branch, parentPath = '' }) => {

  const router = useRouter();
  const { setResponse } = useGeminiResponse();

  const fetchFileContent = async (filePath: string) => {
    const apiUrl = `https://raw.githubusercontent.com/${owner}/${name}/${branch}/${filePath}`;

    try {
      const response = await axios.post("/api/github/fetch/file", {apiUrl});

      return response.data.content
    } catch (error) {
      
      console.error('Error fetching file content:', error);
      return null
    }
  }

  const getFileExtension = (filePath: string) => {
    return filePath.split("/").slice(-1)[0].split(".")[1]
  }

  const handleFileClick = async (file: any) => {
    const filePath = `${parentPath}/${file.name}`;
    const fileExtension = getFileExtension(filePath);

    if (!allowedFiles.includes(fileExtension)){
      return alert("Tipo de arquivo não permitido");
    }

    const fileContent = await fetchFileContent(filePath);

    if (!fileContent) {
      return alert("Erro ao pegar conteúdo do arquivo");
    }

    try{
      setResponse(fileContent, fileExtension);
      router.push(`/document/result/${file.name}`)
    } catch (error) {
      alert("Erro ao receber resposta do Gemini")
    }
  }

  return (
    <ul className='ml-5'>
      {files.map(file => (
        <li className="transition-colors hover:bg-slate-100 hover:cursor-pointer" key={file.path}>
          {file.type === 'dir' ? 
            <Accordion
              component={"div"}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreOutlined />}
              >
                <Folder style={{ marginRight: 5 }}/>
                {file.name}
              </AccordionSummary>
              <AccordionDetails>
                <FileTree owner={owner} name={name} branch={branch} files={file.children} parentPath={`${parentPath}/${file.name}`} />
              </AccordionDetails>
            </Accordion>
          : 
            <div className='py-2 w-full border-b-zinc-200 border-b' onClick={() => handleFileClick(file)}>
              <InsertDriveFileOutlined style={{ marginRight: 5 }} />
              {file.name}
            </div>
          }
        </li>
      ))}
    </ul>
  );
};

export default FileTree;
