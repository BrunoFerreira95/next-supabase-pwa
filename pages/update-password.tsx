import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'

import Image from 'next/image'
import Link from 'next/link'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type RegisterUserData = {
  password: string;
  confirmPassword: string;
}

const RegisterUserFormSchema = yup.object({
  password: yup.string().required('A senha é obrigatório').min(8, 'Deve contem 8 caracteres no minimo'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senha não coincidem').required('A confirmação da senha é obrigatória')
})


import logo from '../assets/icons/logo.png'
import { useEffect } from 'react'


export default function SignUp() {
  const { register, handleSubmit, formState: { errors }, reset} = useForm<RegisterUserData>({ resolver: yupResolver(RegisterUserFormSchema)})

  const supabase = useSupabaseClient()

  const notify = () => toast.success('Sua senha foi alterada com sucesso', {
    position: "top-center",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const handleRegisterUser: handleSubmit<RegisterUserData> = async (userData: RegisterUserData) => {
    
    if (userData.password !== userData.confirmPassword) {
      return
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: userData.password,
      })

      
      if (error) {
      } else {
        reset()
        notify()
      }
    } catch (e) {
    }
    
  }


  return (
    <>
    <div className='h-screen w-screen bg-fundo py-2 sm:flex  sm:flex-col'>

      <div className='sm:w-screen h-auto sm:flex sm:justify-center'>
          <div className='mt-8 h-fit'>
            <div className='flex justify-center sm:mt-8'>
              <Image  src={logo} alt='logo da Service Security'/>
            </div>  
      

            <p className='pl-5 sm:text-4xl text-white font-bold'>Bem vindo</p>
            <p className='pl-5 sm:text-base text-white'>Altere a sua senha!</p>




          <form onSubmit={handleSubmit(handleRegisterUser)} className='flex justify-center mx-4 flex-col bg-white p-5 rounded-xl mt-6 sm:w-6/6 sm:h-2/5'>
            <label htmlFor="password">
              <span className='text-black font-bold'>Senha:</span><br></br>
              <input placeholder='Digite a sua senha' className='bg-white  text-black h-11 w-64 mb-1 rounded-lg mt-2 border-2 border-black' type="password" name='password' {...register('password')}/>
              <p>{errors.password?.message}</p>
            </label>
            <label htmlFor="password_confirme">
              <span className='text-black font-bold'>Confirme a senha:</span><br></br>
              <input placeholder='Confirme a sua senha' className='bg-white  text-black h-11 w-64 mb-1 rounded-lg mt-2 border-2 border-black' type="password" name='confirmPassword' {...register('confirmPassword')}/>
              <p>{errors.confirmPassword?.message}</p>
            </label>

            
            <button className='w-full h-8 mt-5 bg-blue-500 rounded-md text-white' type='submit'>Altere sua senha</button>

            <div className='mt-6 flex justify-end'>
              <span className='text-gray-700'>Já tem uma conta?</span>
              <Link href="/" className='text-blue-900 font-bold'> Faça o login</Link>
            </div>
          </form>
          <ToastContainer/>
        </div>
      </div>
    </div>
    </>
  )
  
}
