import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getResults, deleteResult, clearAllResults } from '../utils/storage';
import { getJobById } from '../data/jobs';
import { useQuiz } from '../context/QuizContext';
import type { SavedResult } from '../types';
import { Button, Card, Icon, StaggerContainer, StaggerItem, CategoryIcons, SEO } from '../components/common';

// Get icon for job based on category
const getJobIcon = (categoryId: string): string => {
  return CategoryIcons[categoryId as keyof typeof CategoryIcons] || 'briefcase';
};

export function HistoryPage() {
  const navigate = useNavigate();
  const { resetQuiz } = useQuiz();
  const { t, i18n } = useTranslation();
  const isKorean = i18n.language === 'ko';
  const [results, setResults] = useState<SavedResult[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setResults(getResults());
  }, []);

  const handleStartNewQuiz = () => {
    resetQuiz();
    navigate('/quiz');
  };

  const handleDelete = (id: string) => {
    deleteResult(id);
    setResults(getResults());
  };

  const handleClearAll = () => {
    clearAllResults();
    setResults([]);
    setShowConfirm(false);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const locale = i18n.language === 'ko' ? 'ko-KR' : 'en-US';
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <SEO
        title={isKorean ? '탐색 기록' : 'Exploration History'}
        description={isKorean
          ? '내가 탐색한 직업 결과를 확인해보세요. 지금까지 받은 모든 직업 추천 기록을 한눈에 볼 수 있습니다.'
          : 'Check your career exploration results. View all your job recommendations at a glance.'}
        keywords={isKorean
          ? '탐색 기록, 직업 추천 기록, 테스트 결과, 진로 기록'
          : 'exploration history, job recommendation history, test results, career history'}
        url="/history"
        noindex={true}
      />
      <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-100 mb-6 shadow-md">
          <Icon name="history" size="2x" className="text-primary-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          {t('pages:history.title')}
        </h1>
        <p className="text-gray-500 text-lg">{t('pages:history.subtitle')}</p>
      </motion.div>

      {results.length > 0 ? (
        <>
          {/* Clear All Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-end"
          >
            {showConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{t('common:messages.confirmDelete')}</span>
                <Button variant="outline" onClick={() => setShowConfirm(false)}>
                  {t('common:buttons.cancel')}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleClearAll}
                  className="bg-red-500 hover:bg-red-600"
                >
                  {t('common:buttons.deleteAll')}
                </Button>
              </div>
            ) : (
              <Button variant="ghost" onClick={() => setShowConfirm(true)}>
                <Icon name="trash" size="sm" />
                {t('common:buttons.deleteAll')}
              </Button>
            )}
          </motion.div>

          {/* Results List */}
          <StaggerContainer className="space-y-6">
            {results.map((result) => {
              const topJob = result.topJobs[0];
              const job = topJob ? getJobById(topJob.jobId, i18n.language) : null;

              return (
                <StaggerItem key={result.id}>
                  <Card padding="md">
                    <div className="space-y-3">
                      {/* Top Row: Job Info + Actions */}
                      <div className="flex items-center gap-4">
                        {/* Top Job */}
                        <div className="flex items-center gap-3 min-w-0">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 flex-shrink-0"
                          >
                            <Icon name={job ? getJobIcon(job.category) : 'bullseye'} size="lg" className="text-primary-500" />
                          </motion.div>
                          <div className="min-w-0">
                            <p className="text-xs text-gray-400 mb-0.5 flex items-center gap-1">
                              <Icon name="calendar-alt" size="xs" />
                              {formatDate(result.timestamp)}
                            </p>
                            <h3 className="font-bold text-gray-800">
                              {topJob?.jobName || t('common:messages.noResults')}
                            </h3>
                            <p className="text-primary-500 font-medium text-sm flex items-center gap-1">
                              <Icon name="star" size="xs" />
                              {topJob?.matchScore}% {t('common:units.match')}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 ml-auto flex-shrink-0">
                          {job && (
                            <Link to={`/jobs/${topJob.jobId}`}>
                              <Button variant="outline" className="whitespace-nowrap">
                                <Icon name="angle-right" size="sm" />
                                {t('common:buttons.viewDetail')}
                              </Button>
                            </Link>
                          )}
                          <button
                            onClick={() => handleDelete(result.id)}
                            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center flex-shrink-0"
                            aria-label={t('common:buttons.delete')}
                          >
                            <Icon name="times" size="sm" />
                          </button>
                        </div>
                      </div>

                      {/* Bottom Row: Other Top Jobs */}
                      {result.topJobs.length > 1 && (
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-400 flex items-center gap-1 mr-1">
                            <Icon name="thumbs-up" size="xs" />
                            {t('pages:history.otherRecommend')}
                          </span>
                          {result.topJobs.slice(1, 4).map((jobResult, index) => {
                            const otherJob = getJobById(jobResult.jobId, i18n.language);
                            return (
                              <Link
                                key={index}
                                to={`/jobs/${jobResult.jobId}`}
                                className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                              >
                                <Icon name={otherJob ? getJobIcon(otherJob.category) : 'briefcase'} size="sm" className="text-gray-500" />
                                <span className="text-sm text-gray-600 font-medium">
                                  {jobResult.jobName}
                                </span>
                                <span className="text-xs text-primary-500 font-medium">
                                  {jobResult.matchScore}%
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Card className="inline-block">
              <p className="text-gray-500 flex items-center gap-2">
                <Icon name="fire" className="text-accent-500" />
                {t('pages:history.totalExplorations', { count: results.length })}
              </p>
            </Card>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gray-100 mb-8"
          >
            <Icon name="inbox" size="3x" className="text-gray-400" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-700 mb-3">
            {t('pages:history.empty.title')}
          </h2>
          <p className="text-gray-500 mb-8 text-lg">
            {t('pages:history.empty.subtitle')}
          </p>
          <Button variant="primary" size="lg" className="text-lg px-8" onClick={handleStartNewQuiz}>
            <Icon name="wand-magic-sparkles" />
            {t('common:buttons.startExploring')}
          </Button>
        </motion.div>
      )}

      {/* Bottom CTA */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-8"
        >
          <Button variant="primary" className="text-lg" onClick={handleStartNewQuiz}>
            <Icon name="sync" />
            {t('common:buttons.exploreAgain')}
          </Button>
        </motion.div>
      )}
    </div>
    </>
  );
}

export default HistoryPage;
