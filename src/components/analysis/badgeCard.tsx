import type { Badge } from "../../LeetCodeData";
import { useState, useEffect } from 'react';
import { badgeFallbacks } from './badgeFallBack'; 

type BadgeCardProps = {
  badge: Badge & {
    creationDate?: string;
  };
};

const BadgeCard = ({ badge }: BadgeCardProps) => {
  const [currentImage, setCurrentImage] = useState({
    src: badge.icon,
    attempt: 'original' as 'original' | 'fallback' | 'default'
  });

  useEffect(() => {
    setCurrentImage({
      src: badge.icon,
      attempt: 'original'
    });
  }, [badge]);

  const handleImageError = () => {
    if (currentImage.attempt === 'original') {
      const fallbackImage = badgeFallbacks[badge.displayName];
      if (fallbackImage) {
        setCurrentImage({
          src: fallbackImage,
          attempt: 'fallback'
        });
      } else {
        setCurrentImage({
          src: '/defaultBadge.png',
          attempt: 'default'
        });
      }
    } else if (currentImage.attempt === 'fallback') {
      setCurrentImage({
        src: '/defaultBadge.png',
        attempt: 'default'
      });
    }
  };

  const imageKey = `${badge.id}-${currentImage.attempt}`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg max-w-xs mx-auto">
      <div className="p-6">
        <div className="flex justify-center">
          <div className="relative w-32 h-32 rounded-full flex items-center justify-center p-2">
            <img 
              key={imageKey}
              src={currentImage.src} 
              alt={badge.displayName} 
              className="w-full h-full object-contain"
              onError={handleImageError}
              loading="lazy"
            />
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