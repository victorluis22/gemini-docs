import { Button } from "@mui/material";
import Image, { StaticImageData } from 'next/image';

interface HomeCardProps{
    title: string,
    image: StaticImageData,
    description: string,
    redirect: string
}

const HomeCard: React.FC<HomeCardProps> = ({title, image, description, redirect}) =>  {

  return (
    <div className="flex flex-col shadow-md w-1/2 bg-white rounded-md p-5 gap-2 max-md:w-full">
        <h1 className='font-bold text-3xl'>{title}</h1>
        <Image className="w-1/4" src={image} alt='File' />
        <p>{description}</p>
        
        <Button className="w-fit" variant="contained" href={redirect}>Try</Button>
    </div>
  );
}

export default HomeCard


