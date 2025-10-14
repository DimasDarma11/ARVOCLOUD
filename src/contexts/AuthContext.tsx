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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const signUp = async (email: string, password: string, fullName: string) => {
    // cek dulu apakah email sudah ada di profiles
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) throw new Error("Email sudah terdaftar di sistem.");

    // daftar di Auth
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);

    if (data.user) {
      setUser(data.user);

      // insert ke profiles
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        email,
        full_name: fullName,
      });

      if (profileError) {
        // Kalau insert gagal, beri alert, karena frontend biasa tidak bisa rollback Auth
        console.error("Gagal membuat profil:", profileError.message);
        alert("Pendaftaran berhasil tapi profil gagal dibuat. Silakan hubungi admin.");
      }
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error("Gagal keluar dari akun. Silakan coba lagi.");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
