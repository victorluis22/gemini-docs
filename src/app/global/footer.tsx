import Image from "next/image";

export default function Footer () {
    return (
        <footer className="flex items-center justify-center bg-white gap-5 p-5" id='not-printable'>
            <h3>Developed with ❤️ by Victor</h3>
            <a href="https://github.com/victorluis22" target="_blank" rel="noreferrer noopener">
            <Image
             src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" 
             alt="Logo Github" 
             width={80}
             height={80}
            />
        </a>
        </footer>
    )
}