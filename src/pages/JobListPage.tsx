import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getTranslatedJobs, getJobsByCategory } from '../data/jobs';
import type { Job } from '../types';
import { Card, Icon, StaggerContainer, StaggerItem, CategoryIcons, SEO } from '../components/common';

// Get icon for job based on category
const getJobIcon = (categoryId: string): string => {
  return CategoryIcons[categoryId as keyof typeof CategoryIcons] || 'briefcase';
};

// Category data with i18n keys
const categoryData = [
  { id: 'helper', icon: 'heart-pulse' },
  { id: 'builder', icon: 'tools' },
  { id: 'thinker', icon: 'flask' },
  { id: 'artist', icon: 'paint-brush' },
  { id: 'mover', icon: 'running' },
  { id: 'communicator', icon: 'microphone' },
  { id: 'nature', icon: 'paw' },
  { id: 'tech', icon: 'laptop-code' },
];

export function JobListPage() {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const isKorean = i18n.language === 'ko';

  const jobs = getTranslatedJobs(i18n.language);

  const filteredJobs = useMemo(() => {
    let result: Job[] = selectedCategory ? getJobsByCategory(selectedCategory, i18n.language) : jobs;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.name.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.tags.interests.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [selectedCategory, searchQuery, jobs, i18n.language]);

  return (
    <>
      <SEO
        title={isKorean ? '100가지 직업 탐색' : 'Explore 100 Careers'}
        description={isKorean
          ? '의사, 프로그래머, 아티스트 등 100가지 직업을 탐색해보세요. 각 직업별 하는 일, 필요한 능력, 준비 방법을 자세히 알아볼 수 있습니다.'
          : 'Explore 100 different careers including doctors, programmers, artists and more. Learn about daily tasks, required skills, and preparation methods.'}
        keywords={isKorean
          ? '직업 목록, 직업 탐색, 직업 정보, 어린이 직업, 진로 정보, 100가지 직업'
          : 'job list, career exploration, career information, kids careers, 100 jobs'}
        url="/jobs"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          'name': isKorean ? '100가지 직업 목록' : '100 Career List',
          'description': isKorean
            ? '어린이를 위한 100가지 직업 탐색 목록'
            : '100 career exploration list for kids',
          'numberOfItems': jobs.length,
          'itemListElement': jobs.slice(0, 10).map((job, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': job.name,
            'url': `https://myrodin.github.io/kids-job-explorer/jobs/${job.id}`,
          })),
        }}
      />
      <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-100 mb-6 shadow-md">
          <Icon name="compass" size="2x" className="text-primary-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          {t('pages:jobList.title')}
        </h1>
        <p className="text-gray-500 text-lg">{t('pages:jobList.subtitle')}</p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative max-w-xl mx-auto">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon name="search" />
          </span>
          <input
            type="text"
            placeholder={t('pages:jobList.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-gray-700 text-lg bg-white shadow-sm"
          />
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
              selectedCategory === null
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Icon name="list" size="sm" />
            <span>{t('common:filters.all')}</span>
            <span className="text-xs opacity-70">({jobs.length})</span>
          </button>
          {categoryData.map((category) => {
            const count = getJobsByCategory(category.id, i18n.language).length;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon name={category.icon} size="sm" />
                <span>{t(`categories:${category.id}.name`)}</span>
                <span className="text-xs opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Results count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-500 text-center flex items-center justify-center gap-2"
      >
        <Icon name="briefcase" size="sm" />
        <span>{t('pages:jobList.foundJobs', { count: filteredJobs.length })}</span>
      </motion.p>

      {/* Job Grid */}
      {filteredJobs.length > 0 ? (
        <StaggerContainer key={selectedCategory || 'all'} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <StaggerItem key={job.id}>
              <Link to={`/jobs/${job.id}`}>
                <Card hover className="h-full" padding="md">
                  <div className="space-y-2">
                    {/* 아이콘 + 이름 */}
                    <div className="flex items-center gap-2">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 flex-shrink-0"
                      >
                        <Icon name={getJobIcon(job.category)} className="text-primary-500" />
                      </motion.div>
                      <h3 className="font-bold text-gray-800 text-lg">{job.name}</h3>
                    </div>
                    {/* 설명 */}
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                    {/* 태그 */}
                    <div className="flex flex-wrap gap-1.5">
                      {job.tags.interests.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
            <Icon name="search" size="2x" className="text-gray-400" />
          </div>
          <p className="text-gray-500">{t('pages:jobList.noResults')}</p>
        </motion.div>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center pt-8"
      >
        <Link to="/quiz">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-2xl shadow-lg inline-flex items-center gap-3 text-lg transition-colors"
          >
            <Icon name="wand-magic-sparkles" />
            {t('pages:jobList.findMyJob')}
          </motion.button>
        </Link>
      </motion.div>
    </div>
    </>
  );
}

export default JobListPage;
