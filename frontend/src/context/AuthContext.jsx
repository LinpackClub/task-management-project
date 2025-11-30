import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data?.session ?? null)
      setUser(data?.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    return { data, error }
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback'
      }
    })
    return { data, error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = { 
    user, 
    session, 
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
