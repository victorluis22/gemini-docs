
import file from "../../public/file.png";
import folder from "../../public/folder.png";
import HomeCard from "@/components/homeCard";
import HomeBanner from "@/components/homeBanner";
import logo from "../../public/logo.svg";

export default function Home() {

  return (
    <main className="flex grow flex-col items-center gap-5">
        
        <HomeBanner image={logo} title="Gemini Docs" description="Gemini Docs is a web application that leverages Google's Gemini AI to automatically generate comprehensive documentation for your code. Whether you're a seasoned programmer or someone just trying to understand a snippet of code, Gemini Docs simplifies the process by providing clear, accurate, and context-aware documentation."/>
        
        <div className="px-5 w-full flex flex-row gap-5 my-5 max-w-screen-xl max-md:flex-col">
          <HomeCard title="Documenting a File" image={file} description="Gemini Docs allows you to focus on individual files, providing detailed documentation for any specific piece of code. Whether you're working on a single script or a complex module, simply upload the file, and Gemini Docs will instantly generate clear and accurate explanations. This feature is perfect for those moments when you need to understand or document a particular function, class, or algorithm without getting bogged down by the rest of the project." redirect="/document/file"/>

          <HomeCard title="Documenting a Project" image={folder} description="For larger projects, Gemini Docs offers the ability to analyze entire codebases. By scanning all files and their interdependencies, the app generates comprehensive documentation that covers every aspect of your project. This holistic approach ensures that you have a clear understanding of how different components interact, making it easier to maintain, refactor, or share your code with others. Whether you're onboarding new team members or revisiting old projects, Gemini Docs provides the insights you need to manage your codebase effectively." redirect="/document/project"/>
        </div>

        
    </main>
  );
}


