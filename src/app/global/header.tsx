"use client" 

import * as React from 'react';
import Image from 'next/image';
import logo from "../../../public/logo.svg";

export default function Header() {
  return (
    <header className='flex flex-row items-center gap-2 px-5 bg-white shadow-md' id='not-printable'>
      <Image className='w-20 ' src={logo} alt='Gemini Docs Logo' />
      <h1 className='font-bold text-xl'>GEMINI DOCS</h1>
    </header>
  );
}