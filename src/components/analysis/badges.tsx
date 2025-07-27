import React, { useEffect, useState } from 'react';
import type { Badge } from '../../LeetCodeData';
import BadgeCard from './badgeCard';

interface Props {
  badges: Badge[];
}

const RotatingBadge: React.FC<Props> = ({ badges }) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (badges.length === 0) return;
    
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % badges.length);
        setIsAnimating(false);
      }, 500); // Animation duration
    }, 3000);
    
    return () => clearInterval(interval);
  }, [badges.length]);

  return (
    <div className="mx-auto rounded-2xl shadow-lg bg-gradient-to-br from-white to-gray-50 p-6 max-w-4xl w-full">
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
          <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p className="text-xl text-gray-600 mb-4">No badges earned yet</p>
          <div className="max-w-md mx-auto text-left">
            <ul className="space-y-2 text-gray-600">
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