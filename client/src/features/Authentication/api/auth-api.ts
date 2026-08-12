import { supabase } from "../../../utils/supabase";

const redirectUrl = import.meta.env.VITE_URL;

async function signIn(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
}

export { signIn };
