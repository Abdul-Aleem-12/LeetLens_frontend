  // import React from 'react';

  // interface Props {
  //   submissionCalendar: { [timestamp: string]: number };
  // }

  // const SubmissionStatsCard: React.FC<Props> = ({ submissionCalendar }) => {
  //   // Convert timestamps to sorted date-count array
  //   const data = Object.entries(submissionCalendar)
  //     .map(([timestamp, count]) => ({
  //       date: new Date(Number(timestamp) * 1000),
  //       count,
  //     }))
  //     .sort((a, b) => a.date.getTime() - b.date.getTime());

  //   const maxSubmission = data.reduce((max, curr) =>
  //     curr.count > max.count ? curr : max,
  //   { date: new Date(0), count: 0 });

  //   let activeDays = 0;
  //   let longestStreak = 0;
  //   let currentStreak = 0;
  //   let prevDate: Date | null = null;

  //   for (const { date } of data) {
  //     activeDays++;
  //     if (prevDate) {
  //       const diff = (date.getTime() - prevDate.getTime()) / (1000 * 3600 * 24);
  //       if (diff === 1) {
  //         currentStreak++;
  //       } else if (diff > 1) {
  //         longestStreak = Math.max(longestStreak, currentStreak);
  //         currentStreak = 1;
  //       }
  //     } else {
  //       currentStreak = 1;
  //     }
  //     prevDate = date;
  //   }
  //   longestStreak = Math.max(longestStreak, currentStreak);

  //   const totalSubmissions = data.reduce((sum, entry) => sum + entry.count, 0);
  //   const avgPerActiveDay = activeDays > 0 ? (totalSubmissions / activeDays).toFixed(2) : '0';

  //   return (
  //     <div className="rounded-2xl border border-gray-200 bg-white backdrop-blur-md p-6 shadow-md w-full">
  //       <h2 className="text-2xl font-bold mb-6 text-center"> Submission Insights</h2>
    
  //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-sm sm:text-base sm:mt-12">
  //         <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 shadow-sm">
  //           <span className="font-medium"> Max Submission</span>
  //           <span>{maxSubmission.count} on {maxSubmission.date.toDateString()}</span>
  //         </div>
    
  //         <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 shadow-sm">
  //           <span className="font-medium"> Active Days</span>
  //           <span>{activeDays}</span>
  //         </div>
    
  //         <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 shadow-sm">
  //           <span className="font-medium">🔥 Longest Streak</span>
  //           <span>{longestStreak} days</span>
  //         </div>
    
  //         <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 shadow-sm">
  //           <span className="font-medium">🔥 Current Streak</span>
  //           <span>{currentStreak} days</span>
  //         </div>
    
  //         <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 shadow-sm sm:col-span-2">
  //           <span className="font-medium"> Avg Submissions / Active Day</span>
  //           <span>{avgPerActiveDay}</span>
  //         </div>
  //       </div>
  //     </div>
  //   );
    
  // };

  // export default React.memo(SubmissionStatsCard);

  import React from 'react';
  import { Flame, Calendar, Activity, Zap, Award, BarChart2 } from 'lucide-react';
  
  interface Props {
    submissionCalendar: { [timestamp: string]: number };
  }
  
  const SubmissionStatsCard: React.FC<Props> = ({ submissionCalendar }) => {
    // Convert timestamps to sorted date-count array
    const data = Object.entries(submissionCalendar)
      .map(([timestamp, count]) => ({
        date: new Date(Number(timestamp) * 1000),
        count,
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  
    // Calculate stats
    const maxSubmission = data.reduce((max, curr) => 
      curr.count > max.count ? curr : max,
      { date: new Date(0), count: 0 }
    );
  
    let activeDays = 0;
    let longestStreak = 0;
    let currentStreak = 0;
    let prevDate: Date | null = null;
    let totalSubmissions = 0;
  
    for (const { date, count } of data) {
      activeDays++;
      totalSubmissions += count;
      
      if (prevDate) {
        const diff = (date.getTime() - prevDate.getTime()) / (1000 * 3600 * 24);
        currentStreak = diff === 1 ? currentStreak + 1 : 1;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
      prevDate = date;
    }
  
    const avgPerActiveDay = activeDays > 0 ? (totalSubmissions / activeDays).toFixed(2) : '0';
    const currentStreakStatus = currentStreak > 7 ? '🔥 On Fire!' : 
                              currentStreak > 3 ? '🔥 Keep Going!' : 
                              currentStreak > 0 ? '🔥 Getting Started' : 'No active streak';
  
    return (
      <div className="relative rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-100/20 rounded-full -ml-20 -mb-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <BarChart2 className="w-8 h-8 text-indigo-600" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Submission Insights
            </h2>
          </div>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Peak Performance */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100 hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">Peak Performance</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800">{maxSubmission.count}</p>
              <p className="text-sm text-blue-600">
                on {maxSubmission.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
            
            {/* Activity */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-100 hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Activity</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800">{activeDays}</p>
              <p className="text-sm text-green-600">active days</p>
            </div>
            
            {/* Total Submissions */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-100 hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-purple-800">Total Submissions</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800">{totalSubmissions}</p>
              <p className="text-sm text-purple-600">problems solved</p>
            </div>
            
            {/* Longest Streak */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-100 hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <Flame className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold text-amber-800">Longest Streak</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800">{longestStreak}</p>
              <p className="text-sm text-amber-600">days</p>
            </div>
            
            {/* Current Streak */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-100 hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <Flame className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-800">Current Streak</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800">{currentStreak || '0'}</p>
              <p className="text-sm text-red-600">{currentStreakStatus}</p>
            </div>
            
            {/* Average */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-100 hover:scale-[1.02] transition-transform sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold text-indigo-800">Daily Average</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800">{avgPerActiveDay}</p>
              <p className="text-sm text-indigo-600">submissions per active day</p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-6 bg-gray-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full" 
              style={{ width: `${Math.min(100, (currentStreak / Math.max(1, longestStreak)) * 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Streak progress: {currentStreak}/{longestStreak} days
          </p>
        </div>
      </div>
    );
  };
  
  export default React.memo(SubmissionStatsCard);