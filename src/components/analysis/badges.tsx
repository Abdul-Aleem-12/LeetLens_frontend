import React, { useEffect, useState } from 'react';
import type { Badge } from '../../LeetCodeData';
import BadgeCard from './badgeCard';

interface Props {
  badges: Badge[];
}

const RotatingBadge: React.FC<Props> = ({ badges }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % badges.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, [badges.length]);

  return (
    <div className="text-white mx-auto transition-opacity duration-200 ease-initial rounded-2xl border border-gray-200 p-4 shadow-md ">
      <h1>Total Number of Badges earned : {badges.length}</h1>
      <h2 className=" text-3xl font-bold mb-4 text-center">Badges</h2>
      <BadgeCard badge={badges[current]} />
    </div>
  );
};

export default RotatingBadge;
