'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => setUser(session?.user ?? null)
    )
    return () => subscription.unsubscribe()
  }, [])

  const signIn = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password })

  const signUp = (email: string, password: string, name: string) =>
    supabase.auth.signUp({ email, password,
      options: { data: { role: 'user', displayName: name } }
    })

  const signOut = () => supabase.auth.signOut()

  return {
    user,
    loading,
    isAdmin: user?.user_metadata?.role === 'admin',
    isLoggedIn: !!user,
    signIn, signUp, signOut
  }
}
