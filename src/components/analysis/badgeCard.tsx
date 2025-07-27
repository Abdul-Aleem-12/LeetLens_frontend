import type { Badge } from "../../LeetCodeData";
import { useState } from 'react';
import DefaultLogo from '/defaultBadge.png'; // Make sure path is correct

type BadgeCardProps = {
  badge: Badge & {
    creationDate?: string;
  };
};

const BadgeCard = ({ badge }: BadgeCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg max-w-xs mx-auto">
      <div className="p-6">
        <div className="flex justify-center">
          <div className="relative w-32 h-32 rounded-full  flex items-center justify-center p-2">
            {imageError ? (
              <img 
                src={DefaultLogo} 
                alt="Default LeetCode Badge" 
                className="w-full h-full object-contain"
              />
            ) : (
              <img 
                src={badge.icon} 
                alt={badge.displayName} 
                className="w-full h-full object-contain"
                onError={() => setImageError(true)}
              />
            )}
          </div>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold text-gray-800">{badge.displayName}</h3>
          {badge.creationDate && (
            <p className="text-sm text-gray-500 mt-2">
              Earned on: {new Date(badge.creationDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;