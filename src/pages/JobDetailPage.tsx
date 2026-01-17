import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getJobById } from '../data/jobs';
import type { Job } from '../types';
import { Button, Card, Icon, StaggerContainer, StaggerItem, CategoryIcons, SEO, generateJobSEO } from '../components/common';

// Get icon for job based on category
const getJobIcon = (categoryId: string): string => {
  return CategoryIcons[categoryId as keyof typeof CategoryIcons] || 'briefcase';
};

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [job, setJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'preparation' | 'resources'>('overview');

  useEffect(() => {
    if (id) {
      const foundJob = getJobById(id, i18n.language);
      if (foundJob) {
        setJob(foundJob);
      } else {
        navigate('/jobs');
      }
    }
  }, [id, navigate, i18n.language]);

  if (!job) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-primary-500"
        >
          <Icon name="star" size="3x" spin />
        </motion.div>
      </div>
    );
  }

  const seoProps = generateJobSEO(job, i18n.language);

  const tabs = [
    { id: 'overview', label: t('pages:jobDetail.tabs.intro'), icon: 'clipboard-list' },
    { id: 'preparation', label: t('pages:jobDetail.tabs.preparation'), icon: 'book-open' },
    { id: 'resources', label: t('pages:jobDetail.tabs.resources'), icon: 'link' },
  ] as const;

  return (
    <>
      <SEO {...seoProps} />
      <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary-100 mb-4"
        >
          <Icon name={getJobIcon(job.category)} size="3x" className="text-primary-500" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {job.name}
        </h1>
        <p className="text-gray-500 flex items-center justify-center gap-2">
          <Icon name="briefcase" size="sm" />
          {job.category}
        </p>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-primary-50" padding="lg">
          <p className="text-lg text-gray-700 leading-relaxed">{job.description}</p>
        </Card>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon name={tab.icon} size="sm" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Daily Work */}
            <Card>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="clock" className="text-primary-500" />
                {t('pages:jobDetail.sections.dailyWork')}
              </h3>
              <StaggerContainer className="space-y-3">
                {job.dailyWork.map((work, index) => (
                  <StaggerItem key={index}>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="flex items-center justify-center w-6 h-6 bg-primary-100 text-primary-600 rounded-full text-sm font-bold">
                        {index + 1}
                      </span>
                      <p className="text-gray-700">{work}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </Card>

            {/* Requirements */}
            <Card>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="star" className="text-accent-500" />
                {t('pages:jobDetail.sections.requirements')}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Icon name="graduation-cap" size="sm" className="text-gray-500" />
                    {t('pages:jobDetail.sections.education')}
                  </h4>
                  <p className="text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
                    {job.requirements.education}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Icon name="dumbbell" size="sm" className="text-gray-500" />
                    {t('pages:jobDetail.sections.skills')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Icon name="heart" size="sm" className="text-gray-500" />
                    {t('pages:jobDetail.sections.personality')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.personality.map((trait, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-accent-100 text-accent-700 rounded-full text-sm font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Fun Facts */}
            <Card className="bg-accent-50">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="gem" className="text-accent-600" />
                {t('pages:jobDetail.sections.funFacts')}
              </h3>
              <ul className="space-y-3">
                {job.funFacts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <Icon name="lightbulb" className="text-accent-500 mt-1" />
                    {fact}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {activeTab === 'preparation' && (
          <div className="space-y-8">
            {/* Elementary */}
            <Card className="border-l-4 border-l-green-400">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="seedling" className="text-green-500" />
                {t('pages:jobDetail.preparation.elementary')}
              </h3>
              <ul className="space-y-2">
                {job.preparation.elementary.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <Icon name="circle-check" className="text-green-500 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Middle School */}
            <Card className="border-l-4 border-l-blue-400">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="leaf" className="text-blue-500" />
                {t('pages:jobDetail.preparation.middle')}
              </h3>
              <ul className="space-y-2">
                {job.preparation.middle.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <Icon name="circle-check" className="text-blue-500 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            {/* High School */}
            <Card className="border-l-4 border-l-purple-400">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="tree" className="text-purple-500" />
                {t('pages:jobDetail.preparation.high')}
              </h3>
              <ul className="space-y-2">
                {job.preparation.high.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <Icon name="circle-check" className="text-purple-500 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-8">
            {/* Books */}
            <Card>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="book" className="text-primary-500" />
                {t('common:resources.books.title')}
              </h3>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {t('common:resources.books.description', { jobName: job.name })}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    #{job.name}
                  </span>
                  <span className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {t('pages:jobDetail.hashtags.kidsJob')}
                  </span>
                  <span className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {t('pages:jobDetail.hashtags.careerExplore')}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {i18n.language === 'ko' ? (
                    <>
                      <a
                        href={`https://search.kyobobook.co.kr/search?keyword=${encodeURIComponent(job.name + ' 어린이')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-xl transition-colors font-medium"
                      >
                        <Icon name="search" size="sm" />
                        {t('common:resources.books.kyobo')}
                      </a>
                      <a
                        href={`https://www.nl.go.kr/NL/contents/search.do?srchTarget=total&pageNum=1&pageSize=30&kwd=${encodeURIComponent(job.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium"
                      >
                        <Icon name="book-open" size="sm" />
                        {t('common:resources.books.library')}
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        href={`https://www.amazon.com/s?k=${encodeURIComponent(job.name + ' kids career')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-xl transition-colors font-medium"
                      >
                        <Icon name="search" size="sm" />
                        {t('common:resources.books.amazon')}
                      </a>
                      <a
                        href={`https://www.worldcat.org/search?q=${encodeURIComponent(job.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium"
                      >
                        <Icon name="book-open" size="sm" />
                        {t('common:resources.books.worldcat')}
                      </a>
                    </>
                  )}
                </div>
              </div>
            </Card>

            {/* Videos */}
            <Card>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="video" className="text-red-500" />
                {t('common:resources.videos.title')}
              </h3>
              <StaggerContainer className="space-y-3">
                {job.resources.videos.map((video, index) => {
                  // 직업 이름과 영상 제목을 조합해서 유튜브 검색 URL 생성
                  const searchQuery = encodeURIComponent(`${job.name} ${video.title}`);
                  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

                  return (
                    <StaggerItem key={index}>
                      <a
                        href={youtubeSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors group"
                      >
                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                          <Icon name="play" size="lg" className="text-red-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{video.title}</p>
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <Icon name="search" size="xs" />
                            {t('common:resources.videos.searchOnYoutube')}
                          </p>
                        </div>
                      </a>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </Card>

            {/* Experiences */}
            <Card>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="bullseye" className="text-secondary-500" />
                {t('common:resources.experiences.title')}
              </h3>
              <ul className="space-y-3">
                {job.resources.experiences.map((exp, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <Icon name="hand-point-right" className="text-secondary-500 mt-0.5" />
                    {exp}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link to="/jobs">
          <Button variant="outline">
            <Icon name="arrow-left" size="sm" />
            {t('pages:jobDetail.otherJobs')}
          </Button>
        </Link>
        <Link to="/quiz">
          <Button variant="primary">
            <Icon name="wand-magic-sparkles" size="sm" />
            {t('common:buttons.findMyJob')}
          </Button>
        </Link>
      </motion.div>
    </div>
    </>
  );
}

export default JobDetailPage;
