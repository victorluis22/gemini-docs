import { NextRequest } from 'next/server';
import axios from 'axios';

export async function POST (req: NextRequest) {
  const { apiUrl } = await req.json();

  try {
    const response = await axios.get(apiUrl, {headers: {Authorization: `Bearer ${process.env.GITHUB_TOKEN}`}});

    return Response.json({ message: 'Files retrieved successfully', content: response.data.toString() }, {status: 200});
  } catch (error) {

    console.error('Error fetching repository content:', error);

    return Response.json({ message: 'Failed to fetch repository content' }, {status: 500});
  }
}

