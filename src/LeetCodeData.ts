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
  badges: {
    id: string;
    displayName: string;
    icon: string;
  }[];
  contestStats: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
    badge: {
      id: string;
      displayName: string;
      icon: string;
      };
  };
  skills: {
    advanced: Skill[];
    intermediate: Skill[];
    fundamental: Skill[];
  };
}

export interface Skill {
  tagName: string;
  problemsSolved: number;
}
export interface Badge {
  id: string;
  displayName: string;
  icon: string;
}
