import React, { useEffect, useState } from 'react';
import { Card, Tag, Typography, Space, Divider, Alert, Tooltip, Row, Col, Spin } from 'antd';
import { ThunderboltTwoTone, FireTwoTone, WarningTwoTone, StarTwoTone, BulbTwoTone } from '@ant-design/icons';
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

// ---- COLOR / STYLE CONSTANTS -----
const PRIMARY_GRADIENT = "linear-gradient(0,0,0,0)"; //135deg, #f5f7fa 0%, #c3cfe2 100%
const MAIN_CARD_GRADIENT = "linear-gradient(125deg,#eef2f6 40%, #f5f7fa 100%)";
const SECTION_BG = "rgba(240, 244, 250, 0.90)"; //
const WEAK_BG = "rgba(255, 245, 246, 0.90)";
const PROBLEM_BG = "rgba(245, 248, 255, 0.95)";
const SHADOW = "0 6px 32px 0 rgba(34, 63, 123, 0.15), 0 2px 8px rgba(0,0,0,0.05)";
const MAIN_FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI','Roboto',sans-serif";
// ---- HELPERS -----
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

// ---- COMPONENT START -----
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
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
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
      <Alert
        message="No user data available"
        description="Cannot generate summary without user statistics."
        type="warning"
        showIcon
        style={{ margin: '20px' }}
      />
    );
  }

  const suggestions = parseSuggestions(summaryData.suggestions);

  return (
    <div className='rounded-2xl' style={{
      width: '100%',
      minHeight: '100vh',
      padding: '32px 8px 40px 8px',
      background: PRIMARY_GRADIENT,
      fontFamily: MAIN_FONT,
      backgroundAttachment: "fixed"
    }}>
      <Card
        title={
          <Space>
            <BulbTwoTone twoToneColor="#1252ba" style={{ fontSize: 34, filter: "drop-shadow(0 2px 10px #9ebaee55)" }} />
            <span style={{
              fontWeight: 800,
              fontSize: 24,
              letterSpacing: 2,
              color: "#254268",
              textShadow: "0 1px 0 #dde3ee"
            }} className='raleway-st' >
              {aiSummary ? 'AI-Powered Profile Analysis' : 'Profile Analysis'}
            </span>
          </Space>
        }
        headStyle={{
          borderBottom: 'none',
          background: "linear-gradient(90deg, #e8eefa 60%, #dde7f5 100%)",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          minHeight: 60,
          paddingLeft: 40
        }}
        bodyStyle={{
          padding: '40px 38px 34px 38px',
          background: "rgba(255,255,255,0.97)",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          boxShadow: SHADOW
        }}
        style={{
          borderRadius: 30,
          boxShadow: '0 12px 44px rgba(34, 63, 123, 0.10), 0 2.5px 8px #e3eaf4',
          border: 'none',
          //margin: '0 auto',
          width: '100%',
          maxWidth: '100%',
          background: MAIN_CARD_GRADIENT,
          backdropFilter: "blur(2px)"
        }}
      >
        <Row gutter={[32, 28]}>
          {/* LEFT COLUMN */}
          <Col xs={24} lg={15}>
            {/* Summary */}
            <div
              style={{
                background: SECTION_BG,
                borderRadius: 20,
                padding: '28px 28px 18px 28px',
                marginBottom: 28,
                boxShadow: '0 2px 22px -12px #7a8cbf18, 0 1px 12px #fffbe622',
                border: "1.5px solid #ecf0f5",
                backdropFilter: "blur(3px)"
              }}
            >
              <Divider orientation="left" plain style={{
                fontWeight: 800, fontSize: 17, marginBottom: 12,
                color: "#264173"
              }}>
                <Space>
                  <ThunderboltTwoTone twoToneColor="#25439d" />
                  <Text strong style={{ fontSize: 20, color: "#234" }}>Performance Summary</Text>
                </Space>
              </Divider>
              <Paragraph style={{
                fontSize: 18,
                color: '#1f283d',
                lineHeight: 1.8,
                letterSpacing: 0.1,
                textShadow: "0px 1.5px 6px #f7fafd"
              }}>
                {summaryData.summary}
                {!aiSummary && (
                  <Text type="secondary" style={{
                    display: 'block', marginTop: 12,
                    color: "#607292"
                  }}>
                    (Default analysis based on problem statistics)
                  </Text>
                )}
              </Paragraph>
            </div>

            {/* Key Areas (Weaknesses) */}
            <div
              style={{
                background: WEAK_BG,
                borderRadius: 20,
                padding: '24px 20px 12px 20px',
                marginTop: 0,
                boxShadow: '0 3px 18px -8px #f6374735, 0 1px 8px #dbe2fa33',
                border: "1.5px solid #fad5db"
              }}
            >
              <Divider orientation="left" plain style={{ fontSize: 17, fontWeight: 800, color: "#b71c1c" }}>
                <Space>
                  <WarningTwoTone twoToneColor="#b71c1c" />
                  <Text strong style={{ fontSize: 20, color: "#b71c1c" }}>Key Areas for Improvement</Text>
                </Space>
              </Divider>
              <Space direction="vertical" style={{ width: '100%' }} size={16}>
                {summaryData.weaknesses.map((weakness, i) => (
                  <Card
                    key={i}
                    size="small"
                    bordered={false}
                    style={{
                      borderRadius: 14,
                      boxShadow: '0 2px 14px #f4747435, 0 1.5px 4px #fee0ee',
                      borderLeft: '5px solid #b71c1c',
                      background: 'linear-gradient(120deg, #fff5f5 0%, #fbe8e8 90%)',
                      width: '100%',
                      marginBottom: 6
                    }}
                    bodyStyle={{ padding: 10 }}
                  >
                    <Space>
                      <StarTwoTone twoToneColor="#b71c1c" />
                      <Text style={{ fontWeight: 600, color: "#b71c1c" }}>{weakness}</Text>
                    </Space>
                  </Card>
                ))}
              </Space>
            </div>
          </Col>

          {/* RIGHT COLUMN - Recommendations */}
          <Col xs={24} lg={9}>
            <div
              style={{
                background: PROBLEM_BG,
                borderRadius: 20,
                padding: '24px 20px 20px 20px',
                height: '100%',
                minHeight: 420,
                boxShadow: '0 3px 24px -10px #8eb7f786, 0 1.5px 8px #b4d4ff77',
                border: "1.5px solid #d3e8fb"
              }}
            >
              <Divider orientation="left" plain style={{ fontSize: 16, fontWeight: 800, color: "#40557f" }}>
                <Space>
                  <FireTwoTone twoToneColor="#254264" />
                  <Text strong style={{ fontSize: 20, color: "#2c3f60" }}>Recommended Problems</Text>
                </Space>
              </Divider>
              {suggestions.length > 0 ? (
                <Space direction="vertical" style={{ width: '100%' }} size={10}>
                  {suggestions.map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        hoverable
                        style={{
                          width: "100%",
                          borderRadius: 14,
                          background: "linear-gradient(124deg,#f8fbff 0%, #eaf2fb 100%)",
                          boxShadow: "0 2px 16px #bfcce366, 0 1.5px 4px #d9eefe",
                          marginBottom: 6,
                          border: "1px solid #e6edf4"
                        }}
                        bodyStyle={{ padding: 14, minHeight: 44 }}
                      >
                        <div style={{ marginBottom: 6 }}>
                          <Tag
                            color="blue"
                            style={{
                              fontSize: 15,
                              fontWeight: 700,
                              padding: "3px 9px",
                              borderRadius: 9,
                              background: "linear-gradient(90deg,#e7f1ff 30%, #ebf5fc 100%)",
                              color: "#2253a4"
                            }}
                          >
                            #{item.number}
                          </Tag>
                          <Text strong style={{ display: 'block', color: "#2b353d", fontWeight: 600 }}>
                            {item.name}
                          </Text>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Tag
                            color={
                              item.difficulty === "Easy" ? "#eafaf1" :
                                item.difficulty === "Medium" ? "#fff9e5" : "#fbe9e9"
                            }
                            style={{
                              color: item.difficulty === "Easy" ? "#357757" :
                                item.difficulty === "Medium" ? "#97802d" : "#ae2828",
                              fontWeight: 700,
                              fontSize: 12,
                              borderRadius: 8,
                            }}
                          >
                            {item.difficulty}
                          </Tag>
                          <Text type="secondary" style={{ fontSize: 12, color: "#365185", fontWeight: 600, letterSpacing: 1 }}>
                            View Problem →
                          </Text>
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
                  style={{ borderRadius: 12, background: "#ecf7fa" }}
                />
              )}
            </div>
          </Col>
        </Row>

        <Divider style={{ margin: '30px 0 22px', borderColor: '#e2e4ea' }} />

        <Text
          type="secondary"
          style={{
            fontSize: 13.5,
            textAlign: 'center',
            display: 'block',
            color: '#6a7ba0',
            letterSpacing: 1.1,
            opacity: 0.85
          }}
        >
          <Tooltip title={aiSummary ?
            "Analysis is based on your recent coding patterns and AI inference." :
            "Default analysis based on your problem statistics."
          }>
            <span>
              Generated on {new Date().toLocaleString()} &nbsp;|&nbsp;
              <span style={{
                color: '#1d4370',
                fontWeight: 700
              }}>
                {aiSummary ? 'AI-generated summary ✔' : 'Default analysis'}
              </span>
            </span>
          </Tooltip>
        </Text>
      </Card>
    </div>
  );
};

export default AiSummaryPanel;
