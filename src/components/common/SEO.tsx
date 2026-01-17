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

// Job Detail Page SEO Props Generator
export function generateJobSEO(job: {
  id: string;
  name: string;
  description: string;
  category: string;
}, lang: string) {
  const title = lang === 'ko'
    ? `${job.name} - 직업 정보`
    : `${job.name} - Career Information`;

  const description = job.description;

  const keywords = lang === 'ko'
    ? `${job.name}, ${job.category}, 직업 정보, 어린이 직업, 진로 탐색`
    : `${job.name}, ${job.category}, career info, kids jobs, career exploration`;

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
  };

  return { title, description, keywords, url: `/jobs/${job.id}`, structuredData };
}

export default SEO;
