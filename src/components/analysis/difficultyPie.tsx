import React from 'react';
import Plot from 'react-plotly.js';

type DifficultyData = {
  easy: number;
  medium: number;
  hard: number;
  total: number;
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
          textinfo: 'label+value',
          hoverinfo: 'label+value+percent',
          textposition: 'outside',
          // pull: [0.05, 0.05, 0.05],
          marker: {
            colors: ['#76D7C4', '#F7DC6F', '#EC7063'], // Slightly deeper pastel
            line: {
              color: '#ffffff',
              width: 2
            }
          },
          hole: 0.6, // Larger hole for more pronounced donut
        },
      ]}
      layout={{
        title: {
          text: 'Difficulty Distribution',
          font: { size: 22, color: '#333' },
          x: 0.5,
          xanchor: 'center'
        },
        annotations: [
          {
            font: {
              size: 16
            },
            showarrow: false,
            text: 'Total Solved <br>' + difficultyData.total,
            x: 0.5,
            y: 0.5,
            xanchor: 'center',
            yanchor: 'middle'
          }
        ],
        paper_bgcolor: 'rgba(0,0,0,0.36)',
        plot_bgcolor: 'rgba(0,0,0,0)',  
        showlegend: true,
        legend: {
          font: { color: '#333' },
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