import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Diffculty_PieChart from './difficultyPie';
import Greeting from './greet';
import Badges from './badges';
import SolvesOverTimeLineChart from './SolvesOverTime';
import Summary from './Summary';
import SubmissionStats from './SubmissionStats';
import MostSolved from './MostSolved';
import Topic from './Topic';
import TopicDataBars from './TopicDataBars';
import type { LeetCodeData } from '../../LeetCodeData';
import Radar from './Radar';




const Analyze = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = (location.state?.data ?? null) as LeetCodeData | null;
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

  return (
    <div>
      <div className="grid grid-col mt-10 lg:pl-10 lg:pr-10 px-2 text-7xl justify-start raleway-st-bold">
        <Greeting username={data.profile.realName}/>
        <Summary data={data} />
        <div className='grid grid-cols-1 sm:grid-cols-2 mt-5 gap-3 mr-3'>
          <Diffculty_PieChart difficultyData={difficultyStats} />
          <Badges badges={data.badges} />
        </div>
        <SolvesOverTimeLineChart submissionCalendar={data.submissionCalendar} />
        <div  className='pt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 min-h-[400px] h-full w-full'>
          <SubmissionStats submissionCalendar={data.submissionCalendar} />
          <Topic skills={data.skills} />
        </div>
        <MostSolved skills={data.skills} />
        <TopicDataBars skills={data.skills} />
        <Radar skills={data.skills} />
      </div>
    </div>
  );
};

export default Analyze;