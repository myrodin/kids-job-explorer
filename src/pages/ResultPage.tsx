import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import { getJobRecommendations } from '../utils/matching';
import { saveResult } from '../utils/storage';
import type { MatchingResult } from '../types';
import { Button, Card, Icon, StaggerContainer, StaggerItem, CategoryIcons } from '../components/common';

// Get icon for job based on category
const getJobIcon = (categoryId: string): string => {
  return CategoryIcons[categoryId as keyof typeof CategoryIcons] || 'briefcase';
};

export function ResultPage() {
  const navigate = useNavigate();
  const { state, resetQuiz, markResultSaved } = useQuiz();
  const [results, setResults] = useState<MatchingResult[]>([]);
  const saveAttempted = useRef(false);

  useEffect(() => {
    if (Object.keys(state.scores).length === 0) {
      navigate('/');
      return;
    }

    const recommendations = getJobRecommendations(state.scores);
    setResults(recommendations);

    // Auto-save result only once per quiz completion
    // Use ref to prevent double-save in StrictMode
    if (!state.resultSaved && !saveAttempted.current && recommendations.length > 0) {
      saveAttempted.current = true;
      saveResult({
        answers: state.answers,
        scores: state.scores,
        topJobs: recommendations.slice(0, 5).map((r) => ({
          jobId: r.job.id,
          jobName: r.job.name,
          matchScore: r.matchScore,
        })),
      });
      markResultSaved();
    }
  }, [state.scores, state.answers, state.resultSaved, navigate, markResultSaved]);

  const [shareMessage, setShareMessage] = useState('');

  const handleRetry = () => {
    resetQuiz();
    navigate('/quiz');
  };

  const handleShare = async () => {
    if (results.length === 0) return;

    const topJob = results[0];
    const shareText = `나에게 어울리는 직업은 "${topJob.job.name}"이래요! (${topJob.matchScore}% 매칭)\n\n내 꿈 찾기에서 나만의 직업을 찾아보세요!`;
    const shareUrl = window.location.origin + import.meta.env.BASE_URL;

    // Web Share API 지원 확인
    if (navigator.share) {
      try {
        await navigator.share({
          title: '내 꿈 찾기 - 결과',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // 사용자가 취소한 경우 무시
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard(shareText + '\n' + shareUrl);
        }
      }
    } else {
      copyToClipboard(shareText + '\n' + shareUrl);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShareMessage('복사되었어요!');
      setTimeout(() => setShareMessage(''), 2000);
    } catch {
      setShareMessage('복사에 실패했어요');
      setTimeout(() => setShareMessage(''), 2000);
    }
  };

  if (results.length === 0) {
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

  const topResult = results[0];

  return (
    <div className="space-y-12">
      {/* Celebration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 1, repeat: 3 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-100 mb-4"
        >
          <Icon name="trophy" size="3x" className="text-accent-600" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          짠! 너에게 어울리는 직업은?
        </h1>
      </motion.div>

      {/* Top Result */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-primary-50 border-2 border-primary-200" padding="lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <Icon name="medal" size="sm" />
              1등 추천
            </span>
            <span className="text-primary-600 font-bold text-lg flex items-center gap-1">
              <Icon name="star" size="sm" />
              {topResult.matchScore}% 매칭!
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-sm flex-shrink-0">
              <Icon name={getJobIcon(topResult.job.category)} size="3x" className="text-primary-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {topResult.job.name}
              </h2>
              <p className="text-gray-600 mb-4">{topResult.job.description}</p>

              {/* Match Reasons */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Icon name="lightbulb" className="text-accent-500" />
                  너랑 잘 맞는 이유:
                </h3>
                <ul className="space-y-1">
                  {topResult.matchReasons.map((reason, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <Icon name="check" size="sm" className="text-primary-500" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <Link to={`/jobs/${topResult.job.id}`}>
                <Button variant="primary">
                  자세히 보기
                  <Icon name="arrow-right" size="sm" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Other Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Icon name="thumbs-up" className="text-secondary-500" />
          다른 추천 직업들
        </h3>

        <StaggerContainer className="grid md:grid-cols-2 gap-8">
          {results.slice(1).map((result) => (
            <StaggerItem key={result.job.id}>
              <Link to={`/jobs/${result.job.id}`}>
                <Card hover className="h-full">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100">
                      <Icon name={getJobIcon(result.job.category)} size="lg" className="text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-800 truncate">
                          {result.job.name}
                        </h4>
                        <span className="text-primary-500 font-medium text-sm flex items-center gap-1 flex-shrink-0">
                          <Icon name="star" size="xs" />
                          {result.matchScore}%
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {result.job.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Primary Action */}
        <div className="relative">
          <Button variant="primary" onClick={handleShare} className="px-10 py-3">
            <Icon name="share" size="sm" />
            결과 공유하기
          </Button>
          {shareMessage && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-green-600 flex items-center gap-1 whitespace-nowrap"
            >
              <Icon name="circle-check" size="sm" />
              {shareMessage}
            </motion.p>
          )}
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <Button variant="outline" onClick={handleRetry}>
            <Icon name="sync" size="sm" />
            다시 해보기
          </Button>
          <Link to="/jobs">
            <Button variant="outline">
              <Icon name="book-open" size="sm" />
              직업 둘러보기
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline">
              <Icon name="home" size="sm" />
              홈으로
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Save Notice */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-gray-400 text-sm mt-8 flex items-center justify-center gap-2"
      >
        <Icon name="circle-check" className="text-green-500" />
        결과가 자동으로 저장되었어요!
      </motion.p>
    </div>
  );
}

export default ResultPage;
