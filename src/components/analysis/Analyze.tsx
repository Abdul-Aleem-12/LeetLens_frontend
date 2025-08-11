import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Diffculty_PieChart from './difficultyPie';
import Greeting from './greet';
import Badges from './badges';
import SolvesOverTimeLineChart from './SolvesOverTime';
import Summary from './Summary';
import MostSolved from './MostSolved';
import Topic from './Topic';
import TopicDataBars from './TopicDataBars';
import type { LeetCodeData } from '../../LeetCodeData';
import Radar from './Radar';
import ContestStats from './ContestStats';
import AiSummaryPanel from './AiSummary';
import StarRatingFeedback from './StarRatingFeedback';
import Score from './Score';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Analyze = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = (location.state?.data ?? null) as LeetCodeData | null;
  const id = (location.state?.id ?? null) as string | null;

  useEffect(() => {
    if (!data) {
      navigate('/', { replace: true });
    }
  }, [data, navigate]);

  if (!data) return null;
  const difficultyStats = {
    easy: data.easySolved || 0,
    medium: data.mediumSolved || 0,
    hard: data.hardSolved || 0,
    total: data.totalSolved || 0,
  };
  console.log("again why are you here mr."+data.username);
  useEffect(() => {
    const updateDB = async (): Promise<void> => {
      if (!id || !data) return;
      try {
        await axios.post(`${backendUrl}/api/log/update`, {
          id: id,
          Real_Name: data.profile.realName,
          Total_Solved: data.totalSolved,
        });
      } catch (error) {
      }
    };

    updateDB();
  }, [id, data]);

  return(
    <div className='mt-5 mx-5'>
      <Greeting username={data.profile.realName} image={data.profile.avatar} /> 
      <div className="mt-5 items-stretch w-full">
          <Summary data={data} />
      </div>
      <div className="  flex flex-col sm:flex-row gap-3 mt-5">
        <ContestStats contestStats={data.contestStats} submissionCalendar={data.submissionCalendar} />
        < Diffculty_PieChart difficultyData={difficultyStats} />
        < Badges badges={data.badges} submissionCalendar={data.submissionCalendar} />
      </div>
      <SolvesOverTimeLineChart submissionCalendar={data.submissionCalendar} />
      <div className='flex flex-col sm:flex-row gap-3 mt-5'>
        < Topic skills={data.skills} />
        < MostSolved skills={data.skills} />
      </div>
      <TopicDataBars skills={data.skills} />
      < Radar skills={data.skills} />
      <Score skills={data.skills} /> 
      <AiSummaryPanel 
        username={data.username} 
        userData={{
          totalSolved: data.totalSolved,
          easySolved: data.easySolved,
          mediumSolved: data.mediumSolved,
          hardSolved: data.hardSolved
        }}
        id={id || ''}
      />
      <StarRatingFeedback userId={id || ''}/>
    </div>
  );
};

export default Analyze;