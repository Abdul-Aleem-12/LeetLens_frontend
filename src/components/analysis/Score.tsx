import React, { useMemo, useState, useEffect } from "react";
import { Progress, Typography, Tooltip } from "antd";
import { InfoCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";

const { Title, Text } = Typography;

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
  Beginner: {
    label: "Beginner",
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
  },
  Intermediate: {
    label: "Intermediate",
    dsTopics: ["Array", "String", "Linked List", "Stack", "Queue", "Hash Table"],
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
    explanation:
      "All beginner topics, plus recursion patterns and bit manipulation.",
    totalTopics: 15,
  },
  Advanced: {
    label: "Advanced",
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
    explanation:
      "Covers all previous plus non-linear DS like trees, graphs, and advanced patterns.",
    totalTopics: 23,
  },
} as const;

type LevelKey = keyof typeof levelDetails;

function getTopicScore(solved: number) {
  if (solved >= 20) return 10;
  if (solved >= 15) return 8;
  if (solved >= 10) return 6;
  if (solved >= 5) return 4;
  if (solved >= 1) return 2;
  return 0;
}

function getColor(score: number) {
  if (score <= 2) return "#f5222d";
  if (score <= 5) return "#fa8c16";
  if (score <= 7) return "#fadb14";
  if (score <= 9) return "#52c41a";
  return "#389e0d";
}

const Score: React.FC<ScoreProps> = ({ skills }) => {
  const [level, setLevel] = useState<LevelKey>("Beginner");

  const allSkills = useMemo(
    () => [...skills.fundamental, ...skills.intermediate, ...skills.advanced],
    [skills]
  );

  const normalize = (s: string) => s.trim().toLowerCase();

  const computePercentForLevel = (lvl: LevelKey) => {
    const { dsTopics, patternTopics, totalTopics } = levelDetails[lvl];
    let total = 0;
    [...dsTopics, ...patternTopics].forEach((topic) => {
      const skill = allSkills.find((s) => normalize(s.tagName) === normalize(topic));
      const solved = skill ? skill.problemsSolved : 0;
      total += getTopicScore(solved);
    });
    return Math.ceil((total / (totalTopics * 10)) * 100);
  };

  useEffect(() => {
    const advPercent = computePercentForLevel("Advanced");
    const intPercent = computePercentForLevel("Intermediate");

    if (advPercent >= 80) {
      setLevel("Advanced");
    } else if (intPercent >= 80) {
      setLevel("Intermediate");
    } else {
      setLevel("Beginner");
    }
  }, [/* run when skills change */ allSkills]);

  const { dsTopics, patternTopics, explanation, totalTopics } = levelDetails[level];

  const { totalMark, topicSolved } = useMemo(() => {
    const solvedMap: Record<string, number> = {};
    let total = 0;
    [...dsTopics, ...patternTopics].forEach((topic) => {
      const skill = allSkills.find((s) => normalize(s.tagName) === normalize(topic)) || null;
      const solved = skill ? skill.problemsSolved : 0;
      const score = getTopicScore(solved);
      solvedMap[topic] = solved;
      total += score;
    });
    return { totalMark: total, topicSolved: solvedMap };
  }, [dsTopics, patternTopics, allSkills]);

  const percent = Math.ceil((totalMark / (totalTopics * 10)) * 100);

  const scoreColor = percent >= 80 ? "#57e077" : percent >= 60 ? "#faad14" : "#f5222d";
  const badgeText =
    percent === 100
      ? "You are Ready"
      : percent >= 80
      ? "High Potential"
      : percent >= 60
      ? "On Track"
      : percent >= 50
      ? "Halfway there"
      : percent === 0
      ? "Best day to start is Today"
      : "Needs Work";

  return (
    <div className="bg-white rounded-2xl pt-6 min-h-[320px] text-center shadow-[0_2px_16px_rgba(90,36,249,0.06)] clash-grotesk mt-4 px-4 sm:px-6">
      <div className="mb-5  raleway-st-bold">
        <Title
          level={3}
          className="font-bold tracking-[0.5px] m-0 text-center"
        >
          <span className="inline-flex items-center gap-1">
            Interview Readiness
            <Tooltip className='font-normal text-xs' title="This score and progress is taken from the tags of LeetCode problems you have solved and it is not accurate.">
              <InfoCircleOutlined className="text-blue-900 cursor-pointer" />
            </Tooltip>
          </span>
        </Title>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,max-content))] gap-3 mt-3 justify-center">
          {(["Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
            <button
              key={lvl}
              className={`px-3 py-1 rounded-full text-sm font-medium transition flex items-center justify-center gap-1 whitespace-nowrap w-full ${
                level === lvl
                  ? "bg-blue-600 text-white border border-blue-600"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
              onClick={() => setLevel(lvl)}
              type="button"
            >
              {levelDetails[lvl].label}
              <Tooltip title={levelDetails[lvl].explanation}>
                <InfoCircleOutlined style={{ fontSize: 15, color: "#4096ff", marginLeft: 3 }} />
              </Tooltip>
            </button>
          ))}
        </div>
      </div>

      <Progress
        type="dashboard"
        percent={percent}
        strokeColor={{
          "0%": "#42e695",
          "100%": "#6a6aff",
        }}
        strokeWidth={12}
        trailColor="#ede7fe"
        size={155}
        className="mb-4"
        format={() => (
          <div>
            <span
              className="text-[38px] font-bold"
              style={{
                color: scoreColor,
                textShadow: scoreColor === "#57e077" ? "0 2px 8px #d2f5db" : undefined,
              }}
            >
              {percent}
            </span>
            <div className="text-[15px] font-medium mt-0.5 px-5" style={{ color: scoreColor }}>
              {badgeText}
            </div>
          </div>
        )}
      />

      <div className="flex gap-6 flex-wrap justify-center mt-6">
        <div className="flex-1 min-w-[220px] max-w-[500px] px-2">
          <Text strong className="text-[16px] !text-xl mb-3 block">
            {level} Level Data Structures
          </Text>

          {dsTopics.map((topic) => {
            const solved = topicSolved[topic] || 0;
            const topicScore = getTopicScore(solved);
            const color = getColor(topicScore);
            return (
              <div key={topic} className="text-left mb-3 w-full">
                <div className="flex justify-between mb-1 font-medium">
                  <span>{topic}</span>
                  {topicScore === 10 && <CheckCircleTwoTone twoToneColor="#52c41a" />}
                </div>

                <Progress percent={Math.min((solved / 20) * 100, 100)} strokeColor={color} showInfo={false} />

                <div className="text-xs text-gray-600 mt-0.5">{solved} problems solved</div>
              </div>
            );
          })}
        </div>

        <div className="flex-1 min-w-[220px] max-w-[500px] px-2">
          <Text strong className="text-[16px] !text-xl mb-3 block">
            {level} Level Patterns
          </Text>

          {patternTopics.map((topic) => {
            const solved = topicSolved[topic] || 0;
            const topicScore = getTopicScore(solved);
            const color = getColor(topicScore);
            return (
              <div key={topic} className="text-left mb-3 w-full">
                <div className="flex justify-between mb-1 font-medium">
                  <span>{topic}</span>
                  {topicScore === 10 && <CheckCircleTwoTone twoToneColor="#52c41a" />}
                </div>

                <Progress percent={Math.min((solved / 20) * 100, 100)} strokeColor={color} showInfo={false} />

                <div className="text-xs text-gray-600 mt-0.5">{solved} problems solved</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Score;
