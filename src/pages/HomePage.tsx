import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button, Icon } from '../components/common';
import { useQuiz } from '../context/QuizContext';

export function HomePage() {
  const navigate = useNavigate();
  const { resetQuiz } = useQuiz();
  const { t } = useTranslation();

  const handleStartQuiz = () => {
    resetQuiz();
    navigate('/quiz');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Animated Logo */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-6 flex justify-center"
        >
          <img
            src={import.meta.env.BASE_URL + 'favicon.svg'}
            alt={t('common:nav.title')}
            className="w-28 h-28 drop-shadow-lg"
          />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          {t('pages:home.title')}
        </h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          {t('pages:home.subtitle')}
          <br />
          <span className="font-semibold text-primary-600">{t('pages:home.highlight')}</span>{t('pages:home.subtitleEnd')}
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button size="lg" className="text-xl px-12 py-5" onClick={handleStartQuiz}>
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Icon name="rocket" />
          </motion.span>
          {t('common:buttons.start')}
        </Button>
        </div>

        {/* Sub Links */}
        <div className="flex justify-center gap-6 mt-8">
          <Link
            to="/jobs"
            className="text-gray-500 hover:text-primary-600 transition-colors flex items-center gap-2"
          >
            <Icon name="book-open" size="sm" />
            {t('common:nav.jobs')}
          </Link>
          <Link
            to="/history"
            className="text-gray-500 hover:text-primary-600 transition-colors flex items-center gap-2"
          >
            <Icon name="clipboard-list" size="sm" />
            {t('common:nav.history')}
          </Link>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid md:grid-cols-3 gap-8 mt-20 w-full"
      >
        <FeatureCard
          icon="bullseye"
          iconColor="text-red-500"
          bgColor="bg-red-50"
          title={t('pages:home.features.easyQuestions.title')}
          description={t('pages:home.features.easyQuestions.description')}
        />
        <FeatureCard
          icon="briefcase"
          iconColor="text-amber-500"
          bgColor="bg-amber-50"
          title={t('pages:home.features.manyJobs.title')}
          description={t('pages:home.features.manyJobs.description')}
        />
        <FeatureCard
          icon="book-open"
          iconColor="text-blue-500"
          bgColor="bg-blue-50"
          title={t('pages:home.features.preparation.title')}
          description={t('pages:home.features.preparation.description')}
        />
      </motion.div>
    </div>
  );
}

function FeatureCard({
  icon,
  iconColor,
  bgColor,
  title,
  description,
}: {
  icon: string;
  iconColor: string;
  bgColor: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg text-center border border-gray-100"
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${bgColor} mb-5`}>
        <Icon name={icon} size="xl" className={iconColor} />
      </div>
      <h3 className="font-bold text-lg text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default HomePage;
