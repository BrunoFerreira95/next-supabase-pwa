import { Inter } from 'next/font/google'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import SignIn from './SignIn'
import { createContext, useContext, useEffect, useState } from 'react'
import AuthContext from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  const auth = useContext(AuthContext)

  const fetchRole = async () => {
    if (session?.user.id !== undefined) {
      const { data: profilesData, error: profilesError } = await supabase.from("profiles").select("role").eq('id', session?.user.id);
      if (profilesError) throw new Error(profilesError.message);
  
      auth.setRole(profilesData[0].role)
    }

    
  };

  
  function renderScreen() {
  
    if(auth.role === '') {
      fetchRole()
    }
    try{
      switch (auth.role) {
        case 'admin':
          return <AdminHome/>;
        case 'inteligencia':
          return <InteligenciaHome/>;
        case 'pm':
          return <HomePage />;
        case 'visitante':
          return <HomePopulacao/>
      }

    } catch(error) {
    }
  }

  return (
    <>
    {!session ? <SignIn /> : renderScreen()}
    </>
  )
}
