import React, { useEffect, useState } from 'react';

interface Props {
  username: string;
  image: string;
}

const formatName = (name: string) => {
  return name
    .split(' ')
    .filter(Boolean) // remove extra spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const Greeting: React.FC<Props> = ({ username, image }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  username = formatName(username);

  // Single source of truth for the text
  const fullText = `Hello ${username ?? ''}`;

  useEffect(() => {
    if (username && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, 80); // typing speed

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, username, fullText]);

  return (
    <div className='flex'>
      <img
            src={image}
            alt="Hello"
            className="inline-block w-14 h-14 ml-4 rounded-4xl"
          />
      <h1 className="text-white text-2xl sm:text-5xl text-left flex items-center pl-2">
        {displayText}
        {currentIndex < fullText.length && <span className="animate-pulse">|</span>}
        
      </h1>
    </div>
  );
};

export default React.memo(Greeting);
