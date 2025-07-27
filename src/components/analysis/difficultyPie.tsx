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
  const { easy, medium, hard, total } = difficultyData;

  return (
    <div className='rounded-2xl border border-gray-200 p-6 shadow-md bg-white w-full h-full'>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800 font-serif">
          {/* //<BarChart3 className="text-green-600" /> */}
          Difficulty Distribution
        </h2>
      <Plot
        data={[
          {
            type: 'pie',
            values: [easy, medium, hard],
            labels: ['Easy', 'Medium', 'Hard'],
            textinfo: 'label+percent',
            hoverinfo: 'label+value+percent',
            textposition: 'inside',
            textfont: {
              family: 'Inter, sans-serif',
              size: 14,
              color: '#fff'
            },
            marker: {
              colors: ['#10B981', '#F59E0B', '#EF4444'],
              line: {
                color: '#fff',
                width: 1
              }
            },
            hole: 0.65,
            rotation: 45,
            pull: 0.02
          }
        ]}
        layout={{
          title: {
            //text: 'Difficulty Distribution',
            font: { 
              family: 'Inter, sans-serif',
              size: 20,
              weight: 600,
              color: '#111827'
            },
            x: 0.5,
            xanchor: 'center',
            y: 0.95
          },
          annotations: [
            {
              font: {
                family: 'Inter, sans-serif',
                size: 18,
                weight: 600,
                color: '#111827'
              },
              showarrow: false,
              text: `Total<br>${total}`,
              x: 0.5,
              y: 0.5
            }
          ],
          margin: { t: 60, b: 40, l: 40, r: 40 },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          showlegend: true,
          legend: {
            font: { 
              family: 'Inter, sans-serif',
              size: 12,
              color: '#6B7280'
            },
            orientation: 'h',
            x: 0.5,
            y: -0.1,
            xanchor: 'center'
          },
          hoverlabel: {
            font: {
              family: 'Inter, sans-serif',
              size: 14,
              color: '#111827'
            },
          }
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
          toImageButtonOptions: {
            format: 'png',
            filename: 'leetcode-difficulty-distribution',
            height: 600,
            width: 800,
            scale: 2
          }
        }}
        style={{ width: '100%', height: '400px' }}
        useResizeHandler={true}
      />
    </div>
  );
}

export default React.memo(Difficulty_PieChart);