import React from 'react';
import { Folder, InsertDriveFile } from '@mui/icons-material';
import Link from 'next/link';

interface FileTreeProps {
  files: any[];
  owner: string,
  name: string,
  branch: string,
  parentPath?: string;
}

const FileTree: React.FC<FileTreeProps> = ({ files, owner, name, branch, parentPath = '' }) => {
  return (
    <ul>
      {files.map(file => (
        <li key={file.path}>
          {file.type === 'dir' ? (
            <>
              <Folder style={{ marginRight: 5 }} />
              {file.name}
              <FileTree owner={owner} name={name} branch={branch} files={file.children} parentPath={`${parentPath}/${file.name}`} />
            </>
          ) : (
            <Link href={`/document/project/repository/${owner}/${name}/${branch}${parentPath}/${file.name}`}>
              <InsertDriveFile style={{ marginRight: 5 }} />
              {file.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FileTree;
