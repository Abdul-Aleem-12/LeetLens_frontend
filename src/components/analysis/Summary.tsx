import React from 'react';
import type { LeetCodeData } from '../../LeetCodeData';
import { Card } from '../ui/Card';
import { CardContent } from '../ui/CardContent';
import { BarChart3, Target, Trophy } from 'lucide-react';

interface SummaryProps {
  data: LeetCodeData;
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  const {
    totalSolved,
    totalQuestions,
    totalSubmissions,
    easySolved,
    mediumSolved,
    hardSolved,
    contestStats,
  } = data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      {/* Total Solved */}
      <Card className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-md">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Target className="text-blue-600" />
            Total Solved
          </h2>
          <p className="text-6xl font-bold">{totalSolved}</p>
          <p className="text-3xl text-gray-700 mt-2">Out of {totalQuestions} problems</p>
          <p className="text-3xl lg:text-4xl text-gray-700 mt-2"> Total Submissions: {totalSubmissions}</p>
          <p className="text-4xl lg:text-5xl text-gray-700 mt-2"> Average Number of Submission per Question: {((totalSubmissions/totalSolved)).toFixed(2)}</p>
        </CardContent>
      </Card>

      {/* Difficulty Breakdown */}
      <Card className="bg-gradient-to-r from-green-100 to-green-200 shadow-md">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="text-green-600" />
            Difficulty Breakdown
          </h2>
          <p className="text-md font-medium">
            Easy: <span className="font-bold">{easySolved}</span>, Medium:{' '}
            <span className="font-bold">{mediumSolved}</span>, Hard:{' '}
            <span className="font-bold">{hardSolved}</span>
          </p>
        </CardContent>
      </Card>

      {/* Contest Stats */}
      <Card className="bg-gradient-to-r from-yellow-100 to-yellow-200 shadow-md">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Trophy className="text-yellow-600" />
            Contest Stats
          </h2>
          <p className="text-md">
            Rating: <span className="font-bold">{Math.round(contestStats.rating)}</span>
          </p>
          <p className="text-md">
            Global Rank: <span className="font-bold">Top {contestStats.topPercentage}%</span>
          </p>
          <p className="text-sm text-gray-700">
            Contests Attended: {contestStats.attendedContestsCount}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;
