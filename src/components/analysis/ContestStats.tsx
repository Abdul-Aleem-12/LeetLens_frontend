import { Trophy } from 'lucide-react';
import { Card } from '../ui/Card';
import { CardContent } from '../ui/CardContent';

interface ContestStats {
  rating: number;
  topPercentage: number;
  attendedContestsCount: number;
  badge?: {
    name: string;
  };
}

interface ContestStatsProps {
  contestStats?: ContestStats;
}

const ContestStats = ({ contestStats }: ContestStatsProps) => {
    return (
      <div className="w-full h-full"> {/* Key change */}
        {contestStats ? (
            <Card className="shadow-md h-full flex flex-col justify-between">
            <CardContent className="p-6 flex flex-col justify-between flex-grow">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800 font-serif">
              <Trophy className="text-yellow-600" />
              Contest Stats
            </h2>
            
            <div className="space-y-4 flex-col">
              <div className="bg-blue-50/80 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Rating</p>
                <p className="text-2xl font-bold font-mono">{Math.round(contestStats.rating)}</p>
              </div>
              
              <div className="bg-purple-50/80 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">Global Rank</p>
                <p className="text-2xl font-bold font-mono">Top {contestStats.topPercentage}%</p>
              </div>
              
              <div className="bg-green-50/80 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-600">Contests Attended</p>
                <p className="text-2xl font-bold font-mono">{contestStats.attendedContestsCount}</p>
              </div>
              
              <div className="bg-amber-50/80 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Badge</p>
                <p className="text-xl font-bold font-mono truncate">
                  {contestStats.badge?.name || 'None'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-md h-full">
          <CardContent className="p-6 h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800 font-serif">
              <Trophy className="text-yellow-600" />
              Contest Stats
            </h2>
            
            <div className="flex-grow flex flex-col justify-center text-center">
              <p className="text-lg text-gray-700 mb-2">No contests participated yet</p>
              <p className="text-sm text-gray-500 mb-4">Join contests to track your progress!</p>
              
              <div className="text-left mx-auto max-w-xs">
                <p className="text-xs font-semibold text-gray-600 mb-1">UPCOMING CONTESTS:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-start">
                    <span className="inline-block mr-2">•</span>
                    Weekly: Sundays 8:00 AM IST
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block mr-2">•</span>
                    Biweekly: Alternating Saturdays 8:00 PM IST
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContestStats;


// import { Trophy } from 'lucide-react';
// import { Card } from '../ui/Card';
// import { CardContent } from '../ui/CardContent';

// interface ContestStats {
//   rating: number;
//   topPercentage: number;
//   attendedContestsCount: number;
//   badge?: {
//     name: string;
//   };
// }

// interface ContestStatsProps {
//   contestStats?: ContestStats;
// }

// const ContestStats = ({ contestStats }: ContestStatsProps) => {
//   return (
//     <div className="w-full h-full">
//       {contestStats ? (
//         <Card className="shadow-md h-full">
//           <CardContent className="p-6 h-full flex flex-col">
//             <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800 font-serif">
//               <Trophy className="text-yellow-600" />
//               Contest Stats
//             </h2>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
//               <div className="bg-blue-50/80 rounded-xl p-4">
//                 <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Rating</p>
//                 <p className="text-2xl font-bold font-mono">{Math.round(contestStats.rating)}</p>
//               </div>
              
//               <div className="bg-purple-50/80 rounded-xl p-4">
//                 <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">Global Rank</p>
//                 <p className="text-2xl font-bold font-mono">Top {contestStats.topPercentage}%</p>
//               </div>
              
//               <div className="bg-green-50/80 rounded-xl p-4">
//                 <p className="text-xs font-semibold uppercase tracking-wider text-green-600">Contests Attended</p>
//                 <p className="text-2xl font-bold font-mono">{contestStats.attendedContestsCount}</p>
//               </div>
              
//               <div className="bg-amber-50/80 rounded-xl p-4">
//                 <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Badge</p>
//                 <p className="text-xl font-bold font-mono truncate">
//                   {contestStats.badge?.name || 'None'}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         <Card className="shadow-md h-full">
//           <CardContent className="p-6 h-full flex flex-col">
//             <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800 font-serif">
//               <Trophy className="text-yellow-600" />
//               Contest Stats
//             </h2>
            
//             <div className="flex-grow flex flex-col justify-center text-center">
//               <p className="text-lg text-gray-700 mb-2">No contests participated yet</p>
//               <p className="text-sm text-gray-500 mb-4">Join contests to track your progress!</p>
              
//               <div className="text-left mx-auto max-w-xs">
//                 <p className="text-xs font-semibold text-gray-600 mb-1">UPCOMING CONTESTS:</p>
//                 <ul className="text-xs text-gray-600 space-y-1">
//                   <li className="flex items-start">
//                     <span className="inline-block mr-2">•</span>
//                     Weekly: Sundays 8:00 AM IST
//                   </li>
//                   <li className="flex items-start">
//                     <span className="inline-block mr-2">•</span>
//                     Biweekly: Alternating Saturdays 8:00 PM IST
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default ContestStats;