import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Diffculty_PieChart from './difficultyPie';
import Greeting from './greet';
import Badges from './badges';
import SolvesOverTimeLineChart from './SolvesOverTime';
import Summary from './Summary';
import MostSolved from './MostSolved';
import Topic from './Topic';
import TopicDataBars from './TopicDataBars';
import type { AISummary, LeetCodeData} from '../../LeetCodeData';
import Radar from './Radar';
import AiSummaryPanel from '../AiSummary';
import Score from './Score';

const Analyze = () => {
  console.log('Analyze component opened');
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.data as LeetCodeData | null;

  useEffect(() => {
    if (!userData) { // Changed this condition
      navigate('/', { replace: true });
    }
  }, [userData, navigate]);
  
  if (!userData) return null;
  
  const difficultyStats = {
    easy: userData.easySolved || 0,
    medium: userData.mediumSolved || 0,
    hard: userData.hardSolved || 0,
    total: userData.totalSolved || 0,
  };

  return (
    <div className='mt-5 mx-5'>
      <Greeting username={userData.profile.realName} />
      < Score score={10} />
      <div className="mt-5 items-stretch w-full">
          <Summary data={userData} />
      </div>
        
      {/* ContestStats - takes 20% width with height matching */}
      <div className=" sm:h-118 flex flex-col sm:flex-row gap-3 mt-5">
        <ContestStats contestStats={userData.contestStats} />
        <Diffculty_PieChart difficultyData={difficultyStats} />
        <Badges badges={userData.badges} />
      </div>
      <SolvesOverTimeLineChart submissionCalendar={userData.submissionCalendar} />
      <div className='flex flex-col sm:flex-row gap-3 mt-5'>
        <Topic skills={userData.skills} />
        <MostSolved skills={userData.skills} />
      </div>
      <TopicDataBars skills={userData.skills} />
      <Radar skills={userData.skills} />
      <div className='mt-5 w-full'>
        <AiSummaryPanel 
          username={userData.username} 
          userData={{
            totalSolved: userData.totalSolved,
            easySolved: userData.easySolved,
            mediumSolved: userData.mediumSolved,
            hardSolved: userData.hardSolved
          }} 
        />
      </div>
    </div>
  );
};

export default Analyze;