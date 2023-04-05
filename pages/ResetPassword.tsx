import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type LoginUserData = {
  email: string;
}

const loginUserFormSchema = yup.object({
  email: yup.string().required('O e-mail é obrigadorio').email('Deve ser um e-mail valido'),
})

import logo from '../assets/icons/logo.png'
import AuthContext from '@/context/AuthContext'


export default function SignIn() {
  const { register, handleSubmit, formState: { errors }, reset} = useForm<LoginUserData>({ resolver: yupResolver(loginUserFormSchema)})

  const auth = useContext(AuthContext)

  const supabase = useSupabaseClient()

  const notify = () => toast.success('Verifique seu email', {
    position: "top-center",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const handleRsetPassword: handleSubmit<LoginUserData> = async (userData: LoginUserData) => {
    let email = userData.email
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: 'https://service-three.vercel.app/update-password' }
      )
      if (error) {
      }else {
        reset()
        notify()
      }
      
      
      
    } catch (e) {
    }
  }
  

  return (
    <div className='bg-fundo h-screen w-screen sm:flex  sm:flex-col'>

      <div className='flex justify-center sm:mt-8'>
        <Image  src={logo} alt='logo da Service Security'/>
      </div>

    <div className='sm:w-screen h-auto sm:flex sm:justify-center'>
      <div className='mt-8 h-fit'>

        <p className='text-4xl text-white ml-4'>Bem vindo</p>
        <p className='text-base text-gray-400 ml-4'>Redefina a sua senha!</p>



        <form onSubmit={handleSubmit(handleRsetPassword)} className='flex justify-center mx-4 flex-col bg-white p-5 rounded-xl mt-10 sm:w-6/6 sm:h-2/5 '>
          <label htmlFor="email">
            <span className='text-black font-bold'>E-mail: </span><br></br>
            <input className='bg-white text-black h-11 w-64 mb-1 rounded-lg mt-2 border-2 border-black' type="text" name='email' {...register('email')}/>
            <p>{errors.email?.message}</p>
          </label><br></br>

          
          <button className='w-full h-8 mt-5 bg-blue-500 rounded-md text-white' type='submit'>Recuperar</button>
          <div className='mt-6 flex justify-end'>
            <span className='text-gray-700'>Deseja fazer o Login?</span>
            <Link className='text-blue-900 font-bold' href='/SignIn'>
              Logar-se
            </Link>
          </div>
        </form>
      </div>
    </div>
    <ToastContainer/>
    </div>
  )
}