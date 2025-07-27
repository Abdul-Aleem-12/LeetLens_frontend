import React from 'react';
import Plot from 'react-plotly.js';

interface Props {
  skills: {
    fundamental: { tagName: string; problemsSolved: number }[];
    intermediate: { tagName: string; problemsSolved: number }[];
    advanced: { tagName: string; problemsSolved: number }[];
  };
}

const TopicCategoryChart: React.FC<Props> = ({ skills }) => {
  const fundamentalTotal = skills.fundamental.reduce((acc, cur) => acc + cur.problemsSolved, 0);
  const intermediateTotal = skills.intermediate.reduce((acc, cur) => acc + cur.problemsSolved, 0);
  const advancedTotal = skills.advanced.reduce((acc, cur) => acc + cur.problemsSolved, 0);
  const totalProblems = fundamentalTotal + intermediateTotal + advancedTotal;

  return (
    <div className="sm:w-1/3 rounded-2xl p-6 shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <Plot
        data={[
          {
            type: 'pie',
            values: [fundamentalTotal, intermediateTotal, advancedTotal],
            labels: ['Fundamental', 'Intermediate', 'Advanced'],
            textinfo: 'label+percent',
            hoverinfo: 'label+value+percent',
            textposition: 'inside',
            textfont: {
              family: 'Inter, sans-serif',
              size: 14,
              color: '#fff'
            },
            marker: {
              colors: ['#10B981', '#F59E0B', '#EF4444'], // Modern color palette
              line: {
                color: '#fff',
                width: 1
              }
            },
            hole: 0.65,
            rotation: 45,
            pull: 0.02,
            automargin: true
          }
        ]}
        layout={{
          title: {
            text: 'Problem Difficulty Distribution',
            font: { 
              family: 'Inter, sans-serif',
              size: 20,
              color: '#111827',
              //weight: 'bold'
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
                color: '#111827',
                //weight: 'bold'
              },
              showarrow: false,
              text: `Total<br>${totalProblems}`,
              x: 0.5,
              y: 0.5
            }
          ],
          margin: { t: 80, b: 40, l: 40, r: 40 },
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
            y: -0.15,
            xanchor: 'center'
          },
          hoverlabel: {
            font: {
              family: 'Inter, sans-serif',
              size: 14,
              color: '#111827'
            },
            bordercolor: '#E5E7EB'
          }
        }}
        config={{
          responsive: true,
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: [
            'zoom2d', 'pan2d', 'select2d', 'lasso2d',
            'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d',
            'hoverClosestCartesian', 'hoverCompareCartesian',
            'toggleSpikelines', 'sendDataToCloud', 'toggleHover'
          ],
          modeBarButtonsToAdd: ['toImage'],
          toImageButtonOptions: {
            format: 'png',
            filename: 'leetcode-topic-distribution',
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
};

export default React.memo(TopicCategoryChart);