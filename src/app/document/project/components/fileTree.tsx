import React from 'react';
import { Folder, InsertDriveFile } from '@mui/icons-material';
import Link from 'next/link';

interface FileTreeProps {
  files: any[];
  owner: string,
  repo: string,
  branch: string,
  parentPath?: string;
}

const FileTree: React.FC<FileTreeProps> = ({ files, owner, repo, branch, parentPath = '' }) => {
  return (
    <ul>
      {files.map(file => (
        <li key={file.path}>
          {file.type === 'dir' ? (
            <>
              <Folder style={{ marginRight: 5 }} />
              {file.name}
              <FileTree owner={owner} repo={repo} branch={branch} files={file.children} parentPath={`${parentPath}/${file.name}`} />
            </>
          ) : (
            <Link href={`/document/project/${owner}/${repo}/${branch}${parentPath}/${file.name}`}>
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
