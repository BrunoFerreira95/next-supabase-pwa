import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react';

export default function Teste({session}) {
  const supabase = useSupabaseClient<Database>()
  const [role, setRole] = useState([{}])

  async function checkRole() {
    const userId = session?.user.id
    const userRole = await supabase.from('profile').select('role').eq('id', userId)
    console.log(userRole.data)
  }

  useEffect(() => {
    const userRoleTeste = checkRole()
    // setRole(userRoleTeste)
  }, [])
  
  return (
    <>
      <h1>teste</h1>
      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </>
  )
}