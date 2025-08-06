
export interface Skill {
  tagName: string;
  problemsSolved: number;
}

export interface Badge {
  id: string;
  displayName: string;
  icon: string;
}

export interface ContestBadge {
  id: string;
  displayName: string;
  icon: string;
  name: string;
}

export interface AISummary {
  summary: string;
  weaknesses: string[];
  score: number;
  suggestions: string[];
}

export interface LeetCodeData {
  username: string;
  profile: {
    realName: string;
    avatar: string;
    starRating: number;
    ranking: number;
  };
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissions: number;
  contributionPoints: number;
  submissionCalendar: {
    [timestamp: string]: number;
  };
  badges: Badge[];
  contestStats: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
    badge: ContestBadge;
  };
  skills: {
    advanced: Skill[];
    intermediate: Skill[];
    fundamental: Skill[];
  };
  aiSummary?: AISummary;
}