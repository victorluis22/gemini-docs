"use client"

import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export default function Return() {
    const router = useRouter();
    const pathname = usePathname()

    if (pathname != "/") {
        return (
            <div className="flex items-center gap-2 ml-5 mt-5" id='not-printable'>
                <IconButton size="medium" onClick={() => router.back()}>
                    <ArrowBack />
                </IconButton>
                <p className="font-bold opacity-70">Retornar</p>
            </div>
        )
    }
    else{
        return null
    }    
}