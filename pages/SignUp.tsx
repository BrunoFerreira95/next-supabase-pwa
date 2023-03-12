import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'

import { Database } from '../utils/database.types'

type Profiles = Database['public']['Tables']['profiles']['Row']
export default function SignUp({supabaseClient}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const supabase = useSupabaseClient<Database>()

  async function handleRegisterUser(e) {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
  }
  return (
    <form onSubmit={handleRegisterUser}>
      <label htmlFor="email">
        <span>Email:</span>
        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
      </label>
      <label htmlFor="password">
        <span>Password</span>
        <input type="text" onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <button>Registrar</button>
    </form>
  )
}