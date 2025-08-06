
//                  working on this now 


// import React, { useMemo, useState } from 'react';
// import { Progress, Typography, Badge } from 'antd';
// const { Title, Text } = Typography;

// interface ScoreProps {
//   skills: {
//     advanced:skill[];
//     intermediate:skill[];
//     fundamental:skill[];
//   }
// }
// interface skill {
//   tagName: string;
//   problemsSolved: number;
// }

// const Score: React.FC<ScoreProps> = ({ skills }) => {
//   const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

//   const levelConfigs = {
//     beginner: {
//       dsTopics: ['Array', 'String', 'Linked List', 'Stack', 'Queue'],
//       patternTopics: ['Sliding Window', 'Two Pointers', 'Binary Search'],
//     },
//     intermediate: {
//       dsTopics: ['Array', 'String', 'Linked List', 'Stack', 'Queue', 'Recursion', 'Backtracking', 'DP'],
//       patternTopics: ['Sliding Window', 'Two Pointers', 'Binary Search', 'DFS', 'Greedy'],
//     },
//     advanced: {
//       dsTopics: ['Array', 'String', 'Linked List', 'Stack', 'Queue', 'Recursion', 'Backtracking', 'DP', 'Trie', 'Union Find', 'Graph', 'Tree'],
//       patternTopics: ['Sliding Window', 'Two Pointers', 'Binary Search', 'DFS', 'Greedy', 'Topological Sort', 'Bit Manipulation'],
//     },
//   };

//   const computeScore = (dsTopics: string[], patternTopics: string[]) => {
//     const findScore = (topics: string[]) => {
//       let total = 0;
//       let count = 0;

//       for (const topic of topics) {
//         const match = skills.find((s) => s.topic.toLowerCase() === topic.toLowerCase());
//         if (match) {
//           total += match.score;
//           count++;
//         }
//       }

//       return count === 0 ? 0 : total / count;
//     };

//     const dsScore = findScore(dsTopics);
//     const patternScore = findScore(patternTopics);
//     const finalScore = (dsScore + 2 * patternScore) / 3;

//     return {
//       dsScore: Math.round(dsScore),
//       patternScore: Math.round(patternScore),
//       finalScore: Math.round(finalScore),
//     };
//   };

//   const { dsScore, patternScore, finalScore } = useMemo(() => {
//     const config = levelConfigs[level];
//     return computeScore(config.dsTopics, config.patternTopics);
//   }, [level, skills]);

//   const scoreColor = finalScore > 75 ? '#57e077' : finalScore > 50 ? '#faad14' : '#f5222d';
//   const badgeStatus = finalScore > 75 ? 'success' : finalScore > 50 ? 'warning' : 'error';
//   const statusMap = {
//     success: 'High Potential',
//     warning: 'On Track',
//     error: 'Needs Work',
//   };

//   return (
//     <div
//       style={{
//         background: 'white',
//         borderRadius: 16,
//         padding: 24,
//         minHeight: 320,
//         textAlign: 'center',
//         boxShadow: '0 2px 16px rgba(90,36,249,0.06)',
//       }}
//     >
//       <div className="flex justify-between items-center mb-4">
//         <Title level={4} style={{ fontWeight: 700, letterSpacing: 0.5 }}>
//           Interview Readiness
//         </Title>

//         <div style={{ display: 'flex', gap: 8 }}>
//           {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
//             <button
//               key={lvl}
//               onClick={() => setLevel(lvl)}
//               className={`px-3 py-1 rounded-full text-sm font-medium transition ${
//                 level === lvl
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
//               }`}
//             >
//               {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       <Progress
//         type="dashboard"
//         percent={finalScore}
//         strokeColor={{
//           '0%': '#42e695',
//           '100%': '#6a6aff',
//         }}
//         strokeWidth={12}
//         trailColor="#ede7fe"
//         size={155}
//         style={{ marginBottom: 16 }}
//         format={(percent) => (
//           <div>
//             <span
//               style={{
//                 fontSize: 40,
//                 color: scoreColor,
//                 fontWeight: 700,
//                 textShadow: scoreColor === '#57e077' ? '0 2px 8px #d2f5db' : undefined,
//               }}
//             >
//               {percent}
//             </span>
//             <div
//               style={{
//                 fontSize: 16,
//                 color: scoreColor,
//                 fontWeight: 500,
//                 marginTop: 2,
//               }}
//             >
//               {statusMap[badgeStatus as keyof typeof statusMap]}
//             </div>
//           </div>
//         )}
//       />

//       <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 24 }}>
//         <div>
//           <Text type="secondary">DS Score</Text>
//           <div style={{ fontSize: 18, fontWeight: 'bold' }}>{dsScore} / 100</div>
//         </div>
//         <div>
//           <Text type="secondary">Pattern Score</Text>
//           <div style={{ fontSize: 18, fontWeight: 'bold' }}>{patternScore} / 100</div>
//         </div>
//       </div>

//       <div style={{ marginTop: 24 }}>
//         <Badge
//           status={badgeStatus as any}
//           text={<Text style={{ fontSize: 13, color: scoreColor }}>{statusMap[badgeStatus as keyof typeof statusMap]}</Text>}
//         />
//       </div>
//     </div>
//   );
// };

// export default Score;












// //                 old score card
// // import react from 'react';
// // import React, { useEffect, useState } from 'react';
// // import { Card, Progress, Tag, Typography, Space, Divider, Alert, Tooltip, Row, Col, Badge, Spin } from 'antd';
// // import { ThunderboltTwoTone, FireTwoTone, WarningTwoTone, StarTwoTone, BulbTwoTone } from '@ant-design/icons';
// // const { Title, Text, Paragraph } = Typography;


// // interface ScoreProps {
// //   skills: {
// //     advanced:skill[];
// //     intermediate:skill[];
// //     fundamental:skill[];
// //   }
// // }
// // interface skill {
// //   tagName: string;
// //   problemsSolved: number;
// // }

// // const Score: React.FC<ScoreProps> = (skills ) => {
// //   const score = 0;
// //   const dataStructureScore = 0;
// //   const patternScore = 0;


// //   const scoreColor = score > 75 ? '#57e077' : score > 50 ? '#faad14' : '#f5222d';
// //   const badgeStatus = score > 75 ? 'success' : score > 50 ? 'warning' : 'error';
// //   const statusMap = {
// //     success: 'High Potential',
// //     warning: 'On Track',
// //     error: 'Needs Work',
// //   };

// //   return (
// //     <div
// //       style={{
// //         background: 'white',
// //         borderRadius: 16,
// //         padding: 24,
// //         minHeight: 260,
// //         textAlign: 'center',
// //         boxShadow: '0 2px 16px rgba(90,36,249,0.06)',
// //       }}
// //     >
// //       <Title level={4} style={{ marginBottom: 12, fontWeight: 700, letterSpacing: 0.5 }}>
// //         Interview Readiness
// //       </Title>
// //       <Progress
// //         type="dashboard"
// //         percent={score}
// //         strokeColor={{
// //           '0%': '#42e695',
// //           '100%': '#6a6aff',
// //         }}
// //         strokeWidth={12}
// //         trailColor="#ede7fe"
// //         size={155}
// //         style={{ marginBottom: 16 }}
// //         format={(percent) => (
// //           <div>
// //             <span
// //               style={{
// //                 fontSize: 40,
// //                 color: scoreColor,
// //                 fontWeight: 700,
// //                 textShadow: scoreColor === '#57e077' ? '0 2px 8px #d2f5db' : undefined,
// //               }}
// //             >
// //               {percent}
// //             </span>
// //             <div
// //               style={{
// //                 fontSize: 16,
// //                 color: scoreColor,
// //                 fontWeight: 500,
// //                 marginTop: 2,
// //               }}
// //             >
// //               {Object.values(statusMap)[['success', 'warning', 'error'].indexOf(badgeStatus)]}
// //             </div>
// //           </div>
// //         )}
// //       />
// //       <Badge
// //         status={badgeStatus as any}
// //         text={<Text style={{ fontSize: 13, color: scoreColor }}>{statusMap[badgeStatus as keyof typeof statusMap]}</Text>}
// //       />
// //     </div>
// //   );
// // };
// // export default Score;