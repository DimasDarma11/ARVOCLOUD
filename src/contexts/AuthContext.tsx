import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ===== Sync session from Supabase =====
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ===== Login =====
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.toLowerCase().includes("invalid login credentials")) {
        throw new Error("Email atau kata sandi yang Anda masukkan tidak sesuai.");
      } else if (error.message.toLowerCase().includes("email not confirmed")) {
        throw new Error("Email Anda belum dikonfirmasi. Silakan cek kotak masuk Anda.");
      } else {
        throw new Error("Terjadi kesalahan saat masuk. Silakan coba lagi nanti.");
      }
    }
    setUser(data.user ?? null);
  };

  // ===== Register =====
  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp(
      { email, password },
      { data: { full_name: fullName } } 
    );
    if (error) throw new Error(error.message);

    if (data.user) {
      setUser(data.user);

      // Simpan ke table profiles
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        email,
        full_name: fullName,
      });
      if (profileError) throw new Error(profileError.message);
    }
  };

  // ===== Logout =====
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// ===== Hook =====
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
