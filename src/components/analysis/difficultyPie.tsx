import React from 'react';
import Plot from 'react-plotly.js';

type DifficultyData = {
  easy: number;
  medium: number;
  hard: number;
  total: number; // used for reference, not in the pie
};

interface Props {
  difficultyData: DifficultyData;
}

function Difficulty_PieChart({ difficultyData }: Props) {
  const { easy, medium, hard } = difficultyData;

  return (
    <Plot
      data={[
        {
          type: 'pie',
          values: [easy, medium, hard],
          labels: ['Easy', 'Medium', 'Hard'],
          textinfo: 'label+percent',
          hoverinfo: 'label+value+percent',
          marker: {
            colors: ['#a3e4d7', '#f9e79f', '#f1948a'], // pastel shades
            line: {
              color: '#ffffff',
              width: 2
            }
          },
          hole: 0.4, // for a donut-style chart
        },
      ]}
      layout={{
        title: {
          text: 'Difficulty Distribution',
          font: { size: 20, color: '#fff' },
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        showlegend: true,
        legend: {
          font: { color: '#fff' },
          orientation: 'h',
          x: 0.2,
          y: -0.1
        },
      }}
      config={{ responsive: true }}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default React.memo(Difficulty_PieChart);
