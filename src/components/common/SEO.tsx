import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  structuredData?: object;
}

const BASE_URL = 'https://myrodin.github.io/kids-job-explorer';

export function SEO({
  title,
  description,
  keywords,
  image = `${BASE_URL}/og-image.svg`,
  url,
  type = 'website',
  noindex = false,
  structuredData,
}: SEOProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const defaultTitle = lang === 'ko'
    ? '내 꿈 찾기 - 어린이 직업 탐색'
    : 'Find My Dream - Kids Job Explorer';

  const defaultDescription = lang === 'ko'
    ? '어린이를 위한 직업 탐색 서비스. 18개의 재미있는 질문에 답하고 100가지 직업 중 나에게 맞는 꿈을 찾아보세요!'
    : 'Career exploration service for kids. Answer 18 fun questions and find your dream job from 100 different careers!';

  const defaultKeywords = lang === 'ko'
    ? '어린이 직업, 직업 탐색, 진로 탐색, 초등학생 직업, 꿈 찾기, 직업 테스트'
    : 'kids careers, job exploration, career test, children jobs, find your dream';

  const fullTitle = title
    ? `${title} | ${lang === 'ko' ? '내 꿈 찾기' : 'Find My Dream'}`
    : defaultTitle;

  const fullDescription = description || defaultDescription;
  const fullKeywords = keywords || defaultKeywords;
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={lang === 'ko' ? 'ko_KR' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// Job Detail Page SEO Props Generator (GEO optimized)
export function generateJobSEO(job: {
  id: string;
  name: string;
  description: string;
  category: string;
  dailyWork?: string[];
  requirements?: {
    education: string;
    skills: string[];
    personality: string[];
  };
  preparation?: {
    elementary: string[];
    middle: string[];
    high: string[];
  };
}, lang: string) {
  const title = lang === 'ko'
    ? `${job.name} - 하는 일, 준비 방법, 필요한 능력 | 어린이 직업 정보`
    : `${job.name} - Daily Tasks, Preparation, Required Skills | Kids Career Info`;

  // GEO: 더 상세하고 AI 친화적인 설명
  const description = lang === 'ko'
    ? `${job.name}은(는) ${job.description} ${job.name}이(가) 되려면 어떤 준비가 필요한지, 어떤 능력이 필요한지 알아보세요. 초등학생부터 고등학생까지 단계별 진로 준비 가이드를 제공합니다.`
    : `${job.name}: ${job.description} Learn what skills you need and how to prepare from elementary to high school.`;

  const keywords = lang === 'ko'
    ? `${job.name}, ${job.name} 되는 법, ${job.name} 하는 일, ${job.name} 연봉, ${job.category}, 직업 정보, 어린이 직업, 진로 탐색, 진로 준비`
    : `${job.name}, how to become ${job.name}, ${job.name} career, ${job.category}, career info, kids jobs, career exploration`;

  // GEO: 더 풍부한 구조화된 데이터
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Occupation',
    'name': job.name,
    'description': job.description,
    'occupationalCategory': job.category,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/jobs/${job.id}`,
    },
    // GEO: 교육 요구사항
    ...(job.requirements && {
      'educationRequirements': {
        '@type': 'EducationalOccupationalCredential',
        'credentialCategory': job.requirements.education,
      },
      'skills': job.requirements.skills.join(', '),
      'qualifications': job.requirements.personality.join(', '),
    }),
    // GEO: 작업 설명
    ...(job.dailyWork && {
      'responsibilities': job.dailyWork.join('. '),
    }),
    // GEO: 대상 청중
    'audience': {
      '@type': 'EducationalAudience',
      'educationalRole': 'student',
      'audienceType': lang === 'ko' ? '초등학생, 중학생, 고등학생' : 'Elementary, Middle, High school students',
    },
  };

  return { title, description, keywords, url: `/jobs/${job.id}`, structuredData };
}

export default SEO;
