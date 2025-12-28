import helperJobs from './helper.json';
import builderJobs from './builder.json';
import thinkerJobs from './thinker.json';
import artistJobs from './artist.json';
import moverJobs from './mover.json';
import communicatorJobs from './communicator.json';
import natureJobs from './nature.json';
import techJobs from './tech.json';

import enHelperJobs from './en/helper.json';
import enBuilderJobs from './en/builder.json';
import enThinkerJobs from './en/thinker.json';
import enArtistJobs from './en/artist.json';
import enMoverJobs from './en/mover.json';
import enCommunicatorJobs from './en/communicator.json';
import enNatureJobs from './en/nature.json';
import enTechJobs from './en/tech.json';

import type { Job } from '../../types';

export const jobs: Job[] = [
  ...helperJobs,
  ...builderJobs,
  ...thinkerJobs,
  ...artistJobs,
  ...moverJobs,
  ...communicatorJobs,
  ...natureJobs,
  ...techJobs,
] as Job[];

export const enJobs: Job[] = [
  ...enHelperJobs,
  ...enBuilderJobs,
  ...enThinkerJobs,
  ...enArtistJobs,
  ...enMoverJobs,
  ...enCommunicatorJobs,
  ...enNatureJobs,
  ...enTechJobs,
] as Job[];

export const getTranslatedJobs = (language: string): Job[] => {
  if (language === 'en') {
    return enJobs;
  }
  return jobs;
};

export const getJobById = (id: string, language?: string): Job | undefined => {
  const jobList = getTranslatedJobs(language || 'ko');
  return jobList.find(job => job.id === id);
};

export const getJobsByCategory = (category: string, language?: string): Job[] => {
  const jobList = getTranslatedJobs(language || 'ko');
  return jobList.filter(job => job.category === category);
};

export const searchJobs = (query: string, language?: string): Job[] => {
  const jobList = getTranslatedJobs(language || 'ko');
  const lowerQuery = query.toLowerCase();
  return jobList.filter(job =>
    job.name.toLowerCase().includes(lowerQuery) ||
    job.description.toLowerCase().includes(lowerQuery) ||
    job.tags.interests.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export default jobs;
