import { useCallback, useEffect, useState } from 'react';
import type { CreateWorkspaceData, Workspace } from '../../../features/Workspaces/WorkspaceSelection/types/types';
import { WORKSPACES } from '../../../features/Workspaces/WorkspaceSelection/data/workspace-data';
import WorkspaceList from '../../../features/Workspaces/WorkspaceSelection/components/WorkspaceList';
import Header from '../../../features/Workspaces/WorkspaceSelection/components/Header';
import CreateWorkspaceButton from '../../../features/Workspaces/WorkspaceSelection/components/CreateWorkspaceButton';
import CreateWorkspaceModal, {
} from '../../../features/Workspaces/WorkspaceSelection/components/CreateWorkspaceModal';
import Footer from '../../../features/Workspaces/WorkspaceSelection/components/Footer';

export default function WorkspaceSelectionPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCreateWorkspaceModalOpen, setIsCreateWorkspaceModalOpen] =
    useState(false);

  const handleSelectWorkspace = useCallback((workspace: Workspace) => {
    setSelectedId(workspace.id);
    console.log('Selected workspace:', workspace);
    // Add navigation logic here (e.g., router.push(`/workspaces/${workspace.id}`))
  }, []);

  const handleOpenCreateWorkspaceModal = useCallback(() => {
    setIsCreateWorkspaceModalOpen(true);
  }, []);

  const handleCloseCreateWorkspaceModal = useCallback(() => {
    setIsCreateWorkspaceModalOpen(false);
  }, []);

  const handleCreateWorkspace = useCallback((data: CreateWorkspaceData) => {
    console.log('Workspace created:', data);
  }, []);

  // Keyboard shortcuts (1, 2, 3) for workspace selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCreateWorkspaceModalOpen) {
        return;
      }

      // Prevent shortcut if typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const keyIndex = parseInt(e.key, 10) - 1;
      if (keyIndex >= 0 && keyIndex < WORKSPACES.length) {
        handleSelectWorkspace(WORKSPACES[keyIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelectWorkspace, isCreateWorkspaceModalOpen]);

  const pageContentState = isCreateWorkspaceModalOpen
    ? 'opacity-45 blur-[1px] scale-[0.98] pointer-events-none'
    : 'opacity-100 blur-0 scale-100';

  const ambientGlowState = isCreateWorkspaceModalOpen
    ? 'opacity-30'
    : 'opacity-100';

  return (
    <div className="relative min-h-screen bg-[#090D16] text-[#e2e2e8] flex flex-col items-center justify-center p-6 overflow-hidden antialiased font-sans selection:bg-[#558dff] selection:text-white">
      {/* Subtle ambient background glow */}
      <div 
        aria-hidden="true" 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#558dff]/5 blur-[120px] pointer-events-none transition-opacity duration-200 ${
          ambientGlowState
        }`} 
      />

      <main
        className={`w-full max-w-[480px] z-10 flex flex-col transition-[opacity,filter,transform] duration-200 ease-out ${
          pageContentState
        }`}
      >
        <Header />

        {/* Main Card Panel */}
        <div className="bg-[#1a1c20]/60 backdrop-blur-xl border border-[#252932] rounded-xl p-3 flex flex-col gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* Workspace List */}

          <WorkspaceList
            workspaces={WORKSPACES}
            selectedId={selectedId}
            onSelectWorkspace={handleSelectWorkspace}
            onCreateWorkspace={handleOpenCreateWorkspaceModal}
          />

          <div className="h-px w-full bg-[#424654] my-1" />

          {/* Create New Workspace */}
          <CreateWorkspaceButton onClick={handleOpenCreateWorkspaceModal} />
        </div>

        {/* Footer Links */}
        <Footer />
      </main>

      <CreateWorkspaceModal
        isOpen={isCreateWorkspaceModalOpen}
        onClose={handleCloseCreateWorkspaceModal}
        onCreateWorkspace={handleCreateWorkspace}
      />
    </div>  
  );
}
