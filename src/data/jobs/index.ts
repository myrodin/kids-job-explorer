import helperJobs from './helper.json';
import builderJobs from './builder.json';
import thinkerJobs from './thinker.json';
import artistJobs from './artist.json';
import moverJobs from './mover.json';
import communicatorJobs from './communicator.json';
import natureJobs from './nature.json';
import techJobs from './tech.json';

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

export const getJobById = (id: string): Job | undefined => {
  return jobs.find(job => job.id === id);
};

export const getJobsByCategory = (category: string): Job[] => {
  return jobs.filter(job => job.category === category);
};

export const searchJobs = (query: string): Job[] => {
  const lowerQuery = query.toLowerCase();
  return jobs.filter(job =>
    job.name.toLowerCase().includes(lowerQuery) ||
    job.description.toLowerCase().includes(lowerQuery) ||
    job.tags.interests.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export default jobs;
