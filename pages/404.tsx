import { Header } from "@/components/Header";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Link from "next/link";


export default function FourOhFour(){
    
    return(

        <>
            <div className="bg-fundo min-h-screen max-h-fit">
                <Header isMiddle/>

                <div className="flex justify-center text-white font-light pl-5 sm:text-8xl text-4xl sm:mt-6">😣</div>
                <div className="flex justify-center text-white font-light pl-5 sm:text-6xl sm:mb-6 text-5xl sm:mt-6">404</div>
                <div className="flex justify-center text-white font-light pl-5 sm:text-4xl sm:mb-6 text-3xl md:mb-9 mt-6">Página não encontrada</div>
                <div className="flex justify-center"></div>


                
                <Link href={'/'}className='flex justify-center'>        
                    <span className="bg-red-700 text-white flex justify-center font-semibold sm:text-5xl md:text-3xl sm:w-96 md:w-72 sm:h-16 my-4 rounded-2xl mt-9 w-28 h-12">
                    Início
                    </span>
                </Link>
                


               </div>
    
        </>
    )
}