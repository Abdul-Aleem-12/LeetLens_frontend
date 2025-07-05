import type { Badge } from '../../LeetCodeData';
import BadgeCard from './badgeCard';

type BadgesProps = {
    badges: Badge[];
  };
  //
const Badges = ({ badges }:BadgesProps) => {
  return (
    <>
    <div className="justify-items-start text-3xl text-white font-bold mb-4">
      <h1>Badges</h1>
      <h3>Total Badges Earned = {badges.length}</h3>
      </div>
    <div className="flex overflow-x-auto gap-4">
      {badges.map((badges) => (
        <BadgeCard key={badges.id} badge={badges} />
      ))}
    </div>
    </>
  );
};

export default Badges;

