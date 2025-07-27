import React from 'react';
import type { LeetCodeData } from '../../LeetCodeData';
import { BarChart3, Flame } from 'lucide-react';

interface SummaryProps {
  data: LeetCodeData;
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  const {
    totalSolved,
    totalQuestions,
    totalSubmissions,
    submissionCalendar,
  } = data;

  // ------------------ Submission Calendar Analytics ------------------
  const submissionData = Object.entries(submissionCalendar || {})
    .map(([timestamp, count]) => ({
      date: new Date(Number(timestamp) * 1000),
      count,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const activeDays = submissionData.length;
  
  // Calculate streaks
  let longestStreak = 0;
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate current streak
  if (submissionData.length > 0) {
    currentStreak = 1;
    let currentDate = new Date(submissionData[submissionData.length - 1].date);
    currentDate.setHours(0, 0, 0, 0);
    
    // Check if last submission was today or yesterday
    const diffToday = Math.floor((today.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffToday <= 1) { // Today or yesterday
      // Check previous days for consecutive submissions
      for (let i = submissionData.length - 2; i >= 0; i--) {
        const prevDate = new Date(submissionData[i].date);
        prevDate.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          currentStreak++;
          currentDate = prevDate;
        } else if (diffDays > 1) {
          break; // Streak broken
        }
      }
    } else {
      currentStreak = 0; // No current streak
    }
  }

  // Calculate longest streak
  let tempStreak = 1;
  for (let i = 1; i < submissionData.length; i++) {
    const prevDate = new Date(submissionData[i-1].date);
    prevDate.setHours(0, 0, 0, 0);
    const currDate = new Date(submissionData[i].date);
    currDate.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  const mostActiveDay = submissionData.length > 0
    ? submissionData.reduce((max, curr) => (curr.count > max.count ? curr : max))
    : null;

  const avgPerActiveDay = activeDays > 0 ? (totalSubmissions / activeDays).toFixed(2) : '0';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6 font-sans">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md w-full col-span-1 lg:col-span-3">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800 font-serif">
          <BarChart3 className="text-green-600" />
          Problem Solving Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Problems Solved */}
          <div className="bg-blue-50/80 hover:bg-blue-100/80 transition-colors text-blue-900 rounded-xl p-4 shadow-sm border border-blue-100">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">Problems Solved</h3>
            <p className="text-2xl font-bold font-mono">{totalSolved}<span className="text-sm font-normal text-blue-700"> / {totalQuestions}</span></p>
            <p className="text-xs text-blue-500 mt-1">{((totalSolved / totalQuestions) * 100).toFixed(1)}% completed</p>
          </div>

          {/* Submissions */}
          <div className="bg-green-50/80 hover:bg-green-100/80 transition-colors text-green-900 rounded-xl p-4 shadow-sm border border-green-100">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-1">Submissions</h3>
            <p className="text-2xl font-bold font-mono">{totalSubmissions}</p>
            <p className="text-xs text-green-500 mt-1">{activeDays} active days</p>
          </div>

          {/* Current Streak - Replaces Difficulty Breakdown */}
          <div className="bg-amber-50/80 hover:bg-amber-100/80 transition-colors text-amber-900 rounded-xl p-4 shadow-sm border border-amber-100">
            <div className="flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-600">Current Streak</h3>
            </div>
            <p className="text-2xl font-bold font-mono mt-1">
              {currentStreak > 0 ? currentStreak : '0'}
              <span className="text-sm font-normal text-amber-700"> days</span>
            </p>
            <p className="text-xs text-amber-500 mt-1">
              {currentStreak > 7 ? '🔥 Amazing streak!' : 
               currentStreak > 3 ? '🔥 Keep it up!' : 
               currentStreak > 0 ? 'Start building your streak!' : 
               'No active streak'}
            </p>
          </div>

          {/* Longest Streak */}
          <div className="bg-purple-50/80 hover:bg-purple-100/80 transition-colors text-purple-900 rounded-xl p-4 shadow-sm border border-purple-100">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-600 mb-1">Longest Streak</h3>
            <p className="text-2xl font-bold font-mono">{longestStreak}<span className="text-sm font-normal text-purple-700"> days</span></p>
            <p className="text-xs text-purple-500 mt-1">Your personal best</p>
          </div>

          {/* Average Submissions */}
          <div className="bg-orange-50/80 hover:bg-orange-100/80 transition-colors text-orange-900 rounded-xl p-4 shadow-sm border border-orange-100">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-orange-600 mb-1">Avg submission of</h3>
            <p className="text-2xl font-bold font-mono">{avgPerActiveDay}</p>
            <p className="text-xs text-orange-500 mt-1">on every active day</p>
          </div>

          {/* Most Active Day */}
          <div className="bg-rose-50/80 hover:bg-rose-100/80 transition-colors text-rose-900 rounded-xl p-4 shadow-sm border border-rose-100">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-600 mb-1">Most Active Day</h3>
            {mostActiveDay ? (
              <div>
                <p className="text-lg font-bold font-mono">{mostActiveDay.count}</p>
                <p className="text-xs font-bold font-mono">submissions on</p>
                <p className="text-xs text-rose-600">
                  {mostActiveDay.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            ) : (
              <p className="text-sm italic text-rose-400">No data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;