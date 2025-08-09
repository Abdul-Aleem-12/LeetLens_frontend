import React, { useMemo, useState } from "react";
import { Progress, Typography, Tooltip, Grid, Card, Space, Radio } from "antd";
import { InfoCircleOutlined, CheckCircleTwoTone, StarFilled } from "@ant-design/icons";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

interface Skill {
  tagName: string;
  problemsSolved: number;
}

interface ScoreProps {
  skills: {
    advanced: Skill[];
    intermediate: Skill[];
    fundamental: Skill[];
  };
}

const levelDetails = {
  beginner: {
    label: "Beginner",
    icon: <StarFilled style={{ color: "#52c41a" }} />,
    dsTopics: ["Array", "String", "Linked List", "Stack", "Queue", "Hash Table"],
    patternTopics: [
      "Matrix",
      "Sorting",
      "Sliding Window",
      "Two Pointers",
      "Binary Search",
      "Greedy",
    ],
    explanation: "Basic linear data structures and standard patterns.",
    totalTopics: 12,
    color: "#52c41a",
  },
  intermediate: {
    label: "Intermediate",
    icon: <StarFilled style={{ color: "#faad14" }} />,
    dsTopics: [
      "Array",
      "String",
      "Linked List",
      "Stack",
      "Queue",
      "Hash Table",
    ],
    patternTopics: [
      "Matrix",
      "Sorting",
      "Sliding Window",
      "Two Pointers",
      "Binary Search",
      "Greedy",
      "Bit Manipulation",
      "Backtracking",
      "Dynamic Programming",
    ],
    explanation: "All beginner topics plus advanced patterns including recursion and bit manipulation.",
    totalTopics: 15,
    color: "#faad14",
  },
  advanced: {
    label: "Advanced",
    icon: <StarFilled style={{ color: "#f5222d" }} />,
    dsTopics: [
      "Array",
      "String",
      "Linked List",
      "Stack",
      "Queue",
      "Hash Table",
      "Binary Tree",
      "Tree",
      "Graph",
      "Segment Tree",
      "Trie",
    ],
    patternTopics: [
      "Matrix",
      "Sorting",
      "Sliding Window",
      "Two Pointers",
      "Binary Search",
      "Greedy",
      "Bit Manipulation",
      "Backtracking",
      "Dynamic Programming",
      "Depth-First Search",
      "Breadth-First Search",
      "Shortest Path",
    ],
    explanation: "Covers all previous plus non-linear DS like trees, graphs, and advanced patterns.",
    totalTopics: 23,
    color: "#f5222d",
  },
} as const;

function getTopicScore(solved: number) {
  if (solved >= 20) return 10;
  if (solved >= 15) return 8;
  if (solved >= 10) return 6;
  if (solved >= 5) return 4;
  if (solved >= 1) return 2;
  return 0;
}

function getColor(score: number) {
  if (score <= 2) return "#f5222d"; // red
  if (score <= 5) return "#fa8c16"; // orange
  if (score <= 7) return "#fadb14"; // yellow
  if (score <= 9) return "#52c41a"; // good green
  return "#389e0d"; // dark green
}

const Score: React.FC<ScoreProps> = ({ skills }) => {
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const { dsTopics, patternTopics, explanation, totalTopics, color } = levelDetails[level];

  const allSkills = useMemo(
    () => [...skills.fundamental, ...skills.intermediate, ...skills.advanced],
    [skills]
  );

  const normalize = (s: string) => s.trim().toLowerCase();

  const { totalMark, topicSolved } = useMemo(() => {
    const solvedMap: Record<string, number> = {};
    let total = 0;

    [...dsTopics, ...patternTopics].forEach((topic) => {
      const skill =
        allSkills.find((s) => normalize(s.tagName) === normalize(topic)) ||
        null;
      const solved = skill ? skill.problemsSolved : 0;
      const score = getTopicScore(solved);
      solvedMap[topic] = solved;
      total += score;
    });

    return { totalMark: total, topicSolved: solvedMap };
  }, [dsTopics, patternTopics, allSkills]);

  const percent = Math.ceil((totalMark / (totalTopics * 10)) * 100);

  const scoreColor =
    percent >= 80 ? "#57e077" : percent >= 60 ? "#faad14" : "#f5222d";
  const badgeText =
    percent >= 80 ? "High Potential" : percent >= 60 ? "On Track" : "Needs Work";

  const progressSize = isMobile ? 140 : 160;

  return (
    <Card
      style={{
        borderRadius: 16,
        minHeight: 320,
        boxShadow: "0 4px 20px rgba(90,36,249,0.12)",
        background: "linear-gradient(to bottom, #f9f9ff, #ffffff)",
        border: "none",
        maxWidth: 900,
        margin: "auto",
      }}
      bodyStyle={{ padding: isMobile ? "16px 12px" : "24px 32px" }}
    >
      <Space direction="vertical" size={isMobile ? "small" : "large"} style={{ width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 8 : 20 }}>
          <Title
            level={4}
            style={{
              fontWeight: 700,
              letterSpacing: 0.5,
              margin: 0,
              color: "#2a2a72",
            }}
          >
            Interview Readiness
          </Title>
          <Text type="secondary" style={{ fontSize: isMobile ? 12 : 14 }}>
            Assess your coding interview preparation level
          </Text>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: isMobile ? 6 : 12, marginBottom: isMobile ? 12 : 24 }}>
          <Radio.Group
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            optionType="button"
            buttonStyle="solid"
            size={isMobile ? "small" : "middle"}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: isMobile ? 6 : 12,
            }}
          >
            {(["beginner", "intermediate", "advanced"] as const).map((lvl) => (
              <Radio.Button
                key={lvl}
                value={lvl}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: level === lvl ? levelDetails[lvl].color : '#f0f0f0',
                  color: level === lvl ? '#fff' : '#555',
                  borderColor: level === lvl ? levelDetails[lvl].color : '#d9d9d9',
                  fontWeight: 500,
                  minWidth: isMobile ? 90 : 110,
                  justifyContent: 'center',
                  borderRadius: 6,
                  transition: 'all 0.3s',
                }}
              >
                {levelDetails[lvl].icon}
                {levelDetails[lvl].label}
                <Tooltip title={levelDetails[lvl].explanation}>
                  <InfoCircleOutlined style={{
                    color: level === lvl ? 'rgba(255,255,255,0.8)' : '#888',
                    fontSize: isMobile ? 12 : 14
                  }} />
                </Tooltip>
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: isMobile ? 16 : 32,
          }}
        >
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <Progress
              type="dashboard"
              percent={percent}
              strokeColor={{
                "0%": "#6a6aff",
                "100%": "#42e695",
              }}
              strokeWidth={10}
              trailColor="#f0f0f0"
              size={progressSize}
              format={() => (
                <div>
                  <span
                    style={{
                      fontSize: isMobile ? 36 : 42,
                      color: scoreColor,
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {percent}
                  </span>
                  <div
                    style={{
                      fontSize: isMobile ? 14 : 16,
                      color: scoreColor,
                      fontWeight: 500,
                      marginTop: 4,
                      background: `${scoreColor}20`,
                      borderRadius: 16,
                      padding: '4px 8px',
                      userSelect: "none"
                    }}
                  >
                    {badgeText}
                  </div>
                </div>
              )}
            />
            <div style={{
              position: 'absolute',
              bottom: -10,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontSize: 12,
              color: '#888',
              userSelect: "none"
            }}>
              {totalMark}/{totalTopics * 10} points
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: isMobile ? 16 : 32,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Data Structures Column */}
          <Card
            size="small"
            style={{
              flex: 1,
              minWidth: isMobile ? "100%" : 260,
              maxWidth: 340,
              borderColor: '#e0e0ff',
              boxShadow: '0 2px 12px rgba(0,0,50,0.06)',
              borderRadius: 12,
              transition: 'box-shadow 0.3s',
            }}
            bodyStyle={{ padding: isMobile ? '12px' : '20px' }}
            hoverable
          >
            <Text strong style={{ fontSize: isMobile ? 16 : 18, marginBottom: 14, display: "block", color: '#2a2a72' }}>
              Data Structures
            </Text>
            <Space direction="vertical" size={isMobile ? 9 : 14} style={{ width: '100%' }}>
              {dsTopics.map((topic) => {
                const solved = topicSolved[topic] || 0;
                const topicScore = getTopicScore(solved);
                const barColor = getColor(topicScore);
                return (
                  <div
                    key={topic}
                    style={{
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                        fontWeight: 600,
                        fontSize: isMobile ? 15 : 16,
                        color: barColor,
                        alignItems: 'center',
                      }}
                    >
                      <span>{topic}</span>
                      {topicScore === 10 && (
                        <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: isMobile ? 18 : 20 }} />
                      )}
                    </div>
                    <Progress
                      percent={Math.min((solved / 20) * 100, 100)}
                      strokeColor={barColor}
                      showInfo={false}
                      size={isMobile ? "small" : "default"}
                      trailColor="#f5f5f5"
                      strokeWidth={isMobile ? 8 : 10}
                      style={{ borderRadius: 10 }}
                    />
                    <div style={{ fontSize: 13, color: "#666", marginTop: 4, fontWeight: 500 }}>
                      {solved} {solved === 1 ? 'problem' : 'problems'} solved
                    </div>
                  </div>
                );
              })}
            </Space>
          </Card>

          {/* Patterns Column */}
          <Card
            size="small"
            style={{
              flex: 1,
              minWidth: isMobile ? "100%" : 260,
              maxWidth: 340,
              borderColor: '#e0e0ff',
              boxShadow: '0 2px 12px rgba(0,0,50,0.06)',
              borderRadius: 12,
              transition: 'box-shadow 0.3s',
            }}
            bodyStyle={{ padding: isMobile ? '12px' : '20px' }}
            hoverable
          >
            <Text strong style={{ fontSize: isMobile ? 16 : 18, marginBottom: 14, display: "block", color: '#2a2a72' }}>
              Patterns
            </Text>
            <Space direction="vertical" size={isMobile ? 9 : 14} style={{ width: '100%' }}>
              {patternTopics.map((topic) => {
                const solved = topicSolved[topic] || 0;
                const topicScore = getTopicScore(solved);
                const barColor = getColor(topicScore);
                return (
                  <div
                    key={topic}
                    style={{
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                        fontWeight: 600,
                        fontSize: isMobile ? 15 : 16,
                        color: barColor,
                        alignItems: 'center',
                      }}
                    >
                      <span>{topic}</span>
                      {topicScore === 10 && (
                        <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: isMobile ? 18 : 20 }} />
                      )}
                    </div>
                    <Progress
                      percent={Math.min((solved / 20) * 100, 100)}
                      strokeColor={barColor}
                      showInfo={false}
                      size={isMobile ? "small" : "default"}
                      trailColor="#f5f5f5"
                      strokeWidth={isMobile ? 8 : 10}
                      style={{ borderRadius: 10 }}
                    />
                    <div style={{ fontSize: 13, color: "#666", marginTop: 4, fontWeight: 500 }}>
                      {solved} {solved === 1 ? 'problem' : 'problems'} solved
                    </div>
                  </div>
                );
              })}
            </Space>
          </Card>
        </div>
      </Space>
    </Card>
  );
};

export default Score;
