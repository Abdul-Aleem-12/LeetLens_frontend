import React from 'react';

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

  const maxSubmission = data.reduce((max, curr) =>
    curr.count > max.count ? curr : max,
  { date: new Date(0), count: 0 });

  let activeDays = 0;
  let longestStreak = 0;
  let currentStreak = 0;
  let prevDate: Date | null = null;

  for (const { date } of data) {
    activeDays++;
    if (prevDate) {
      const diff = (date.getTime() - prevDate.getTime()) / (1000 * 3600 * 24);
      if (diff === 1) {
        currentStreak++;
      } else if (diff > 1) {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }
    prevDate = date;
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  const totalSubmissions = data.reduce((sum, entry) => sum + entry.count, 0);
  const avgPerActiveDay = activeDays > 0 ? (totalSubmissions / activeDays).toFixed(2) : '0';

  // return (
  //   <div className="rounded-2xl border border-gray-200 bg-white backdrop-blur-md p-6 shadow-md w-full">
  //     <h2 className="text-2xl font-bold mb-4">📊 Submission Insights</h2>
  //     <ul className="space-y-2 text-sm sm:text-base justify-center align-middle">
  //       <li><strong> Max Submission:</strong> {maxSubmission.count} on {maxSubmission.date.toDateString()}</li>
  //       <li><strong>Active Days:</strong> {activeDays}</li>
  //       <li><strong>Longest Streak 🔥:</strong> {longestStreak} days</li>
  //       <li><strong>Current Streak 🔥:</strong> {currentStreak} days</li>
  //       <li><strong>Avg Submissions/Active Day:</strong> {avgPerActiveDay}</li>
  //     </ul>
  //   </div>
  // );
  return (
    <div className="rounded-2xl border border-gray-200 bg-white backdrop-blur-md p-6 shadow-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center"> Submission Insights</h2>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-sm sm:text-base sm:mt-12">
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 shadow-sm">
          <span className="font-medium"> Max Submission</span>
          <span>{maxSubmission.count} on {maxSubmission.date.toDateString()}</span>
        </div>
  
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 shadow-sm">
          <span className="font-medium"> Active Days</span>
          <span>{activeDays}</span>
        </div>
  
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 shadow-sm">
          <span className="font-medium">🔥 Longest Streak</span>
          <span>{longestStreak} days</span>
        </div>
  
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 shadow-sm">
          <span className="font-medium">🔥 Current Streak</span>
          <span>{currentStreak} days</span>
        </div>
  
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 shadow-sm sm:col-span-2">
          <span className="font-medium"> Avg Submissions / Active Day</span>
          <span>{avgPerActiveDay}</span>
        </div>
      </div>
    </div>
  );
  
};

export default React.memo(SubmissionStatsCard);
