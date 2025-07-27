// import React, { useEffect, useState } from 'react';
// import Plot from 'react-plotly.js';
// import { Activity, Calendar, Zap, TrendingUp } from 'lucide-react';

// function useWindowSize() {
//   const [size, setSize] = useState<[number, number]>([window.innerWidth, window.innerHeight]);
//   useEffect(() => {
//     const handler = () => setSize([window.innerWidth, window.innerHeight]);
//     window.addEventListener('resize', handler);
//     return () => window.removeEventListener('resize', handler);
//   }, []);
//   return size;
// }

// // Define the Props interface
// interface Props {
//   submissionCalendar: { [timestamp: string]: number };
// }

// const SolvesOverTimeLineChart: React.FC<Props> = ({ submissionCalendar }) => {
//   const currentDate = new Date();
//   const daysToShow = 100;
//   const cur_year = new Date().getFullYear();
//   const [width] = useWindowSize();
//   const [timeRange, setTimeRange] = useState<'30' | '60' | '100'>('100');
//   const [activeTab, setActiveTab] = useState<'chart' | 'stats'>('chart');

//   // Process data with time range filter
//   const filteredData = Object.entries(submissionCalendar)
//       .map(([timestamp, count]) => ({
//         date: new Date(Number(timestamp) * 1000),
//         count: count as number
//       }))
//     .filter(entry => {
//       const daysAgo = (currentDate.getTime() - entry.date.getTime()) / (1000 * 60 * 60 * 24);
//       return daysAgo <= parseInt(timeRange);
//     })
//     .sort((a, b) => a.date.getTime() - b.date.getTime());

//   // Calculate statistics
//   const totalSolves = filteredData.reduce((sum, entry) => sum + entry.count, 0);
//   const averagePerDay = (totalSolves / filteredData.length).toFixed(2);
//   const maxSolves = Math.max(...filteredData.map(entry => entry.count), 0);
//   const maxSolvesDate = filteredData.find(entry => entry.count === maxSolves)?.date;

//   return (
//     <div className="relative mt-3 w-full rounded-2xl border border-gray-200 p-6 shadow-lg bg-white backdrop-blur-sm">
//       {/* Header with interactive controls */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//         <div className="flex items-center gap-3">
//           <Activity className="w-6 h-6 text-indigo-600" />
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Solving Activity
//           </h2>
//         </div>
        
//         <div className="flex gap-2">
//           <button 
//             onClick={() => setActiveTab('chart')}
//             className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${activeTab === 'chart' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
//           >
//             <TrendingUp className="inline mr-1 w-4 h-4" /> Chart
//           </button>
//           <button 
//             onClick={() => setActiveTab('stats')}
//             className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${activeTab === 'stats' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
//           >
//             <Zap className="inline mr-1 w-4 h-4" /> Insights
//           </button>
//         </div>
//       </div>

//       {/* Time range selector */}
//       <div className="flex justify-center gap-2 mb-6">
//         {['30', '60', '100'].map((range) => (
//           <button
//             key={range}
//             onClick={() => setTimeRange(range as '30' | '60' | '100')}
//             className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
//               timeRange === range
//                 ? 'bg-indigo-600 text-white shadow-md'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Last {range} days
//           </button>
//         ))}
//       </div>

//       {activeTab === 'chart' ? (
//         <Plot
//           data={[
//             {
//               x: filteredData.map(entry => entry.date),
//               y: filteredData.map(entry => entry.count as number),
//               type: 'scatter',
//               mode: 'lines+markers',
//               marker: { 
//                 color: '#7C3AED',
//                 size: 8,
//                 line: { width: 1, color: '#FFFFFF' }
//               },
//               line: { 
//                 color: '#8B5CF6',
//                 width: 3,
//                 shape: 'spline',
//                 smoothing: 1.3
//               },
//               name: 'Daily Solves',
//               hovertemplate: '<b>%{x|%b %d}</b><br>%{y} solves<extra></extra>',
//               fill: 'tozeroy',
//               fillcolor: 'rgba(124, 58, 237, 0.1)'
//             },
//           ]}
//           layout={{
//             height: width < 640 ? 300 : 400,
//             margin: { t: 0, b: 60, l: 60, r: 30 },
//             hovermode: 'x unified',
//             xaxis: {
//               title: { text: 'Date', font: { color: '#6B7280' } },
//               tickfont: { color: '#6B7280' },
//               gridcolor: '#F3F4F6',
//               linecolor: '#E5E7EB',
//             },
//             yaxis: {
//               title: { text: 'Problems Solved', font: { color: '#6B7280' } },
//               tickfont: { color: '#6B7280' },
//               gridcolor: '#F3F4F6',
//               linecolor: '#E5E7EB',
//             },
//             paper_bgcolor: 'rgba(0,0,0,0)',
//             plot_bgcolor: 'rgba(0,0,0,0)',
//             showlegend: false,
//             hoverlabel: {
//               bgcolor: '#FFFFFF',
//               bordercolor: '#E5E7EB',
//               font: { color: '#111827' }
//             }
//           }}
//           config={{
//             responsive: true,
//             displaylogo: false,
//             modeBarButtonsToRemove: [
//               'zoom2d', 'pan2d', 'select2d', 'lasso2d',
//               'zoomIn2d', 'zoomOut2d', 'autoScale2d',
//               'hoverClosestCartesian', 'hoverCompareCartesian',
//               'toggleSpikelines', 'sendDataToCloud', 'toggleHover'
//             ],
//             displayModeBar: true
//           }}
//           style={{ width: '100%' }}
//         />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
//           <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
//             <p className="text-sm font-medium text-indigo-700">Total Solves</p>
//             <p className="text-3xl font-bold text-indigo-900">{totalSolves}</p>
//             <p className="text-xs text-indigo-500">in {parseInt(timeRange)} days</p>
//           </div>
          
//           <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
//             <p className="text-sm font-medium text-purple-700">Daily Average</p>
//             <p className="text-3xl font-bold text-purple-900">{averagePerDay}</p>
//             <p className="text-xs text-purple-500">problems per day</p>
//           </div>
          
//           <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
//             <p className="text-sm font-medium text-emerald-700">Peak Day</p>
//             <p className="text-3xl font-bold text-emerald-900">{maxSolves}</p>
//             <p className="text-xs text-emerald-500">
//               on {maxSolvesDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) || 'N/A'}
//             </p>
//           </div>
          
//           <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
//             <p className="text-sm font-medium text-amber-700">Active Days</p>
//             <p className="text-3xl font-bold text-amber-900">{filteredData.length}</p>
//             <p className="text-xs text-amber-500">
//               {((filteredData.length / parseInt(timeRange)) * 100).toFixed(1)}% consistency
//             </p>
//           </div>
//         </div>
//       )}

//       <div className="text-xs text-gray-500 mt-4 text-center">
//         <Calendar className="inline mr-1 w-3 h-3" />
//         Showing last {timeRange} days of {cur_year}
//       </div>
//     </div>
//   );
// };

// export default React.memo(SolvesOverTimeLineChart);

// import React, { useEffect, useState } from 'react';
// import Plot from 'react-plotly.js';

// interface Props {
//   submissionCalendar: { [timestamp: string]: number };
// }

// // ✅ Custom hook to track window size
// function useWindowSize() {
//   const [size, setSize] = useState<[number, number]>([window.innerWidth, window.innerHeight]);
//   useEffect(() => {
//     const handler = () => setSize([window.innerWidth, window.innerHeight]);
//     window.addEventListener('resize', handler);
//     return () => window.removeEventListener('resize', handler);
//   }, []);
//   return size;
// }

// const SolvesOverTimeLineChart: React.FC<Props> = ({ submissionCalendar }) => {
//   const currentDate = new Date();
//   const daysToShow = 100;
//   const cur_year = new Date().getFullYear();

//   const [width] = useWindowSize(); // ✅ get window width
//   const height = width < 640 ? 300 : 450; // ✅ set dynamic height

//   const data = Object.entries(submissionCalendar)
//     .map(([timestamp, count]) => {
//       const date = new Date(Number(timestamp) * 1000);
//       return { date, count };
//     })
//     .filter(entry => {
//       const daysAgo = (currentDate.getTime() - entry.date.getTime()) / (1000 * 60 * 60 * 24);
//       return daysAgo <= daysToShow;
//     })
//     .sort((a, b) => a.date.getTime() - b.date.getTime());

//   const dates = data.map(entry => entry.date.toISOString().split('T')[0]);
//   const counts = data.map(entry => entry.count);

//   return (
//     <div
//       className="relative mt-3 w-full rounded-2xl border border-gray-200 p-4 shadow-md bg-white"
//       style={{ minHeight: '300px' }}
//     >
//       <Plot
//         data={[
//           {
//             x: dates,
//             y: counts,
//             type: 'scatter',
//             mode: 'lines+markers',
//             marker: { color: '#76D7C4' },
//             line: { shape: 'linear' },
//             name: 'Problems Solved',
//           },
//         ]}
//         layout={{
//           autosize: true, 
//           margin: { t: 60, b: 60, l: 50, r: 30 },
//           dragmode: false,
//           hovermode: 'closest',
//           title: {
//             text: `Problems Solved<br><span style="font-size:14px; color:#000;">Last ${daysToShow} Active Days in ${cur_year}</span>`,
//             font: { size: 22, color: '#000' },
//             x: 0.5,
//             xanchor: 'center',
//           },
//           xaxis: {
//             title: {
//               text: 'Date',
//               font: { color: '#000' },
//             },
//             tickangle: -45,
//             type: 'date',
//             tickfont: { color: '#000' },
//           },
//           yaxis: {
//             title: {
//               text: 'Problems Solved',
//               font: { color: '#000' },
//             },
//             tickfont: { color: '#000' },
//           },
//           paper_bgcolor: 'rgba(0,0,0,0)',
//           plot_bgcolor: 'rgba(0,0,0,0)',
//         }}
//         config={{
//           responsive: true,
//           displaylogo: false,
//           modeBarButtonsToRemove: [
//             'zoom2d',
//             'pan2d',
//             'select2d',
//             'lasso2d',
//             'zoomIn2d',
//             'zoomOut2d',
//             'autoScale2d',
//             'hoverClosestCartesian',
//             'hoverCompareCartesian',
//             'toggleSpikelines',
//             'sendDataToCloud',
//             'toggleHover',
//           ],
//           modeBarButtonsToAdd: ['resetScale2d'],
//         }}
//         style={{ width: '100%', height }}
//       />
//     </div>
//   );
// };

// export default React.memo(SolvesOverTimeLineChart);

import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Activity, Calendar, Zap, TrendingUp } from 'lucide-react';
import Topic from './Topic';

function useWindowSize() {
  const [size, setSize] = useState<[number, number]>([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handler = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
}

interface Props {
  submissionCalendar: { [timestamp: string]: number };
}

const SolvesOverTimeLineChart: React.FC<Props> = ({ submissionCalendar }) => {
  const currentDate = new Date();
  const cur_year = new Date().getFullYear();
  const [width] = useWindowSize();
  const isMobile = width < 640;
  
  // Set default to 30 days on mobile
  const [timeRange, setTimeRange] = useState<'30' | '60' | '100'>(isMobile ? '30' : '100');
  const [activeTab, setActiveTab] = useState<'chart' | 'stats'>('chart');

  // Fixed height for both tabs
  const containerHeight = isMobile ? 500 : 550;

  // Process data with time range filter
  const filteredData = Object.entries(submissionCalendar)
    .map(([timestamp, count]) => ({
      date: new Date(Number(timestamp) * 1000),
      count
    }))
    .filter(entry => {
      const daysAgo = (currentDate.getTime() - entry.date.getTime()) / (1000 * 60 * 60 * 24);
      return daysAgo <= parseInt(timeRange);
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Calculate statistics
  const totalSolves = filteredData.reduce((sum, entry) => sum + entry.count, 0);
  const averagePerDay = filteredData.length > 0 ? (totalSolves / filteredData.length).toFixed(2) : '0';
  const maxSolves = Math.max(...filteredData.map(entry => entry.count), 0);
  const maxSolvesDate = filteredData.find(entry => entry.count === maxSolves)?.date;

  return (
    <div 
      className="relative mt-3 w-full rounded-2xl border border-gray-200 p-6 shadow-lg bg-white"
      style={{ height: `${containerHeight}px` }}
    >
      {/* Header with interactive controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Solving Activity
          </h2>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('chart')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${activeTab === 'chart' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <TrendingUp className="inline mr-1 w-4 h-4" /> Chart
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${activeTab === 'stats' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Zap className="inline mr-1 w-4 h-4" /> Insights
          </button>
        </div>
      </div>

      {/* Time range selector */}
      <div className="flex justify-center gap-2 mb-6">
        {['30', '60', '100'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range as '30' | '60' | '100')}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
              timeRange === range
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Last {range} days
          </button>
        ))}
      </div>

      <div className="h-[calc(100%-150px)]"> {/* Fixed height container */}
        {activeTab === 'chart' ? (
      <Plot
        data={[
          {
            x: filteredData.map(entry => entry.date),
            y: filteredData.map(entry => entry.count),
            type: 'scatter',
            mode: 'lines+markers',
            marker: { 
              color: '#7C3AED',
              size: 8,
              line: { width: 1, color: '#FFFFFF' }
            },
            line: { 
              color: '#8B5CF6',
              width: 3,
              shape: 'spline',
              smoothing: 1.3
            },
            name: 'Daily Solves',
            hovertemplate: '<b>%{x|%b %d}</b><br>%{y} solves<extra></extra>',
            fill: 'tozeroy',
            fillcolor: 'rgba(124, 58, 237, 0.1)'
          },
        ]}
        layout={{
          height: isMobile ? 300 : 350,
          margin: { t: 0, b: 60, l: 60, r: 30 },
          hovermode: 'x unified',
          dragmode: false, // Disable dragging
          xaxis: {
            title: { text: 'Date', font: { color: '#6B7280' } },
            tickfont: { color: '#6B7280' },
            gridcolor: '#F3F4F6',
            linecolor: '#E5E7EB',
            fixedrange: true // Disable zoom
          },
          yaxis: {
            title: { text: 'Problems Solved', font: { color: '#6B7280' } },
            tickfont: { color: '#6B7280' },
            gridcolor: '#F3F4F6',
            linecolor: '#E5E7EB',
            fixedrange: true // Disable zoom
          },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          showlegend: false,
          hoverlabel: {
            bgcolor: '#FFFFFF',
            bordercolor: '#E5E7EB',
            font: { color: '#111827' }
          }
        }}
        config={{
          responsive: true,
          displaylogo: false,
          scrollZoom: false,
          doubleClick: false,
          modeBarButtonsToRemove: [
            'zoom2d', 'pan2d', 'select2d', 'lasso2d',
            'zoomIn2d', 'zoomOut2d', 'autoScale2d',
            'hoverClosestCartesian', 'hoverCompareCartesian',
            'toggleSpikelines', 'sendDataToCloud', 'toggleHover',
            'resetScale2d'
          ],
          displayModeBar: false
        }}
        style={{ width: '100%' }}
      />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full overflow-y-auto p-2">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 h-full">
              <p className="text-sm font-medium text-indigo-700">Total Solves</p>
              <p className="text-3xl font-bold text-indigo-900">{totalSolves}</p>
              <p className="text-xs text-indigo-500">in {parseInt(timeRange)} days</p>
            </div>
            
            <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 h-full">
              <p className="text-sm font-medium text-purple-700">Daily Average</p>
              <p className="text-3xl font-bold text-purple-900">{averagePerDay}</p>
              <p className="text-xs text-purple-500">problems per day</p>
            </div>
            
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 h-full">
              <p className="text-sm font-medium text-emerald-700">Peak Day</p>
              <p className="text-3xl font-bold text-emerald-900">{maxSolves}</p>
              <p className="text-xs text-emerald-500">
                on {maxSolvesDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) || 'N/A'}
              </p>
            </div>
            
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 h-full">
              <p className="text-sm font-medium text-amber-700">Active Days</p>
              <p className="text-3xl font-bold text-amber-900">{filteredData.length}</p>
              <p className="text-xs text-amber-500">
                {((filteredData.length / parseInt(timeRange)) * 100).toFixed(1)}% consistency
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-gray-500">
          <Calendar className="inline mr-1 w-3 h-3" />
          Showing last {timeRange} days of {cur_year}
        </p>
      </div>
      
    </div>
  );
};

export default React.memo(SolvesOverTimeLineChart);