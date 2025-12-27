import type { Job } from './job';
import type { Answer, UserScores } from './question';

export interface MatchingResult {
  job: Job;
  matchScore: number;
  matchReasons: string[];
  strengthAreas: string[];
}

export interface SavedResult {
  id: string;
  timestamp: string;
  userName?: string;
  answers: Answer[];
  scores: UserScores;
  topJobs: {
    jobId: string;
    jobName: string;
    matchScore: number;
  }[];
}

export interface StoredData {
  version: string;
  results: SavedResult[];
  lastUpdated: string;
}
