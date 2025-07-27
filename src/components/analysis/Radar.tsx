import React from 'react';
import Plot from 'react-plotly.js';

interface Skill {
    tagName: string;
    problemsSolved: number;
  }
  
  interface CategoryRadarProps {
    skills: {
      advanced: Skill[];
      intermediate: Skill[];
      fundamental: Skill[];
    };
  }

  const Radar: React.FC<CategoryRadarProps> = ({ skills }) => {
  const getTop10 = (data: Skill[]) =>
    [...data]
      .sort((a, b) => b.problemsSolved - a.problemsSolved)
      .slice(0, 10);
      //colors: ['#10B981', '#F59E0B', '#EF4444'],
  const categories = [
    { title: 'Fundamental', data: getTop10(skills.fundamental), color: '#10B981' },
    { title: 'Intermediate', data: getTop10(skills.intermediate), color: '#F59E0B' },
    { title: 'Advanced', data: getTop10(skills.advanced), color: '#EF4444' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
      {categories.map(({ title, data, color }) => (
        <div
          key={title}
          className="rounded-2xl border border-gray-200 p-4 shadow-md bg-white "
        >
          <h3 className="text-xl font-semibold mb-2 text-center">{title} Topics</h3>
          <Plot
            data={[
              {
                type: 'scatterpolar',
                r: data.map((t) => t.problemsSolved),
                theta: data.map((t) => t.tagName),
                fill: 'toself',
                name: title,
                marker: { color },
              },
            ]}
            layout={{
              dragmode: false, 
              hovermode: 'closest',
              polar: {
                radialaxis: {
                  visible: true,
                  color: '#ccc',
                  tickfont: { color: '#000' },
                },
                angularaxis: {
                  tickfont: { color: '#000' },
                },
              },
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              font: { color: '#000' },
              margin: { t: 20, b: 20, l: 20, r: 20 },
              height: 300,
            }}
            config={{ displayModeBar: false, responsive: false, staticPlot: true, }}
            style={{ width: '100%' }}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(Radar);
