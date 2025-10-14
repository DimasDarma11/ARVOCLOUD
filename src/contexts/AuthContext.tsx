const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  if (data.user) {
    // masukkan data ke profiles dulu
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      email,
      full_name: fullName,
    });
    if (profileError) throw profileError;

    // baru set user
    setUser(data.user);
  }
};

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

  // update state user
  setUser(data.user ?? null);
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Gagal keluar dari akun. Silakan coba lagi.");

  // reset user state
  setUser(null);
};
