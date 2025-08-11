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
  id: string;
}

const parseSuggestions = (suggestions: string[]): ProblemSuggestion[] => {
  return suggestions.map(suggestion => {
    const match =
      suggestion.match(/\[(\d+)\]\[(\w+)\] (.+?) \(leetcode\.com\/problems\/(.+?)\)/i) ||
      suggestion.match(/\[(\d+)\] (.+?) \(leetcode\.com\/problems\/(.+?)\)/i);

    if (match) {
      let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';
      if (match[2]) {
        const diff = match[2].toLowerCase();
        if (diff === 'easy') difficulty = 'Easy';
        if (diff === 'medium') difficulty = 'Medium';
        if (diff === 'hard') difficulty = 'Hard';
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
  const weaknesses: string[] = [];
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

const AiSummaryPanel: React.FC<AISummaryPanelProps> = ({ username, userData, id }) => {
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasTriggered, setHasTriggered] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleUserReachedBottom = async () => {
    if (hasTriggered) return; 
    setHasTriggered(true);
    try {
      await axios.post(`${backendUrl}/api/log/scroll`, {
        id: id,
        fully_scrolled: true,
      });
    } catch (err) {
      console.error("Failed to send scroll event", err);
      setHasTriggered(false); 
    }
  };

  useEffect(() => {
    const fetchAiSummary = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/summary/${username}`);
        setAiSummary(response.data);
      } catch {}
      finally { setLoading(false); }
    };
    fetchAiSummary();
  }, [username]);

  if (loading) {
    return <div className="flex justify-center py-10"><Spin size="large" /></div>;
  }

  const summaryData = aiSummary || (userData ? {
    summary: getDefaultSummary(userData.totalSolved),
    weaknesses: getDefaultWeaknesses(userData.easySolved, userData.mediumSolved, userData.hardSolved),
    suggestions: getDefaultSuggestions(userData.totalSolved),
    score: Math.min(100, Math.floor(userData.totalSolved / 2))
  } : null);

  if (!summaryData) {
    return <Alert message="No user data available" type="warning" showIcon />;
  }

  const suggestions = parseSuggestions(summaryData.suggestions);

  return (
    <div className="w-full rounded-2xl clash-grotesk my-4"
    onMouseEnter={handleUserReachedBottom}
    onTouchStart={handleUserReachedBottom}>
      <Card
        className="w-full rounded-2xl shadow-md"
        styles={{ body: { background: 'rgba(255,255,255,0.97)' } }}
        title={
          <Space>
            <BulbTwoTone twoToneColor="#1252ba" style={{ fontSize: '1.75rem' }} />
            <span style={{ fontSize: '1.55rem', fontWeight: 800, color: '#1e1e1e' }}>
              {aiSummary ? 'AI-Powered Profile Analysis' : 'Profile Analysis'}
            </span>
          </Space>
        }
      >
        <Row gutter={[16, 20]}>
          <Col xs={24} lg={15}>
            <div className="bg-blue-50/90 rounded-lg p-4 mb-5">
              <Divider orientation="left" plain>
                <Space>
                  <ThunderboltTwoTone twoToneColor="#25439d" style={{ fontSize: '1.4rem' }} />
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1b2a6b' }}>Performance Summary</span>
                </Space>
              </Divider>
              <Paragraph style={{ fontSize: '1.11rem', lineHeight: 1.6, color: '#222' }}>
                {summaryData.summary}
                {!aiSummary && (
                  <Text
                    type="secondary"
                    className="block mt-2"
                    style={{ color: '#25439d', fontSize: '1rem' }}
                  >
                    (Default analysis based on problem statistics)
                  </Text>
                )}
              </Paragraph>
            </div>
            <div className="bg-red-50/90 rounded-lg p-4">
              <Divider orientation="left" plain>
                <Space>
                  <WarningTwoTone twoToneColor="#b71c1c" style={{ fontSize: '1.4rem' }} />
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#b71c1c' }}>Key Areas for Improvement</span>
                </Space>
              </Divider>
              <Space direction="vertical" className="w-full" size={10}>
                {summaryData.weaknesses.map((weakness, i) => (
                  <Card
                    key={i}
                    size="small"
                    variant="borderless"
                    className="w-full rounded-md border-l-4 border-red-600 bg-gradient-to-r from-red-50 to-red-100"
                    styles={{ body: { padding: 10 } }}
                  >
                    <Space>
                      <StarTwoTone twoToneColor="#b71c1c" style={{ fontSize: '1.08rem' }} />
                      <span style={{ fontSize: '1.1rem', color: '#b71c1c' }}>{weakness}</span>
                    </Space>
                  </Card>
                ))}
              </Space>
            </div>
          </Col>
          <Col xs={24} lg={9}>
            <div className="bg-blue-50/95 rounded-lg p-4 h-full">
              <Divider orientation="left" plain>
                <Space>
                  <FireTwoTone twoToneColor="#254264" style={{ fontSize: '1.4rem' }} />
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#183153' }}>Recommended Problems</span>
                </Space>
              </Divider>
              <Space direction="vertical" size={10} className="w-full">
                {suggestions.map((item, index) => (
                  <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                    <Card
                      hoverable
                      className="w-full rounded-lg bg-gradient-to-r from-blue-50 to-blue-100"
                      styles={{ body: { padding: 12 } }}
                    >
                      <div className="mb-1">
                        <Tag color="blue" style={{ fontSize: '1rem' }}>#{item.number}</Tag>
                        <span style={{ fontSize: '1.13rem', fontWeight: 600 }}>{item.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Tag
                          color={
                            item.difficulty === "Easy" ? "green" :
                            item.difficulty === "Medium" ? "orange" : "red"
                          }
                          style={{ fontSize: '0.95rem', fontWeight: 600 }}
                        >
                          {item.difficulty}
                        </Tag>
                        <span style={{ fontSize: '0.95rem', color: '#25439d' }}>View Problem →</span>
                      </div>
                    </Card>
                  </a>
                ))}
              </Space>
            </div>
          </Col>
        </Row>
        <Divider className="my-4" />
        <Text type="secondary" style={{ fontSize: '0.92rem', textAlign: 'center', display: 'block' }}>
          Generated on {new Date().toLocaleString()} |{' '}
          <span style={{ fontWeight: 600, color: '#25439d' }}>
            {aiSummary ? 'AI-generated summary ✔' : 'Default analysis'}
          </span>{' '}
          <Tooltip title="This analysis is generated based on your LeetCode statistics and AI predictions.">
            ℹ️
          </Tooltip>
        </Text>
      </Card>
    </div>
  );
};

export default AiSummaryPanel;