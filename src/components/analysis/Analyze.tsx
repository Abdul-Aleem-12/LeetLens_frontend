import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Diffculty_PieChart from './difficultyPie';
import Greeting from './greet';
import Badges from './badges';
import Summary from './Summary';
import type { LeetCodeData } from '../../LeetCodeData';


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
      <div className="grid grid-col mt-10 lg:pl-10 px-2 text-7xl justify-start raleway-st-bold">
        <Greeting username={data.profile.realName}/>
        <Summary data={data} />
        <div className='flex flex-row xl:flex-col mt-10 gap-3 ml-3 mr-3'>
          <Diffculty_PieChart difficultyData={difficultyStats} />
          
        </div>
        <Badges badges={data.badges} />
      </div>
    </div>
  );
};

export default Analyze;