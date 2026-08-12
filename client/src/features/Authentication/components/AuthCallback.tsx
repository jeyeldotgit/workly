import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../../utils/supabase";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard");
      } else if (event === "SIGNED_OUT" && !session) {
        navigate("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <p>Completing sign in...</p>
    </div>
  );
}

export default AuthCallback;
