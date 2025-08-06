import react from 'react';
import React, { useEffect, useState } from 'react';
import { Card, Progress, Tag, Typography, Space, Divider, Alert, Tooltip, Row, Col, Badge, Spin } from 'antd';
import { ThunderboltTwoTone, FireTwoTone, WarningTwoTone, StarTwoTone, BulbTwoTone } from '@ant-design/icons';
const { Title, Text, Paragraph } = Typography;


const Score = ({ score }) => {
    const scoreColor = score > 75 ? '#57e077' : score > 50 ? '#faad14' : '#f5222d';
  const badgeStatus = score > 75 ? 'success' : score > 50 ? 'warning' : 'error';
  const statusMap = {
    success: 'High Potential',
    warning: 'On Track',
    error: 'Needs Work',
  };
<div
            style={{
              background: 'linear-gradient(145deg, #ede7fe 60%, #e6faff 100%)',
              borderRadius: 16,
              padding: 24,
              minHeight: 260,
              textAlign: 'center',
              boxShadow: '0 2px 16px rgba(90,36,249,0.06)',
            }}
          >
            <Title level={4} style={{ marginBottom: 12, fontWeight: 700, letterSpacing: 0.5 }}>
              Interview Readiness
            </Title>
            <Progress
              type="dashboard"
              percent={score}
              strokeColor={{
                '0%': '#42e695',
                '100%': '#6a6aff',
              }}
              strokeWidth={12}
              trailColor="#ede7fe"
              size={155}
              style={{ marginBottom: 16 }}
              format={percent => (
                <div>
                  <span
                    style={{
                      fontSize: 40,
                      color: scoreColor,
                      fontWeight: 700,
                      textShadow: scoreColor === '#57e077' ? '0 2px 8px #d2f5db' : undefined,
                    }}
                  >
                    {percent}
                  </span>
                  <div
                    style={{
                      fontSize: 16,
                      color: scoreColor,
                      fontWeight: 500,
                      marginTop: 2,
                    }}
                  >
                    {Object.values(statusMap)[['success', 'warning', 'error'].indexOf(badgeStatus)]}
                  </div>
                </div>
              )}
            />
            <Badge
              status={badgeStatus as any}
              text={<Text style={{ fontSize: 13, color: scoreColor }}>{statusMap[badgeStatus as keyof typeof statusMap]}</Text>}
            />
          </div>
}
export default Score;