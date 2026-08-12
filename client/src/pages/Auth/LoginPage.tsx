import { Code2, Mail } from "lucide-react";
import icon from "../../../public/app-icon-128.png";
import EmailMagicLink from "../../features/Authentication/components/EmailMagicLink";

export default function WorklyLoginPage() {
  return (
    <div className="min-h-screen bg-[#090D16] text-[#e2e2e8] flex flex-col items-center justify-center p-4 antialiased selection:bg-blue-500 selection:text-white">
      {/* Main Container Card */}
      <main className="w-full max-w-[420px] bg-[#1A1D23] rounded-xl border border-[#252932] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md relative overflow-hidden">
        {/* Header */}
        <header className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 rounded-lg bg-[#282a2e] flex items-center justify-center mb-6 border border-[#424654] overflow-hidden">
            <img
              alt="Workly Logo"
              className="w-full h-full object-cover"
              src={icon}
            />
          </div>
          <h1 className="text-2xl font-semibold text-[#e2e2e8] mb-2 tracking-tight">
            Welcome to Workly
          </h1>
          <p className="text-xs text-[#c2c6d7]">Manage workflow with ease</p>
        </header>

        {/* Social Auth Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-[#1a1c20] hover:bg-[#1e2024] transition-colors border border-[#424654] rounded-lg py-2.5 px-4 text-xs font-medium text-[#e2e2e8]"
          >
            <Code2 className="w-[18px] h-[18px]" />
            <span>Continue with GitHub</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-[#1a1c20] hover:bg-[#1e2024] transition-colors border border-[#424654] rounded-lg py-2.5 px-4 text-xs font-medium text-[#e2e2e8]"
          >
            <Mail className="w-[18px] h-[18px]" />
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-[#424654]"></div>
          <span className="flex-shrink-0 mx-4 text-[11px] font-semibold text-[#c2c6d7] uppercase tracking-widest">
            or
          </span>
          <div className="flex-grow border-t border-[#424654]"></div>
        </div>

        {/* Email Magic Link Form */}
        <EmailMagicLink />
        {/* Registration Link */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[#c2c6d7]">
            Don't have an account?{" "}
            <a
              href="#signup"
              className="text-[#b0c6ff] hover:text-[#d9e2ff] transition-colors underline-offset-4 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
