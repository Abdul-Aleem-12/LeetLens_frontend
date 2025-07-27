import React from 'react';
import { BarChartHorizontal } from 'lucide-react';
import { Card } from '../ui/Card';
import { CardContent } from '../ui/CardContent';

interface Topic {
  tagName: string;
  problemsSolved: number;
}

interface Props {
  skills: {
    fundamental: Topic[];
    intermediate: Topic[];
    advanced: Topic[];
  };
}

const MostSolvedTopics: React.FC<Props> = ({ skills }) => {
  const allTopics = [...skills.fundamental, ...skills.intermediate, ...skills.advanced];
  const sortedTopics = allTopics.sort((a, b) => b.problemsSolved - a.problemsSolved);
  const topTopics = sortedTopics.slice(0, 6);
  const maxSolved = topTopics[0]?.problemsSolved || 1;

  return (
    <Card className=" sm:w-2/3 bg-white">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BarChartHorizontal className="text-purple-700" />
          Most Solved Topics
        </h2>
        <div className="mt-4 space-y-4">
          {topTopics.map((topic, index) => (
            <div key={topic.tagName} className="space-y-1">
              <div className="flex justify-between text-lg font-medium">
                <span>
                  {topic.tagName}
                  {index === 0 && <span className="ml-2 text-sm bg-yellow-300 text-yellow-900 px-2 py-1 rounded-full">🔥 Most Solved</span>}
                </span>
                <span>{topic.problemsSolved}</span>
              </div>
              <div className="w-full h-3 bg-purple-300 rounded-full">
                <div
                  className="h-full bg-purple-600 rounded-full"
                  style={{ width: `${(topic.problemsSolved / maxSolved) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(MostSolvedTopics);
