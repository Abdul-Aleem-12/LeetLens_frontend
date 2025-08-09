import React, { useEffect, useState } from 'react';

interface Props {
  username: string;
  image: string;
}

const Greeting: React.FC<Props> = ({ username, image }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

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
    <h1 className="text-white text-5xl text-left flex items-center">
      {displayText}
      <span className="animate-pulse">|</span>
      {currentIndex >= fullText.length && (
        <img
          src={image}
          alt="Hello"
          className="inline-block w-16 h-16 ml-4 rounded-4xl"
        />
      )}
    </h1>
  );
};

export default React.memo(Greeting);
