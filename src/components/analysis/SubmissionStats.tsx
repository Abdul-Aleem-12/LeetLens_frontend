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

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/5 backdrop-blur-md p-6 shadow-md w-full bg-gradient-to-r  from-purple-100 to-purple-200">
      <h2 className="text-2xl font-bold mb-4">📊 Submission Insights</h2>
      <ul className="space-y-2 text-sm sm:text-base">
        <li><strong> Max Submission:</strong> {maxSubmission.count} on {maxSubmission.date.toDateString()}</li>
        <li><strong>Active Days:</strong> {activeDays}</li>
        <li><strong>Longest Streak 🔥:</strong> {longestStreak} days</li>
        <li><strong>Current Streak 🔥:</strong> {currentStreak} days</li>
        <li><strong>Avg Submissions/Active Day:</strong> {avgPerActiveDay}</li>
      </ul>
    </div>
  );
};

export default React.memo(SubmissionStatsCard);
