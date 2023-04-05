import Image from "next/image"
import Link from "next/link";
import { useRouter } from 'next/router';

import Logo2 from "../assets/icons/logo2.png"
import Voltar from "../assets/icons/voltar.png"


export function Header({ isMiddle }) {
    const router = useRouter();

    function handleVoltar() {
        router.back();
    }
    let header
    if (!isMiddle) {
        header = (
            <div className="flex justify-between sm:mx-14 mx-4 items-center">  
            <Link href='/' onClick={handleVoltar} className="text-lg sm:w-12 sm:h-16 w-28 h-9">
                <Image className='sm:w-20  w-6' src={Voltar} alt='Botão voltar'/>
                
            </Link>
            <Link href='/Home' className="bg-red-700/70 text-center text-3xl font-extrabold uppercase sm:w-40 sm:h-16 w-28 h-9 rounded-3xl ">
                <span className='sm:w-10  w-6'>Inicio</span>
            </Link>
            <div className='flex justify-center'>
                <Image className='sm:w-45 w-32 ' src={Logo2} alt='Logo do Apoio Monitorado'/>

            </div>
        </div>
        )
      } else {
        header = (
            <div className="flex justify-center sm:mx-14 mx-4 items-center">  
                <div className='flex justify-center'>
                    <Image className='sm:w-48 w-32' src={Logo2} alt='Logo do Apoio Monitorado'/>
    
                </div>
            </div>
        )
      }

    
    return (
        <>
            {header}
        </>
    
    )
}