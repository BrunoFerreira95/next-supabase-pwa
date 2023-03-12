import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import SignIn from './SignIn'
import { useEffect, useState } from 'react'
import SignUp from './SignUp'
import Roles from '@/components/roles'
import Admin from '@/components/Admin'
import Teste from '@/components/Teste'

const inter = Inter({ subsets: ['latin'] })

type RoleProps = {
  role: 'admin' | 'teste' | 'simple'
}

export default function Home() {
  const [role, setRole] = useState('')
  const session = useSession()
  const supabase = useSupabaseClient()
  const conponent = null

  async function checkRole() {
    const userId = session?.user.id
    const userRole = await supabase.from('profile').select('role').eq('id', userId)
    setRole(userRole)
  }

  useEffect(() => {
    checkRole()
  }, [])

  return (
    <>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? (
          <>
            <SignIn supabaseClient={supabase}/>
            <SignUp supabaseClient={supabase}/>
          </>
          // <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
        ) : (
          <>
            <Teste supabaseClient={supabase}/>
          </>
          // <>
          //   <Account session={session}/>
          // </>
        )}
      </div>
    </>
  )
}
