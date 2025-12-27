export type SocialLevel = 'high' | 'medium' | 'low';
export type CreativityLevel = 'high' | 'medium' | 'low';
export type PhysicalLevel = 'high' | 'medium' | 'low';
export type TechLevel = 'high' | 'medium' | 'low';

export interface JobTags {
  interests: string[];
  workStyle: string[];
  environment: string[];
  socialLevel: SocialLevel;
  creativityLevel: CreativityLevel;
  physicalLevel: PhysicalLevel;
  techLevel: TechLevel;
}

export interface BookResource {
  title: string;
  author: string;
}

export interface VideoResource {
  title: string;
  url: string;
}

export interface JobResources {
  books: BookResource[];
  videos: VideoResource[];
  experiences: string[];
}

export interface JobRequirements {
  education: string;
  skills: string[];
  personality: string[];
}

export interface JobPreparation {
  elementary: string[];
  middle: string[];
  high: string[];
}

export interface Job {
  id: string;
  name: string;
  emoji: string;
  category: string;
  description: string;
  dailyWork: string[];
  requirements: JobRequirements;
  preparation: JobPreparation;
  resources: JobResources;
  funFacts: string[];
  tags: JobTags;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}
