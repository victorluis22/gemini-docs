import { NextRequest } from 'next/server';
import axios from 'axios';

async function getRepositoryFiles(owner: string, repo: string, path: string = ''): Promise<any[]> {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const response = await axios.get(apiUrl, {headers: {Authorization: `Bearer ${process.env.GITHUB_TOKEN}`}});

  const files = response.data;
  const result = [];

  for (const file of files) {
    if (file.type === 'file') {
      result.push(file);
    } else if (file.type === 'dir') {
      const subDirFiles = await getRepositoryFiles(owner, repo, file.path);
      result.push({ ...file, children: subDirFiles });
    }
  }

  return result;
}

export async function POST (req: NextRequest) {
  const { repoUrl } = await req.json();

  try {
    const repoMatch = repoUrl.match(/https:\/\/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!repoMatch) {
      return Response.json({ message: 'Invalid GitHub repository URL' }, {status: 400});
    }

    const owner = repoMatch[1];
    const repo = repoMatch[2];

    const files = await getRepositoryFiles(owner, repo);

    return Response.json({ message: 'Files retrieved successfully', owner, name: repo, files }, {status: 200});
  } catch (error) {

    console.error('Error fetching repository files:', error);
    return Response.json({ message: 'Failed to fetch repository files' }, {status: 500});
  }
}

