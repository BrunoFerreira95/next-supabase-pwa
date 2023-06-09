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
  password: string;
}

const loginUserFormSchema = yup.object({
  email: yup.string().required('O e-mail é obrigadorio').email('Deve ser um e-mail valido'),
  password: yup.string().required('A senha é obrigatorio').min(8, 'Deve contem 8 caracteres no minimo')
})

import logo from '../assets/icons/logo.png'
import AuthContext from '@/context/AuthContext'


export default function SignIn() {
  const { register, handleSubmit, formState: { errors }} = useForm<LoginUserData>({ resolver: yupResolver(loginUserFormSchema)})

  const auth = useContext(AuthContext)

  const supabase = useSupabaseClient()

  const notify = () => toast.error('Senha ou email errado', {
    position: "top-center",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const handleLoginUser: handleSubmit<LoginUserData> = async (userData: LoginUserData) => {
    let user
    try {
      user = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });
      if (error) {
        return;
      }else {
        const { data: profilesData, error: profilesError } = await supabase.from("profiles").select("role").eq('id', user.data.user.id);
        if (profilesError) throw new Error(profilesError.message);
        
        auth.setEmail(userData.email)
        auth.setRole(profilesData[0].role)
        
      }
      
      
      
    } catch (e) {
      notify()
    } finally {
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
        <p className='text-base text-gray-400 ml-4'>Realize o seu login</p>



        <form onSubmit={handleSubmit(handleLoginUser)} className='flex justify-center mx-4 flex-col bg-white p-5 rounded-xl mt-10 sm:w-6/6 sm:h-2/5 '>
          <label htmlFor="email">
            <span className='text-black font-bold'>E-mail: </span><br></br>
            <input className='bg-white text-black h-11 w-64 mb-1 rounded-lg mt-2 border-2 border-black' type="text" name='email' {...register('email')}/>
            <p>{errors.email?.message}</p>
          </label><br></br>
          <label htmlFor="password">
            <span className='text-black font-bold '>Senha:</span><br></br>
            <input className='bg-white h-11 text-black w-64 rounded-lg mt-2 border-2 border-black' type="password" name='password' {...register('password')} />
            <p>{errors.password?.message}</p>
          </label>
          <Link href={'/ResetPassword'}>
            <p className='font-bold text-black flex justify-end mt-4'>Esqueceu a senha?</p>
          </Link>

          
          <button className='w-full h-8 mt-5 bg-blue-500 rounded-md text-white' type='submit'>Entrar</button>
          <div className='mt-6 flex justify-end'>
            <span className='text-gray-700'>Não tem conta?</span>
            <Link className='text-blue-900 font-bold' href='/SignUp'>
              Cadastre-se
            </Link>
          </div>
        </form>
        <ToastContainer/>
      </div>
    </div>
    </div>
  )
}