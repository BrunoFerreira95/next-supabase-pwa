import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, useSession } from '@supabase/auth-helpers-react'
import { createContext, useState } from 'react'
import { useContext } from 'react';
import Head from 'next/head'
import AuthContext from '@/context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const session = useSession()

  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')

  const authContext = {
      role,
      setRole,
      email,
      setEmail
    };

  const SupabaseContext = createContext(supabase);

  return (
  <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
    <AuthContext.Provider value={authContext}>
      <div className='bg-fundo min-h-screen max-h-fit'>

        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
        </Head>
        <Component {...pageProps} />

      </div>
    </AuthContext.Provider>

  </SessionContextProvider>
  
  )
}
