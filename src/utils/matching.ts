import type { Job, UserScores, MatchingResult } from '../types';
import { jobs, getTranslatedJobs } from '../data/jobs';
import i18n from '../i18n';

// Tag to category mapping for scoring
const interestTagMapping: Record<string, string[]> = {
  science: ['science', 'research', 'experiment', 'biology', 'chemistry', 'astronomy'],
  art: ['art', 'drawing', 'creative', 'illustration', 'animation'],
  tech: ['tech', 'game', 'webdev', 'gamedev', 'ai', 'robot'],
  nature: ['nature', 'animals', 'marine', 'wildlife', 'insects', 'outdoor'],
  helper: ['helper', 'medical', 'caring', 'children', 'counseling', 'welfare'],
  builder: ['builder', 'engineering', 'architecture', 'construction'],
  communication: ['communication', 'media', 'language', 'teaching'],
  physical: ['physical', 'sports', 'action', 'outdoor'],
};

function calculateTagMatch(userScores: UserScores, jobTags: string[]): number {
  let totalScore = 0;
  let maxPossible = 0;

  jobTags.forEach((tag) => {
    maxPossible += 5;
    if (userScores[tag]) {
      totalScore += Math.min(userScores[tag], 5);
    }
    // Also check related tags
    Object.entries(interestTagMapping).forEach(([key, relatedTags]) => {
      if (relatedTags.includes(tag) && userScores[key]) {
        totalScore += Math.min(userScores[key] * 0.5, 2.5);
      }
    });
  });

  return maxPossible > 0 ? (totalScore / maxPossible) * 100 : 0;
}

function calculateLevelMatch(
  userScores: UserScores,
  level: 'high' | 'medium' | 'low',
  relevantTags: string[]
): number {
  let tagSum = 0;
  relevantTags.forEach((tag) => {
    tagSum += userScores[tag] || 0;
  });

  const avgScore = tagSum / relevantTags.length;

  switch (level) {
    case 'high':
      return avgScore >= 3 ? 100 : avgScore >= 2 ? 70 : 40;
    case 'medium':
      return avgScore >= 2 && avgScore <= 4 ? 100 : 60;
    case 'low':
      return avgScore <= 2 ? 100 : avgScore <= 3 ? 70 : 40;
  }
}

function generateMatchReasons(userScores: UserScores, job: Job): string[] {
  const reasons: string[] = [];
  const t = i18n.t.bind(i18n);

  // Check interest matches
  const interestKeys = ['science', 'art', 'tech', 'nature', 'helper', 'animals', 'creative', 'game'];
  job.tags.interests.forEach((interest) => {
    if (userScores[interest] && userScores[interest] >= 3 && interestKeys.includes(interest)) {
      reasons.push(t(`common:matchReasons.${interest}`));
    }
  });

  // Check work style matches
  if (userScores['social'] >= 3 && job.tags.socialLevel === 'high') {
    reasons.push(t('common:matchReasons.social'));
  }
  if (userScores['solo'] >= 3 && job.tags.socialLevel === 'low') {
    reasons.push(t('common:matchReasons.solo'));
  }
  if (userScores['creative'] >= 3 && job.tags.creativityLevel === 'high') {
    reasons.push(t('common:matchReasons.newThings'));
  }
  if (userScores['physical'] >= 3 && job.tags.physicalLevel === 'high') {
    reasons.push(t('common:matchReasons.physical'));
  }

  // Limit to 3 reasons
  return reasons.slice(0, 3);
}

function identifyStrengths(userScores: UserScores, job: Job): string[] {
  const strengths: string[] = [];
  const t = i18n.t.bind(i18n);

  // Map scores to strengths
  const strengthKeys = ['leadership', 'research', 'creative', 'analytical', 'social', 'physical', 'curious', 'helper', 'systematic'];

  strengthKeys.forEach((tag) => {
    if (userScores[tag] && userScores[tag] >= 3) {
      const strength = t(`common:strengths.${tag}`);
      if (job.requirements.skills.some((skill) =>
        skill.toLowerCase().includes(strength.toLowerCase())
      ) || job.requirements.personality.some((p) =>
        p.toLowerCase().includes(strength.toLowerCase())
      )) {
        strengths.push(strength);
      }
    }
  });

  return strengths.slice(0, 3);
}

export function calculateMatch(userScores: UserScores, job: Job): number {
  // 1. Interest matching (40%)
  const interestScore = calculateTagMatch(userScores, job.tags.interests);

  // 2. Work style matching (30%)
  const socialMatch = calculateLevelMatch(
    userScores,
    job.tags.socialLevel,
    ['social', 'team', 'extrovert']
  );
  const creativityMatch = calculateLevelMatch(
    userScores,
    job.tags.creativityLevel,
    ['creative', 'variety', 'art']
  );
  const workStyleScore = (socialMatch + creativityMatch) / 2;

  // 3. Environment matching (20%)
  const physicalMatch = calculateLevelMatch(
    userScores,
    job.tags.physicalLevel,
    ['physical', 'outdoor', 'action']
  );
  const techMatch = calculateLevelMatch(
    userScores,
    job.tags.techLevel,
    ['tech', 'game', 'analytical']
  );
  const environmentScore = (physicalMatch + techMatch) / 2;

  // 4. Direct tag bonus (10%)
  let directBonus = 0;
  job.tags.interests.forEach((interest) => {
    if (userScores[interest] && userScores[interest] >= 4) {
      directBonus += 10;
    }
  });
  directBonus = Math.min(directBonus, 100);

  // Calculate final score
  const finalScore =
    interestScore * 0.4 +
    workStyleScore * 0.3 +
    environmentScore * 0.2 +
    directBonus * 0.1;

  return Math.round(Math.min(finalScore, 100));
}

export function getMatchingResults(userScores: UserScores, count: number = 5, language?: string): MatchingResult[] {
  // Get translated jobs based on language
  const translatedJobs = language ? getTranslatedJobs(language) : jobs;

  // Calculate scores for all jobs
  const scoredJobs = translatedJobs.map((job) => ({
    job,
    score: calculateMatch(userScores, job),
  }));

  // Sort by score
  scoredJobs.sort((a, b) => b.score - a.score);

  // Ensure diversity - max 2 from same category
  const categoryCount: Record<string, number> = {};
  const diverseResults: { job: Job; score: number }[] = [];

  for (const result of scoredJobs) {
    const category = result.job.category;
    if ((categoryCount[category] || 0) < 2) {
      diverseResults.push(result);
      categoryCount[category] = (categoryCount[category] || 0) + 1;
      if (diverseResults.length >= count) break;
    }
  }

  // Generate full matching results
  return diverseResults.map(({ job, score }) => ({
    job,
    matchScore: score,
    matchReasons: generateMatchReasons(userScores, job),
    strengthAreas: identifyStrengths(userScores, job),
  }));
}

export function getJobRecommendations(userScores: UserScores, language?: string): MatchingResult[] {
  return getMatchingResults(userScores, 5, language);
}
