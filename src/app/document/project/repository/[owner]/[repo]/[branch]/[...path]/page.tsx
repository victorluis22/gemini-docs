"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';

interface fileViewerProps{
  params: {
    owner: string, 
    repo: string,
    branch: string,
    path: string
  }
}

const FileViewer: React.FC<fileViewerProps> = ({ params }) => {

  const [fileContent, setFileContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileContent = async () => {
      if (!params.path) return;

      const filePath = Array.isArray(params.path) ? params.path.join('/') : params.path;
      const apiUrl = `https://raw.githubusercontent.com/${params.owner}/${params.repo}/${params.branch}/${filePath}`;

      try {
        const response = await axios.post("/api/github/fetch/file", {apiUrl});

        setFileContent(response.data.content);
      } catch (error) {
        
        console.error('Error fetching file content:', error);
        setFileContent(null);
      }
    };

    fetchFileContent();
  }, [params.path]);

  return (
    <div>
      {fileContent ? (
        <pre>
          <code>{fileContent}</code>
        </pre>
      ) : (
        <p>Loading file...</p>
      )}
    </div>
  );
};

export default FileViewer;
