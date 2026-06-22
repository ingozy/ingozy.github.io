import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Github, Mail, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

function CopyButton({ text }: { text: string }) {
  const { language } = useLanguage();
  const t = translations[language];
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold/80 transition-colors ml-2"
      title={t.modal.copy}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span>{t.modal.copied}</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>{t.modal.copy}</span>
        </>
      )}
    </button>
  );
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-md bg-surface rounded-xl border border-border overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-5 h-14 border-b border-border">
              <h3 className="text-sm font-semibold text-txt-primary">
                {t.modal.contactTitle}
              </h3>
              <button
                onClick={onClose}
                className="ghost-btn p-2"
                title={t.modal.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-txt-muted mb-0.5">{t.footer.weChat}</p>
                  <div className="flex items-center">
                    <p className="text-sm font-mono text-txt-primary truncate">
                      inherentid
                    </p>
                    <CopyButton text="inherentid" />
                  </div>
                  <p className="text-xs text-txt-muted mt-0.5">
                    {t.footer.copyNote}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-txt-muted mb-0.5">{t.footer.email}</p>
                  <div className="flex items-center">
                    <p className="text-sm font-mono text-txt-primary truncate">
                      ingozhou@gmail.com
                    </p>
                    <CopyButton text="ingozhou@gmail.com" />
                  </div>
                </div>
              </div>

              <a
                href="https://github.com/ingozy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-elevated flex items-center justify-center shrink-0">
                  <Github className="w-5 h-5 text-txt-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-txt-muted mb-0.5">GitHub</p>
                  <p className="text-sm font-mono text-txt-primary group-hover:text-gold transition-colors truncate">
                    github.com/ingozy
                  </p>
                </div>
              </a>
            </div>

            <div className="px-6 pb-5">
              <p className="text-xs text-txt-muted text-center">
                {t.footer.hint}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
