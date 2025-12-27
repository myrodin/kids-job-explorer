import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Icon } from '../components/common';
import { useQuiz } from '../context/QuizContext';

export function HomePage() {
  const navigate = useNavigate();
  const { resetQuiz } = useQuiz();

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
            src="/favicon.svg"
            alt="내 꿈 찾기"
            className="w-28 h-28 drop-shadow-lg"
          />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          나의 꿈을 찾아보자!
        </h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          재미있는 질문에 답하면
          <br />
          <span className="font-semibold text-primary-600">나에게 딱 맞는 직업</span>을 알려줄게!
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
          시작하기
        </Button>
        </div>

        {/* Sub Links */}
        <div className="flex justify-center gap-6 mt-8">
          <Link
            to="/jobs"
            className="text-gray-500 hover:text-primary-600 transition-colors flex items-center gap-2"
          >
            <Icon name="book-open" size="sm" />
            직업 둘러보기
          </Link>
          <Link
            to="/history"
            className="text-gray-500 hover:text-primary-600 transition-colors flex items-center gap-2"
          >
            <Icon name="clipboard-list" size="sm" />
            이전 결과 보기
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
          title="쉬운 질문"
          description="어렵지 않은 재미있는 질문들로 나를 알아가요"
        />
        <FeatureCard
          icon="briefcase"
          iconColor="text-amber-500"
          bgColor="bg-amber-50"
          title="100가지 직업"
          description="다양하고 구체적인 직업들을 추천받아요"
        />
        <FeatureCard
          icon="book-open"
          iconColor="text-blue-500"
          bgColor="bg-blue-50"
          title="준비 방법"
          description="꿈을 이루기 위해 뭘 해야 하는지 알려줘요"
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
