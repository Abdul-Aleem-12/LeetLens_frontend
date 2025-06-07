import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Analyze = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data) {
      navigate('/', { replace: true });
    }
  }, [data, navigate]);

  // Typing animation effect
  useEffect(() => {
    if (data) {
      const username = data.profile.realName;
      const fullText = `Hello ${username}`;
      
      if (currentIndex < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(fullText.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 80); // Adjust typing speed here (milliseconds)

        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, data]);

  if (!data) return null;

  return (
    <div>
      <div className="grid grid-col mt-10 pl-10 text-7xl justify-start raleway-st-bold">
        <h1 className="text-white text-5xl">
          {displayText}
          <span className="animate-pulse">|</span> {/* Cursor effect */}
        </h1>
        {/* Rest of your analysis */}
      </div>
    </div>
  );
};

export default Analyze;