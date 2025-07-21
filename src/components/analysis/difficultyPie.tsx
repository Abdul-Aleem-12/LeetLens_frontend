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
    <div className='rounded-2xl border border-gray-200 p-4 shadow-md bg-gradient-to-r from-purple-100 to-purple-200'>
    <Plot
      data={[
        {
          type: 'pie',
          values: [easy, medium, hard],
          labels: ['Easy', 'Medium', 'Hard'],
          textinfo: 'label+value',
          hoverinfo: 'label+value+percent',
          textposition: 'outside',
          textfont: {
            family: 'Arial, sans-serif',
            color: '#000',
            size: 16,
          },
          // pull: [0.05, 0.05, 0.05],
          marker: {
            colors: ['#76D7C4', '#F7DC6F', '#EC7063'], // Slightly deeper pastel
            line: {
              color: '#000',
              width: 2
            }
          },
          hole: 0.6, // Larger hole for more pronounced donut
        },
      ]}
      layout={{
        title: {
          text: 'Difficulty Distribution',
          font: { size: 24, color: '#000' },
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
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',  
        showlegend: true,
        legend: {
          font: { color: '#000' },
          orientation: 'h',
          x: 0.2,
          y: -0.1
        },
      }}
      config={{
        responsive: true,
        displayModeBar: true,
        modeBarButtonsToRemove: [
          'zoom2d', 'pan2d', 'select2d', 'lasso2d',
          'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d',
          'hoverClosestCartesian', 'hoverCompareCartesian',
          'toggleSpikelines', 'sendDataToCloud',  
          'resetViews',
        ],
        modeBarButtonsToAdd: ['toImage'],
        displaylogo: false, 
      }}
      
      style={{ width: '100%', height: '100%' }}
    />
    </div>
  );
}

export default React.memo(Difficulty_PieChart);