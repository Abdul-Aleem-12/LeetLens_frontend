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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 clash-grotesk">
      {/* Total Solved */}
      <Card className="shadow-md text-white">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Target className="text-blue-600" />
            Total Solved
          </h2>
          <p className="text-6xl font-bold ">{totalSolved}</p>
          <p className="text-3xl text-gray-700 mt-2 font-medium">
            Out of <span className="font-bold">{totalQuestions}</span> problems
          </p>
          <p className="text-3xl text-gray-700 mt-2 font-medium">
            Total Submissions <span className="font-bold">{totalSubmissions}</span>
          </p>
          <p className="text-4xl lg:text-5xl text-gray-700 mt-2 font-medium"> Average Number of Submission per Question: <span className='font-extrabold'>{((totalSubmissions/totalSolved)).toFixed(2)}</span> </p>
        </CardContent>
      </Card>

      {/* Difficulty Breakdown */}
      <Card className=" text-white shadow-md text-5xl sm:text-7xl">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="text-green-600" />
            Difficulty Breakdown
          </h2>
          <p className="text-md font-medium">
            Easy: <span className="font-bold mt-3">{easySolved}</span> Medium:{' '}
            <span className=" font-bold mt-3 inline-block sm:mt-5">{mediumSolved}</span> Hard:{' '}
            <span className="font-bold mt-3 inline-block sm:mt-5">{hardSolved}</span>
          </p>
        </CardContent>
      </Card>

      {/* Contest Stats */}
      <Card className=" text-white shadow-md">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Trophy className="text-yellow-600" />
            Contest Stats
          </h2>
          <p className="text-md font-semibold">
            Rating: <span className="font-extrabold">{Math.round(contestStats.rating)}</span>
          </p>
          <p className="sm:text-4xl text-xl font-normal">
            Global Ranking: <span className="font-bold"> Top {contestStats.topPercentage}%</span>
          </p>
          <p className="sm:text-4xl text-3xl text-gray-700 mt-3">
            Contests Attended: {contestStats.attendedContestsCount}
          </p>
          <p className="sm:text-4xl text-3xl text-gray-700 mt-3">
            Contest Badge: {contestStats.badge?.name || 'No Badge Earned'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;
