import type{ Badge } from "../../LeetCodeData";

type Badgecardprop = {
    badge: Badge;
}
//
const BadgeCard = ({ badge }:Badgecardprop) => {
    return (
      <div className="min-w-[300px] min-h-[250px] shadow rounded p-2 text-center">
        <img src={badge.icon} alt={badge.displayName} className="w-25 h-25 mx-auto" 
        onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/defaultBadge.png"; // fallback image path
          }}/>
        <p className="mt-2 text-sm text-white font-medium">{badge.displayName}</p>
      </div>
    );
  };
  
  export default BadgeCard;
  