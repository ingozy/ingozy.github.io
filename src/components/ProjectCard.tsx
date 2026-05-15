import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onPreview: () => void;
}

export function ProjectCard({ project, index, onPreview }: ProjectCardProps) {
  const isVideo = project.type === 'video';
  const isMCN = project.id === 'mcn-hub';

  // Card border: MCN Hub gets luminous border, others get standard
  const cardBorderClass = isMCN
    ? 'luminous-border border-0'
    : 'border border-border hover:border-gold-border';

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
        className={`relative bg-surface rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover cursor-pointer ${cardBorderClass}`}
        onClick={onPreview}
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-elevated">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Video play overlay */}
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 group-hover:bg-black/40">
              <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Play className="w-6 h-6 text-surface-primary ml-1" fill="currentColor" />
              </div>
            </div>
          )}

          {/* MCN Hub complexity badge */}
          {isMCN && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono font-medium bg-purple-500/15 text-purple-400 border border-purple-500/25 backdrop-blur-sm">
                <Sparkles className="w-3 h-3" />
                Full Stack
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-semibold text-txt-primary group-hover:text-gold transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm text-txt-secondary leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Tech stack line */}
          <div className="mt-3">
            <span className="inline-flex items-center text-[11px] font-mono text-txt-muted">
              <span className="w-1 h-1 rounded-full bg-gold/50 mr-2" />
              {project.techStack.join(' · ')}
            </span>
          </div>

          {/* Category tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {project.categories.map((cat) => (
              <span key={cat} className="tech-tag">
                {cat}
              </span>
            ))}
          </div>

          {/* Action */}
          <div className="mt-5 flex items-center gap-3">
            <span className="gold-btn text-sm py-2.5 px-5">
              {isVideo ? '观看演示' : '实时预览'}
            </span>
            <span className="ghost-btn text-sm py-2.5 px-4">
              {isVideo ? '视频' : '可交互'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
