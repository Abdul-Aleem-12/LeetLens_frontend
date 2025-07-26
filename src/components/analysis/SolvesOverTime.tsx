import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

interface Props {
  submissionCalendar: { [timestamp: string]: number };
}

// ✅ Custom hook to track window size
function useWindowSize() {
  const [size, setSize] = useState<[number, number]>([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handler = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
}

const SolvesOverTimeLineChart: React.FC<Props> = ({ submissionCalendar }) => {
  const currentDate = new Date();
  const daysToShow = 100;
  const cur_year = new Date().getFullYear();

  const [width] = useWindowSize(); // ✅ get window width
  const height = width < 640 ? 300 : 450; // ✅ set dynamic height

  const data = Object.entries(submissionCalendar)
    .map(([timestamp, count]) => {
      const date = new Date(Number(timestamp) * 1000);
      return { date, count };
    })
    .filter(entry => {
      const daysAgo = (currentDate.getTime() - entry.date.getTime()) / (1000 * 60 * 60 * 24);
      return daysAgo <= daysToShow;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const dates = data.map(entry => entry.date.toISOString().split('T')[0]);
  const counts = data.map(entry => entry.count);

  return (
    <div
      className="relative mt-3 w-full rounded-2xl border border-gray-200 p-4 shadow-md bg-white"
      style={{ minHeight: '300px' }}
    >
      <Plot
        data={[
          {
            x: dates,
            y: counts,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: '#76D7C4' },
            line: { shape: 'linear' },
            name: 'Problems Solved',
          },
        ]}
        layout={{
          autosize: true, 
          margin: { t: 60, b: 60, l: 50, r: 30 },
          dragmode: false,
          hovermode: 'closest',
          title: {
            text: `Problems Solved<br><span style="font-size:14px; color:#000;">Last ${daysToShow} Active Days in ${cur_year}</span>`,
            font: { size: 22, color: '#000' },
            x: 0.5,
            xanchor: 'center',
          },
          xaxis: {
            title: {
              text: 'Date',
              font: { color: '#000' },
            },
            tickangle: -45,
            type: 'date',
            tickfont: { color: '#000' },
          },
          yaxis: {
            title: {
              text: 'Problems Solved',
              font: { color: '#000' },
            },
            tickfont: { color: '#000' },
          },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
        }}
        config={{
          responsive: true,
          displaylogo: false,
          modeBarButtonsToRemove: [
            'zoom2d',
            'pan2d',
            'select2d',
            'lasso2d',
            'zoomIn2d',
            'zoomOut2d',
            'autoScale2d',
            'hoverClosestCartesian',
            'hoverCompareCartesian',
            'toggleSpikelines',
            'sendDataToCloud',
            'toggleHover',
          ],
          modeBarButtonsToAdd: ['resetScale2d'],
        }}
        style={{ width: '100%', height }}
      />
    </div>
  );
};

export default React.memo(SolvesOverTimeLineChart);
