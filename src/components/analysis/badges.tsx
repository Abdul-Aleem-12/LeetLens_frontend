// import React, { useEffect, useState } from 'react';
// import type { Badge } from '../../LeetCodeData';
// import BadgeCard from './badgeCard';

// interface Props {
//   badges: Badge[];
// }

// const RotatingBadge: React.FC<Props> = ({ badges }) => {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % badges.length);
//     }, 3000); // change every 3 seconds
//     return () => clearInterval(interval);
//   }, [badges.length]);

//   return (
//     <div className=" mx-auto transition-opacity duration-200 ease-initial rounded-2xl border border-gray-200 p-4 shadow-md bg-gradient-to-r from-purple-100 to-purple-200">
//       <h1>Total Number of Badges earned : {badges.length}</h1>
//       <h2 className=" text-3xl font-bold mb-4 text-center">Badges</h2>
//       <BadgeCard badge={badges[current]} />
//     </div>
//   );
// };

// export default RotatingBadge;


import React, { useEffect, useState } from 'react';
import type { Badge } from '../../LeetCodeData';
import BadgeCard from './badgeCard';

interface Props {
  badges: Badge[];
}

const RotatingBadge: React.FC<Props> = ({ badges }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (badges.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % badges.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [badges.length]);

  return (
    <div className="mx-auto transition-opacity duration-200 ease-initial rounded-2xl shadow-md bg-white min-w-1/">
      <h1 className='text-2xl sm:text-7xl'>Total Number of Badges earned : {badges.length}</h1>
      <h2 className="text-3xl font-bold mb-4 text-center">Badges</h2>

      {badges.length > 0 ? (
        <BadgeCard badge={badges[current]} />
      ) : (
        <>
        <p className=" text-center text-gray-700 text-xl mt-4">
          No badges earned yet.         </p>
          <ul className="list-disc list-inside text-gray-700 text-xl mt-4 text-left mx-auto w-fit">
            <li>Be active for atleast 50 days</li>
            <li>Solve Daily problem for a month</li>
            <li>Participate in contests</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default RotatingBadge;
