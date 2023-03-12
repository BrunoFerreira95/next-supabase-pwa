import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'


export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const supabase = useSupabaseClient()

  async function handleRegisterUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
  }
  return (
    <form onSubmit={handleRegisterUser}>
      <h1>Registrar:</h1>
      <label htmlFor="email">
        <span>Email:</span>
        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
      </label>
      <label htmlFor="password">
        <span>Password</span>
        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <button>Registrar</button>
    </form>
  )
}