import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react';

export default function Admin({session}) {
  const supabase = useSupabaseClient<Database>()
  
  
  return (
    <>
      <h1>admin</h1>
      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </>
  )
}