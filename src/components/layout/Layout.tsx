import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Icon, LanguageSwitch } from '../common';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { t } = useTranslation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-primary-500"
            >
              <Icon name="wand-magic-sparkles" size="xl" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent group-hover:from-primary-700 group-hover:to-secondary-600 transition-all">
              {t('common:nav.title')}
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/jobs"
              className={`flex items-center gap-2 font-medium transition-colors ${
                location.pathname.startsWith('/jobs')
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <Icon name="briefcase" size="sm" />
              <span className="hidden sm:inline">{t('common:nav.jobs')}</span>
            </Link>
            <Link
              to="/history"
              className={`flex items-center gap-2 font-medium transition-colors ${
                location.pathname === '/history'
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <Icon name="history" size="sm" />
              <span className="hidden sm:inline">{t('common:nav.history')}</span>
            </Link>
            <LanguageSwitch />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className={`max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 ${isHome ? 'py-8' : 'py-12'}`}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-gray-100 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-gray-500 text-sm">
          <p className="flex items-center justify-center gap-2">
            <Icon name="graduation-cap" className="text-primary-400" />
            {t('common:footer.tagline')}
          </p>
          <p className="mt-1 flex items-center justify-center gap-2">
            <Icon name="lightbulb" className="text-accent-500" />
            {t('common:footer.description')}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
