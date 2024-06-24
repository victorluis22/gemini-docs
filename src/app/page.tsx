import { Button } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';

export default function Home() {

  return (
    <main className="flex grow flex-col items-center justify-center gap-5 m-5">
        <h1 className='font-bold text-3xl'>Gemini Docs</h1>
        <p>Use a IA do google para documentar seus projetos</p>
        <Button variant="contained" href="/document/one" endIcon={<InsertDriveFileIcon />}>Documentar um arquivo</Button>
        <Button variant="contained" href="/document/multiple" endIcon={<FolderIcon />}>Documentar projeto</Button>
        
    </main>
  );
}


