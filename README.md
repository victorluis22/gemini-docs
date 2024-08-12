# Gemini Docs

Gemini Docs is a web application that leverages Google's Gemini AI to automatically generate comprehensive documentation for your code. Whether you're a seasoned programmer or someone just trying to understand a snippet of code, Gemini Docs simplifies the process by providing clear, accurate, and context-aware documentation.

![Home Page](/public/screenshots/home.png)

## Usage

To use the app, start by visiting its webpage at https://gemini-docs.vercel.app/. On the homepage, you can choose to analyze either a single file or an entire project.

### Documenting a File

1. To document a file, click the "Try" button in the "Documenting a File" section.
![alt text](/public/screenshots/file.png)
2. On the next page, upload your file for analysis. Currently, Gemini Docs supports JavaScript, TypeScript, Python, and React formats such as JSX and TSX.
![alt text](/public/screenshots/fileupload.png)
3. Simply click the "Upload File" button, select your file, and then hit "Submit."
4. Gemini Docs will analyze your code and return a detailed explanation.
![alt text](/public/screenshots/fileResponse.png)
5. To view the analyzed code, open the section labeled "Code."
6. You can also save this explanation as a PDF to share with others or keep for future reference.

### Documenting a Project:

1. To document an entire project, click the "Try" button in the "Documenting a Project" section on the homepage.
![alt text](/public/screenshots/project.png)
2. Initially, no projects will be listed, so click "Add Project."
3. On the following page, provide the link to a public GitHub repository and specify the branch where your project is located. By default, the "main" branch is selected, but this can be changed if needed.
![alt text](/public/screenshots/uploadProject.png)
4. The system accepts any public repository, but it will only generate documentation for projects with files in JavaScript, TypeScript, Python, or React formats like JSX and TSX.
5. Once the repository is added, you can navigate through the project’s files to view the generated documentation for each file.
![alt text](/public/screenshots/repo.png)
6. Clicking on a file will prompt Gemini Docs to analyze the code, providing detailed explanations of each import and line of code, along with observations and improvement tips if necessary.
![alt text](/public/screenshots/projectResponse.png)

## Used Tecnologies

- Next.js
- Gemini API
- Tailwind CSS
- Typescript
