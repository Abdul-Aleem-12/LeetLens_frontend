import React, { useEffect, useState } from 'react';
import type { Badge } from '../../LeetCodeData';
import BadgeCard from './badgeCard';

interface daysSub {
  [key: string]: number;
}
interface Props {
  badges: Badge[];
  submissionCalendar: daysSub;
}

const RotatingBadge: React.FC<Props> = ({ badges, submissionCalendar }) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentYear = new Date().getFullYear();
  const activeDaysInYear = Object.keys(submissionCalendar).reduce((count, timestampStr) => {
    const timestamp = Number(timestampStr);
    const date = new Date(timestamp * 1000);
    return date.getFullYear() === currentYear ? count + 1 : count;
  }, 0);

  const daysToFirstBadge = Math.max(0, 50 - activeDaysInYear);

  useEffect(() => {
    if (badges.length === 0) return;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % badges.length);
        setIsAnimating(false);
      }, 500); 
    }, 3000);
    return () => clearInterval(interval);
  }, [badges.length]);

  return (
    <div className="mx-auto rounded-2xl shadow-lg bg-gradient-to-br from-white to-gray-50 p-6 max-w-4xl w-full h-500px">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-800 font-serif">
          Total Badges Earned: <span className="text-purple-600">{badges.length}</span>
        </h2>
        <h2 className="text-2xl font-semibold text-gray-700 mt-2">Your Achievements</h2>
      </div>
      {badges.length > 0 ? (
        <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <BadgeCard badge={badges[current]} />
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600 mb-4">No badges earned yet</p>
          <div className="max-w-md mx-auto text-left">
            <p>
              Be active for{' '}
              <span className="font-bold text-purple-600">{daysToFirstBadge}</span> more days this year to receive your first badge!
            </p>
            <ul className="space-y-2 text-gray-600 mt-4">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Be active for at least 50 days
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Solve daily problems for a month
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Participate in contests
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RotatingBadge;
