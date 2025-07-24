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

  return (
    <div className="w-full rounded-2xl p-4 shadow-md bg-white min-h-100">
      <Plot
        data={[
          {
            type: 'pie',
            values: [fundamentalTotal, intermediateTotal, advancedTotal],
            labels: ['Fundamental', 'Intermediate', 'Advanced'],
            textinfo: 'label+value+percent',
            hoverinfo: 'label+value+percent',
            marker: {
              colors: ['#76D7C4', '#F7DC6F', '#EC7063'],
              line: {
                color: '#111',
                width: 2
              }
            },
            hole: 0.4,
          },
        ]}
        layout={{
          title: {
            text: 'Topic Category Distribution',
            font: { size: 22, color: '#000' },
            x: 0.5,
            xanchor: 'center',
          },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          showlegend: true,
          legend: {
            orientation: 'h',
            font: { color: '#000' },
            y: -0.2
          }
        }}
        config={{
          responsive: true,
          displaylogo: false,
          modeBarButtonsToRemove: [
            'zoom2d', 'pan2d', 'select2d', 'lasso2d',
            'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d',
            'hoverClosestCartesian', 'hoverCompareCartesian',
            'toggleSpikelines', 'sendDataToCloud', 'toggleHover'
          ],
          modeBarButtonsToAdd: ['toImage']
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default React.memo(TopicCategoryChart);
