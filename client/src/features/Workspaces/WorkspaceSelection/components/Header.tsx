import { LayoutGrid } from "lucide-react";


function Header() {
    return (
        <>
        {/* Header */}
        <header className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-lg bg-[#1e2024] flex items-center justify-center mb-3 border border-[#424654]">
            <LayoutGrid className="w-6 h-6 text-[#558dff]" />
          </div>
          <h1 className="text-2xl font-semibold text-[#e2e2e8] tracking-tight mb-1">
            Workly
          </h1>
          <h2 className="text-lg font-semibold text-[#e2e2e8] mt-2">
            Select your workspace
          </h2>
          <p className="text-sm text-[#c2c6d7] mt-1">
            Choose a team to continue or create a new one.
          </p>
        </header>
</>
    )
}

export default  Header;