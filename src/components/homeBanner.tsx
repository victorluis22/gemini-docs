import Image, { StaticImageData } from 'next/image';

interface HomeBannerProps {
  title: string,
  image: StaticImageData,
  description: string
}

const HomeBanner: React.FC<HomeBannerProps> = ({title, image, description}) => {
    return (
        <div className="bg-gray-900 w-full p-5 shadow-md flex justify-center items-center max-w-screen-xl">
          <div className="flex gap-5 w-full flex-row justify-center items-center max-md:flex-col-reverse max-w-screen-xl">
            <div className="w-1/2 max-md:w-full">
              <h1 className='font-bold text-3xl text-gray-100'>{title}</h1>
              <p className="text-gray-100 w-full">{description}</p>
            </div>
            <Image className="w-1/4" src={image} alt='Gemini Docs Logo' />
          </div>
        </div>
    )
}

export default HomeBanner