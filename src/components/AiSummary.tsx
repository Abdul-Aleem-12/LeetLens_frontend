// AiSummaryPanel.tsx

import React, { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  Space,
  Divider,
  Alert,
  Tooltip,
  Row,
  Col,
  Spin,
  Tag
} from 'antd';
import {
  ThunderboltTwoTone,
  FireTwoTone,
  WarningTwoTone,
  StarTwoTone,
  BulbTwoTone
} from '@ant-design/icons';
import axios from 'axios';

const { Text, Paragraph } = Typography;

interface ProblemSuggestion {
  name: string;
  number: number;
  url: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface AISummary {
  summary: string;
  weaknesses: string[];
  score: number;
  suggestions: string[];
}

interface AISummaryPanelProps {
  username: string;
  userData?: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
  };
}

const parseSuggestions = (suggestions: string[]): ProblemSuggestion[] => {
  return suggestions.map(suggestion => {
    const match = suggestion.match(/\[(\d+)\]\[(\w+)\] (.+?) \(leetcode\.com\/problems\/(.+?)\)/i) ||
      suggestion.match(/\[(\d+)\] (.+?) \(leetcode\.com\/problems\/(.+?)\)/i);

    if (match) {
      let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';
      if (match[2]) {
        const lowerCaseDiff = match[2].toLowerCase();
        if (lowerCaseDiff === 'easy') difficulty = 'Easy';
        if (lowerCaseDiff === 'medium') difficulty = 'Medium';
        if (lowerCaseDiff === 'hard') difficulty = 'Hard';
      }
      return {
        number: parseInt(match[1]),
        name: match[3] || match[2],
        url: `https://leetcode.com/problems/${match[4] || match[3]}/`,
        difficulty
      };
    }
    return {
      number: 0,
      name: suggestion,
      url: '#',
      difficulty: 'Medium'
    };
  });
};

const getDefaultSuggestions = (totalSolved: number): string[] => {
  if (totalSolved < 50) {
    return [
      "[1][Easy] Two Sum (leetcode.com/problems/two-sum)",
      "[20][Easy] Valid Parentheses (leetcode.com/problems/valid-parentheses)",
      "[217][Easy] Contains Duplicate (leetcode.com/problems/contains-duplicate)",
      "[53][Medium] Maximum Subarray (leetcode.com/problems/maximum-subarray)",
      "[121][Easy] Best Time to Buy and Sell Stock (leetcode.com/problems/best-time-to-buy-and-sell-stock)"
    ];
  } else if (totalSolved < 150) {
    return [
      "[53][Medium] Maximum Subarray (leetcode.com/problems/maximum-subarray)",
      "[98][Medium] Validate Binary Search Tree (leetcode.com/problems/validate-binary-search-tree)",
      "[200][Medium] Number of Islands (leetcode.com/problems/number-of-islands)",
      "[322][Medium] Coin Change (leetcode.com/problems/coin-change)",
      "[207][Medium] Course Schedule (leetcode.com/problems/course-schedule)"
    ];
  } else {
    return [
      "[3][Medium] Longest Substring Without Repeating Characters (leetcode.com/problems/longest-substring-without-repeating-characters)",
      "[5][Medium] Longest Palindromic Substring (leetcode.com/problems/longest-palindromic-substring)",
      "[10][Hard] Regular Expression Matching (leetcode.com/problems/regular-expression-matching)",
      "[23][Hard] Merge k Sorted Lists (leetcode.com/problems/merge-k-sorted-lists)",
      "[42][Hard] Trapping Rain Water (leetcode.com/problems/trapping-rain-water)"
    ];
  }
};

const getDefaultSummary = (totalSolved: number): string => {
  if (totalSolved < 50) {
    return "This profile shows early-stage problem solving skills with more focus on easy problems. To improve, try tackling more medium difficulty problems to build stronger algorithmic thinking. Consider establishing a consistent practice routine and learning fundamental data structures.";
  } else if (totalSolved < 150) {
    return "This profile demonstrates intermediate problem solving abilities with a good mix of easy and medium problems. The next step would be to attempt more hard problems to prepare for technical interviews. Focus on mastering common patterns like DFS, BFS, and dynamic programming.";
  } else {
    return "This is an advanced profile with substantial problem solving experience across all difficulty levels. The user should focus on mastering system design and less common algorithm patterns. Consider practicing under time constraints to simulate interview conditions.";
  }
};

const getDefaultWeaknesses = (easy: number, medium: number, hard: number): string[] => {
  const weaknesses = [];
  const mediumRatio = medium / (easy + medium + hard);
  const hardRatio = hard / (easy + medium + hard);

  if (mediumRatio < 0.3) weaknesses.push("Needs more practice with medium difficulty problems");
  if (hardRatio < 0.1) weaknesses.push("Should attempt more hard problems to prepare for interviews");
  if (easy / medium > 2) weaknesses.push("Focus on transitioning from easy to medium problems");

  while (weaknesses.length < 5) {
    weaknesses.push(
      "Could benefit from exploring more advanced data structures",
      "Practice optimizing time and space complexity",
      "Try more problems with dynamic programming",
      "Work on graph traversal algorithms",
      "Improve understanding of recursion and backtracking"
    );
  }

  return weaknesses.slice(0, 5);
};

const AiSummaryPanel: React.FC<AISummaryPanelProps> = ({ username, userData }) => {
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAiSummary = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/summary/${username}`);
        setAiSummary(response.data);
      } catch (err) {
        setError('Failed to load AI summary');
        console.error('Error fetching AI summary:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAiSummary();
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spin size="large" />
      </div>
    );
  }

  const summaryData = aiSummary || (userData ? {
    summary: getDefaultSummary(userData.totalSolved),
    weaknesses: getDefaultWeaknesses(userData.easySolved, userData.mediumSolved, userData.hardSolved),
    suggestions: getDefaultSuggestions(userData.totalSolved),
    score: Math.min(100, Math.floor(userData.totalSolved / 2))
  } : null);

  if (!summaryData) {
    return (
      <div className="m-1 sm:m-5">
        <Alert
          message="No user data available at the moment try reloading the page."
          description="Cannot generate summary without user statistics."
          type="warning"
          showIcon
        />
      </div>
    );
  }

  const suggestions = parseSuggestions(summaryData.suggestions);

  return (
     <div className="w-full rounded-2xl overflow-hidden min-h-screen mt-5 clash-grotesk">
      <Card
        className="w-full rounded-2xl shadow-md border-none"
        styles={{
          header: {
            background: 'linear-gradient(90deg, #e8eefa 60%, #dde7f5 100%)',
            minHeight: '48px',
            paddingRight: '10px',
            overflowWrap: 'break-word',
            borderBottom: 'none',
            fontWeight: 'bold',
          },
          body: {
            //padding: '20px',
            background: 'rgba(255,255,255,0.97)',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px'
          }
        }}
        title={
          <Space className="flex flex-wrap items-center">
            <BulbTwoTone twoToneColor="#1252ba" className="text-xl" />
            <span className="text-lg sm:text-xl font-extrabold text-indigo-900">
              {aiSummary ? 'AI-Powered Profile Analysis' : 'Profile Analysis'}
            </span>
          </Space>
        }
      >
        <Row gutter={[16, 20]}>
          <Col xs={24} lg={15}>
            <div className="bg-blue-50/90 rounded-lg p-3 sm:p-6 mb-5">
              <Divider orientation="left" plain className="text-base font-bold text-blue-900">
                <Space>
                  <ThunderboltTwoTone twoToneColor="#25439d" />
                  <Text className='font-bold text-3xl'>Performance Summary</Text>
                </Space>
              </Divider>
              <Paragraph className="text-sm sm:text-base text-gray-800">
                {summaryData.summary}
                {!aiSummary && (
                  <Text type="secondary" className="block mt-2 text-blue-700">
                    (Default analysis based on problem statistics)
                  </Text>
                )}
              </Paragraph>
            </div>

            <div className="bg-red-50/90 rounded-lg p-3 sm:p-5">
              <Divider orientation="left" plain className="text-base font-bold text-red-700">
                <Space>
                  <WarningTwoTone twoToneColor="#b71c1c" />
                  <Text className='font-bold text-3xl'>Key Areas for Improvement</Text>
                </Space>
              </Divider>
              <Space direction="vertical" className="w-full" size={12}>
                {summaryData.weaknesses.map((weakness, i) => (
                  <Card
                    key={i}
                    size="small"
                    bordered={false}
                    className="w-full rounded-md border-l-4 border-red-600 bg-gradient-to-r from-red-50 to-red-100"
                    bodyStyle={{ padding: 10 }}
                  >
                    <Space>
                      <StarTwoTone twoToneColor="#b71c1c" />
                      <Text className="text-red-700">{weakness}</Text>
                    </Space>
                  </Card>
                ))}
              </Space>
            </div>
          </Col>

          <Col xs={24} lg={9}>
            <div className="bg-blue-50/95 rounded-lg p-3 sm:p-5 h-full">
              <Divider orientation="left" plain className="text-base font-bold text-blue-800">
                <Space>
                  <FireTwoTone twoToneColor="#254264" />
                  <Text className='font-bold text-3xl'>Recommended Problems</Text>
                </Space>
              </Divider>
              {suggestions.length > 0 ? (
                <Space direction="vertical" className="w-full" size={10}>
                  {suggestions.map((item, index) => (
                    <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                      <Card
                        hoverable
                        className="w-full rounded-lg bg-gradient-to-r from-blue-50 to-blue-100"
                        bodyStyle={{ padding: 14 }}
                      >
                        <div className="mb-1">
                          <Tag color="blue" className="text-xs px-2 py-1 font-semibold rounded-md">
                            #{item.number}
                          </Tag>
                          <Text strong className="block text-gray-800 text-sm">{item.name}</Text>
                        </div>
                        <div className="flex justify-between items-center">
                          <Tag
                            color={
                              item.difficulty === "Easy" ? "green" :
                                item.difficulty === "Medium" ? "orange" : "red"
                            }
                            className="text-xs font-bold rounded-md"
                          >
                            {item.difficulty}
                          </Tag>
                          <Text type="secondary" className="text-xs font-medium">View Problem →</Text>
                        </div>
                      </Card>
                    </a>
                  ))}
                </Space>
              ) : (
                <Alert
                  message="No recommendations available"
                  type="info"
                  showIcon
                  className="rounded-lg bg-blue-50"
                />
              )}
            </div>
          </Col>
        </Row>

        <Divider className="my-4" />

        <Text type="secondary" className="text-xs block text-center">
          <Tooltip title={aiSummary ? "Analysis is based on your recent coding patterns and AI inference." : "Default analysis based on your problem statistics."}>
            Generated on {new Date().toLocaleString()} | <span className="text-blue-900 font-bold">{aiSummary ? 'AI-generated summary ✔' : 'Default analysis'}</span>
          </Tooltip>
        </Text>
      </Card>
    </div>
  );
};

export default AiSummaryPanel;