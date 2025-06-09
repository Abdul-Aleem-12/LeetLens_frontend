import React, { useEffect, useState } from 'react';

interface Props {
  username: string;
}

const Greeting: React.FC<Props> = ({ username }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    console.log("Received username:", username);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = `H ello, ${username ?? ''}`;

  useEffect(() => {
    if (username) {
      const fullText = `Hello ${username}`;
      
      if (currentIndex < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(fullText.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 80); // Adjust typing speed here (milliseconds)

        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex,username]);

  return (
    // <div className="grid grid-col mt-10 pl-10 text-7xl justify-start raleway-st-bold">
        <h1 className="text-white text-5xl text-left">
          {displayText}
          <span className="animate-pulse">|</span> {/* Cursor effect */}
        </h1>
    //</div>
  );
};

export default React.memo(Greeting);
