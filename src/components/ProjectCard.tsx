import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onPreview?: () => void;
}

export function ProjectCard({ project, index, onPreview }: ProjectCardProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const isVideo = project.type === 'video';
  const isShowcase = project.type === 'showcase';

  const title = language === 'en' && project.titleEn ? project.titleEn : project.title;
  const shortDescription = language === 'en' && project.shortDescriptionEn
    ? project.shortDescriptionEn
    : project.shortDescription;
  const categories = language === 'en' && project.categoriesEn
    ? project.categoriesEn
    : project.categories;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.165, 0.84, 0.44, 1],
      }}
      className="group"
    >
      <div
        className={`luminous-border rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${isShowcase ? '' : 'cursor-pointer'}`}
        onClick={isShowcase ? undefined : onPreview}
      >
        <div className="relative bg-surface rounded-xl overflow-hidden">
          <div className="relative aspect-[16/10] overflow-hidden bg-surface-elevated">
            <img
              src={project.thumbnail}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />

            {isVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 group-hover:bg-black/40">
                <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-6 h-6 text-surface-primary ml-1" fill="currentColor" />
                </div>
              </div>
            )}

            {project.status === 'paused' && (
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono font-medium bg-slate-500/15 text-slate-400 border border-slate-500/25 backdrop-blur-sm">
                  <Pause className="w-3 h-3" />
                  {t.projects.paused}
                </span>
              </div>
            )}
          </div>

          <div className="p-5">
            <h3 className="text-lg font-semibold text-txt-primary group-hover:text-gold transition-colors">
              {title}
            </h3>

            <p className="mt-2 text-sm text-txt-secondary leading-relaxed line-clamp-2">
              {shortDescription}
            </p>

            <div className="mt-3">
              <span className="inline-flex items-center text-[11px] font-mono text-txt-muted">
                <span className="w-1 h-1 rounded-full bg-gold/50 mr-2" />
                {project.techStack.join(' · ')}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span key={cat} className="tech-tag">
                  {cat}
                </span>
              ))}
            </div>

            {!isShowcase && (
              <div className="mt-5 flex items-center gap-3">
                <span className="gold-btn text-sm py-2.5 px-5">
                  {isVideo ? t.projects.watchDemo : t.projects.livePreview}
                </span>
                <span className="ghost-btn text-sm py-2.5 px-4">
                  {isVideo ? t.projects.video : t.projects.interactive}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
