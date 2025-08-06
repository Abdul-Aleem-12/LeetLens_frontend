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
      name: string;
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




// {
//   "name": "leetlens",
//   "private": true,
//   "version": "0.0.0",
//   "type": "module",
//   "scripts": {
//     "dev": "vite",
//     "build": "tsc -b && vite build",
//     "lint": "eslint .",
//     "preview": "vite preview",
//     "deploy": "gh-pages -d dist"
//   },
//   "dependencies": {
//     "antd": "^5.16.0",
//     "@ant-design/icons": "^5.3.0",
//     "@tailwindcss/vite": "^4.1.6",
//     "axios": "^1.9.0",
//     "lucide-react": "^0.510.0",
//     "plotly.js": "^3.0.1",
//     "plotly.js-dist": "^3.0.1",
//     "react": "^19.1.0",
//     "react-dom": "^19.1.0",
//     "react-plotly.js": "^2.6.0",
//     "react-router-dom": "^7.6.0"
//   },
//   "devDependencies": {
//     "@eslint/js": "^9.25.0",
//     "@types/antd": "^0.12.32",
//     "@types/react": "^18.2.0",
//     "@types/react-dom": "^18.2.0",
//     "@types/react-plotly.js": "^2.6.3",
//     "@types/react-router-dom": "^5.3.3",
//     "@vitejs/plugin-react": "^4.4.1",
//     "autoprefixer": "^10.4.21",
//     "eslint": "^9.25.0",
//     "eslint-plugin-react-hooks": "^5.2.0",
//     "eslint-plugin-react-refresh": "^0.4.19",
//     "gh-pages": "^6.3.0",
//     "globals": "^16.0.0",
//     "postcss": "^8.5.3",
//     "tailwindcss": "^4.1.6",
//     "typescript": "~5.8.3",
//     "typescript-eslint": "^8.30.1",
//     "vite": "^6.3.5"
//   },
//   "description": "This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.",
//   "main": "eslint.config.js",
//   "keywords": [],
//   "author": "",
//   "license": "ISC"
// }