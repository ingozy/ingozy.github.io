import { useState, useCallback } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { ProjectsGrid } from '@/sections/ProjectsGrid';
import { TechStackSection } from '@/sections/TechStackSection';
import { FooterSection } from '@/sections/FooterSection';
import { IframePreviewModal } from '@/components/IframePreviewModal';
import { VideoGalleryModal } from '@/components/VideoGalleryModal';
import { ContactModal } from '@/components/ContactModal';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

function AppContent() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'iframe' | 'video' | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  const handleSelectProject = useCallback((projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;
    if (project.type === 'showcase') return;

    setActiveProject(project);
    setModalType(project.type);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => {
      setActiveProject(null);
      setModalType(null);
    }, 400);
  }, []);

  const handleOpenContact = useCallback(() => {
    setContactOpen(true);
  }, []);

  const handleCloseContact = useCallback(() => {
    setContactOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-surface-primary">
      <Navigation onOpenContact={handleOpenContact} />

      <main>
        <HeroSection onOpenContact={handleOpenContact} />
        <ProjectsGrid onSelectProject={handleSelectProject} />
        <TechStackSection />
        <FooterSection />
      </main>

      <IframePreviewModal
        project={modalType === 'iframe' ? activeProject : null}
        open={modalOpen && modalType === 'iframe'}
        onClose={handleCloseModal}
      />

      <VideoGalleryModal
        project={modalType === 'video' ? activeProject : null}
        open={modalOpen && modalType === 'video'}
        onClose={handleCloseModal}
      />

      <ContactModal
        open={contactOpen}
        onClose={handleCloseContact}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
