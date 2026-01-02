import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load auth from storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      }
    } catch (e) {
      console.error("Auth parse error", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Persist auth
  useEffect(() => {
    if (token) {
      localStorage.setItem(
        "auth",
        JSON.stringify({ user, token })
      );
    } else {
      localStorage.removeItem("auth");
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
  }, [token])

  const login = async ({ email, password }) => {
    if (!email || !password) {
      throw new Error("Missing credentials");
    }

    // mock login
    const mockToken = "mock-token";
    const mockUser = {
      name: email.split("@")[0],
      email
    };

    setUser(mockUser);
    setToken(mockToken);

    return { user: mockUser, token: mockToken };
  };

  const signup = async ({ name, email, password }) => {
    if (!name || !email || !password) {
      throw new Error("Missing fields");
    }

    const mockToken = "mock-token";
    const mockUser = { name, email };

    setUser(mockUser);
    setToken(mockToken);

    return { user: mockUser, token: mockToken };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    signup,
    logout
  };

  // prevent route flicker
  if (loading) return null;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
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
