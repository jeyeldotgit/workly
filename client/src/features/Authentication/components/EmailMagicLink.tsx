import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/auth-api";
import { ArrowRight } from "lucide-react";

function EmailMagicLink() {
  const [email, setEmail] = useState("");

  // TanStack Query handles all states automatically
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      setEmail(""); // Optional: clear input on success
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(email);
  };

  return (
    <>
      <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
        <div>
          <label className="sr-only" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@workly.com"
            required
            className="w-full bg-[#1a1c20] border border-[#424654] rounded-lg py-2.5 px-4 text-xs text-[#e2e2e8] placeholder-[#8c90a0] outline-none transition-all focus:border-[#558dff] focus:ring-2 focus:ring-[#558dff]/30"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 bg-[#558dff] hover:bg-[#558dff]/90 transition-colors rounded-lg py-2.5 px-4 group text-xs font-medium text-white disabled:opacity-50 cursor-pointer"
        >
          <span>{isPending ? "Sending..." : "Send Magic Link"}</span>
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      {/* Visual Feedback Containers - Replace With Status Modals or Toast*/}
      {isSuccess && (
        <p className="mt-3 text-center text-xs text-[#42b883] bg-[#42b883]/10 border border-[#42b883]/20 py-2 px-3 rounded-lg animate-fade-in">
          Check your inbox for the magic link!
        </p>
      )}

      {isError && (
        <p className="mt-3 text-center text-xs text-[#ff5c5c] bg-[#ff5c5c]/10 border border-[#ff5c5c]/20 py-2 px-3 rounded-lg animate-fade-in">
          {error.message}
        </p>
      )}
    </>
  );
}

export default EmailMagicLink;
