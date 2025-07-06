import type{ Badge } from "../../LeetCodeData";

type Badgecardprop = {
    badge: Badge;
}
//
const BadgeCard = ({ badge }:Badgecardprop) => {
    return (
      <div className="min-w-[350px] min-h-[350px] shadow rounded p-2 text-center">
        <img src={badge.icon} alt={badge.displayName} className=" mt-7 w-35 h-35 mx-auto" 
        onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/defaultBadge.png"; // fallback image path
          }}/>
        <p className="mt-2 text-2xl text-white font-medium">{badge.displayName}</p>
      </div>
    );
  };
  
  export default BadgeCard;
  