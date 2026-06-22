import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

const navItems = [
  { id: 'hero', label: 'home' },
  { id: 'projects', label: 'projects' },
  { id: 'tech-stack', label: 'techStack' },
];

interface NavigationProps {
  onOpenContact?: () => void;
}

export function Navigation({ onOpenContact }: NavigationProps) {
  const { scrollY, activeSection } = useScrollPosition();
  const { language, toggleLanguage } = useLanguage();
  const isScrolled = scrollY > 100;
  const t = translations[language];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/90 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-mono text-sm font-medium text-txt-primary hover:text-gold transition-colors"
          >
            ingozhou
          </button>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-gold'
                    : 'text-txt-secondary hover:text-txt-primary'
                }`}
              >
                {t.nav[item.label as keyof typeof t.nav]}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold rounded-full" />
                )}
              </button>
            ))}

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-1 px-3 py-2 text-sm font-mono font-medium text-txt-secondary hover:text-gold transition-colors"
              title={language === 'zh' ? 'Switch to English' : '切换到中文'}
            >
              {language === 'zh' ? 'EN' : '中'}
            </button>

            {/* Contact button */}
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="ml-2 px-4 py-2 text-sm font-medium text-gold border border-gold/30 rounded-lg hover:bg-gold/10 transition-colors"
              >
                {t.nav.contact}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
