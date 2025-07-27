import React from 'react';
import Plot from 'react-plotly.js';

interface TopicData {
  tagName: string;
  problemsSolved: number;
}

interface Props {
  skills: {
    fundamental: TopicData[];
    intermediate: TopicData[];
    advanced: TopicData[];
  };
}

const extractTopTopics = (topics: TopicData[], limit = 5) => {
  return [...topics]
    .sort((a, b) => b.problemsSolved - a.problemsSolved)
    .slice(0, limit);
};

const TopicBar = ({ title, topics, color }: { title: string; topics: TopicData[]; color: string }) => {
  const labels = topics.map((t) => t.tagName);
  const values = topics.map((t) => t.problemsSolved);

  return (
    <div className="rounded-2xl border border-gray-200 p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold text-center mb-2 ">Top {title} Topics</h2>
      <Plot
        data={[
          {
            x: labels,
            y: values,
            type: 'bar',
            marker: { color },
          },
        ]}
        layout={{
          dragmode: false, 
          hovermode: 'closest',
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          xaxis: {
            title: { text: '', font: { color: '#000' } },
            tickfont: { color: '#000' }
          },
          yaxis: {
            title: { text: 'Problems Solved', font: { color: '#000' } },
            tickfont: { color: '#000' }
          },
          font: { color: '#000' },
          margin: { t: 10 },
        }}
        config={{ displayModeBar: false,}}
        style={{ width: '100%', height: '300px' }}
      />
    </div>
  );
};

const TopTopicsBarCharts: React.FC<Props> = ({ skills }) => {
  const topFundamental = extractTopTopics(skills.fundamental);
  const topIntermediate = extractTopTopics(skills.intermediate);
  const topAdvanced = extractTopTopics(skills.advanced);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
      <TopicBar title="Fundamental" topics={topFundamental} color="#10B981" />
      <TopicBar title="Intermediate" topics={topIntermediate} color="#F59E0B" />
      <TopicBar title="Advanced" topics={topAdvanced} color="#EF4444" />
    </div>
  );
};
export default React.memo(TopTopicsBarCharts);