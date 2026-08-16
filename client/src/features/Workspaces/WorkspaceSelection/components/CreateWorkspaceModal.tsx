import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Building2, Mail, ArrowRight, Link2 } from 'lucide-react';
import type { CreateWorkspaceData } from '../types/types';

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWorkspace?: (data: CreateWorkspaceData) => void;
}

export default function CreateWorkspaceModal({
  isOpen,
  onClose,
  onCreateWorkspace,
}: CreateWorkspaceModalProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [invitedMembers, setInvitedMembers] = useState<string[]>([
    'sarah@acme.com',
  ]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-generate slug from name unless manually edited
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    if (!isSlugEdited) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugEdited(true);
    setSlug(e.target.value);
  };

  const handleAddMember = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = emailInput.trim();
    if (trimmed && !invitedMembers.includes(trimmed)) {
      setInvitedMembers([...invitedMembers, trimmed]);
      setEmailInput('');
    }
  };

  const handleRemoveMember = (emailToRemove: string) => {
    setInvitedMembers(
      invitedMembers.filter((email) => email !== emailToRemove)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onCreateWorkspace) {
      onCreateWorkspace({ name, slug, members: invitedMembers });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex min-h-dvh items-center justify-center overflow-y-auto p-4"
        >
          {/* Backdrop Dimming Layer */}
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative z-10 my-auto w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-hidden bg-[#161922] border border-[#252932] rounded-xl shadow-[0_24px_80px_rgba(0,0,0,0.65)] flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#252932] flex justify-between items-start bg-[#161922]">
              <div>
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-[#e2e2e8] tracking-tight"
                >
                  Create New Workspace
                </h2>
                <p className="text-xs text-[#c2c6d7] mt-0.5">
                  Build a space for your team to collaborate in real-time.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="text-[#c2c6d7] hover:text-[#e2e2e8] p-1.5 rounded-lg hover:bg-[#252932] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#558dff]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-y-auto">
              <div className="p-6 space-y-5">
                
                {/* Input 1: Workspace Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="workspace-name"
                    className="block text-xs font-medium text-[#e2e2e8]"
                  >
                    Workspace Name
                  </label>
                  <div className="relative rounded-lg border border-[#252932] bg-[#0d0f14] focus-within:border-[#558dff]/50 focus-within:ring-2 focus-within:ring-[#558dff]/20 transition-all flex items-center">
                    <Building2 className="w-4 h-4 text-[#c2c6d7] ml-3 shrink-0" />
                    <input
                      id="workspace-name"
                      type="text"
                      autoComplete="off"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="e.g., Acme Studio"
                      className="w-full bg-transparent border-none text-[#e2e2e8] text-xs py-2.5 px-2.5 focus:outline-none placeholder-[#c2c6d7]/40"
                      required
                    />
                  </div>
                </div>

                {/* Input 2: Workspace URL Slug */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="workspace-url"
                    className="block text-xs font-medium text-[#e2e2e8]"
                  >
                    Workspace URL / Slug
                  </label>
                  <div className="flex rounded-lg border border-[#252932] bg-[#0d0f14] overflow-hidden focus-within:border-[#558dff]/50 focus-within:ring-2 focus-within:ring-[#558dff]/20 transition-all">
                    <span className="flex items-center gap-1.5 px-3 bg-[#1e222d] border-r border-[#252932] text-[#c2c6d7] font-mono text-xs select-none">
                      <Link2 className="w-3.5 h-3.5 text-[#558dff]" />
                      workly.app/
                    </span>
                    <input
                      id="workspace-url"
                      type="text"
                      autoComplete="off"
                      value={slug}
                      onChange={handleSlugChange}
                      placeholder="acme-studio"
                      className="w-full bg-transparent border-none text-[#e2e2e8] text-xs py-2.5 px-3 focus:outline-none placeholder-[#c2c6d7]/40 font-mono"
                      required
                    />
                  </div>
                </div>

                {/* Team Section */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="invite-team"
                    className="block text-xs font-medium text-[#e2e2e8]"
                  >
                    Invite Team Members
                  </label>
                  <div className="flex gap-2">
                    <div className="relative rounded-lg border border-[#252932] bg-[#0d0f14] focus-within:border-[#558dff]/50 focus-within:ring-2 focus-within:ring-[#558dff]/20 transition-all flex-1 flex items-center">
                      <Mail className="w-4 h-4 text-[#c2c6d7] ml-3 shrink-0" />
                      <input
                        id="invite-team"
                        type="email"
                        autoComplete="off"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddMember();
                          }
                        }}
                        placeholder="colleague@example.com"
                        className="w-full bg-transparent border-none text-[#e2e2e8] text-xs py-2.5 px-2.5 focus:outline-none placeholder-[#c2c6d7]/40"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="bg-[#252932] hover:bg-[#558dff] hover:text-white text-[#e2e2e8] text-xs font-medium px-4 rounded-lg border border-[#252932] hover:border-[#558dff] transition-all duration-200 flex items-center justify-center whitespace-nowrap cursor-pointer active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#558dff]"
                    >
                      Add
                    </button>
                  </div>

                  {/* Invited Members List */}
                  {invitedMembers.length > 0 && (
                    <div className="mt-3 flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-0.5">
                      <AnimatePresence initial={false}>
                        {invitedMembers.map((email) => (
                          <motion.div
                            key={email}
                            initial={{ opacity: 0, height: 0, y: -4 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -4 }}
                            transition={{ duration: 0.18 }}
                            className="flex items-center justify-between p-2 rounded-lg bg-[#0d0f14] border border-[#252932] hover:border-[#558dff]/30 transition-colors group"
                          >
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <div className="w-6 h-6 rounded-md bg-[#558dff]/10 text-[#558dff] border border-[#558dff]/20 flex items-center justify-center text-[10px] font-semibold shrink-0 uppercase">
                                {email.charAt(0)}
                              </div>
                              <span className="text-xs text-[#e2e2e8] truncate">{email}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveMember(email)}
                              className="text-[#c2c6d7] hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-70 group-hover:opacity-100 p-1 rounded cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer / Actions */}
              <div className="px-6 py-4 border-t border-[#252932] bg-[#0d0f14] flex items-center justify-between mt-auto">
                <div className="flex items-center text-[#c2c6d7] font-mono text-[11px] gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-[#161922] border border-[#252932] text-[10px] text-[#e2e2e8]">
                    ESC
                  </span>
                  <span>to cancel</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs font-medium text-[#c2c6d7] hover:text-[#e2e2e8] hover:bg-[#252932] px-3.5 py-2 rounded-lg transition-colors border border-transparent cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#558dff]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-xs font-medium text-white bg-[#558dff] hover:bg-[#558dff]/90 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5 shadow-[0_0_16px_rgba(85,141,255,0.25)] hover:shadow-[0_0_20px_rgba(85,141,255,0.4)] active:scale-[0.98] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>Create Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}