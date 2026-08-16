import { Plus } from "lucide-react";

interface CreateWorkspaceButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function CreateWorkspaceButton({
  onClick,
  disabled = false,
}: CreateWorkspaceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group w-full flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-200 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#558dff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161922] ${
        disabled
          ? "border-[#252932]/50 text-[#c2c6d7]/40 cursor-not-allowed active:scale-100"
          : "border-[#252932] text-[#c2c6d7] hover:text-[#e2e2e8] hover:border-[#558dff]/40 hover:bg-[#558dff]/5 hover:shadow-[0_0_16px_rgba(85,141,255,0.1)]"
      }`}
    >
      <Plus className="w-4 h-4 text-[#c2c6d7] group-hover:text-[#558dff] transition-colors" />
      <span className="group-hover:text-[#e2e2e8] transition-colors">
        Create new workspace
      </span>
    </button>
  );
}