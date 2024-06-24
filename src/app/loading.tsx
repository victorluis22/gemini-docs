import { CircularProgress } from '@mui/material';

export default function Loading(){
    return (
        <div className='flex justify-center items-center flex-grow'>
            <CircularProgress />
        </div>
    );
}