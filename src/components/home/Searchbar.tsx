import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import demo from '../../demo.jpg';

const Searchbar = () => {
  const [username, setUsername] = useState('');
  const [inputKey, setInputKey] = useState(0);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleSearch = async () => {
    if (!username.trim()) {
      setError("Please enter a username.");
      setUsername('');
      setInputKey(prev => prev + 1);
      triggerShake();
      return;
    }

    try {
      setSubmitting(true);
      const res = await axios.get(`${backendUrl}/${username.trim()}`, { timeout: 5000 });
      setError('');
      navigate(`/analyze/${username.trim()}`, { state: { data: res.data } });
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError("Username not found. Check the spelling.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
      setUsername('');
      setInputKey(prev => prev + 1);
      triggerShake();
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await handleSearch();
  };

  return (
    <div className='flex flex-col'>
      {/* Add keyframes directly in a style tag */}
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
          }
          .shake {
            animation: shake 0.4s ease-in-out;
          }
        `}
      </style>

      <form
        onSubmit={handleSubmit}
        className="z-10 flex flex-col xl:flex-row items-center w-full max-w-2xl mx-auto mt-6 px-4"
      >
        <div className={`w-full relative top-15 md:top-20 xl:top-45 ${shake ? 'shake' : ''}`}>
          <input
            key={inputKey}
            type="text"
            spellCheck={false}
            placeholder={error || "Enter your leetcode username..."}
            className={` clash-grotesk w-full pl-12 lg:pr-7 py-2.5 rounded-2xl border-2 placeholder-rale ${
              error ? 'border-red-600 placeholder-red-500 text-md' : 'border-white'
            } focus:outline-none focus:border-purple-600 bg-white text-black text:md md:text-2xl`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={submitting}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="ml-4 relative top-15 xl:top-45 xl:right-10 lg:top-30">
          <button
            type="submit"
            disabled={submitting}
            className={` h-14 clash-grotesk flex items-center gap-2 relative px-5 py-2 xl:px-3 xl:py-3.5 xl:top-0 md:top-10 top-6 rounded-xl font-semibold text-lg md:text-xl shadow-md transition-all duration-300 cursor-pointer
              ${submitting ? 'bg-purple-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white hover:shadow-purple-500/40 hover:scale-101 '}`}
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Analyze <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className='flex flex-col relative items-center justify-center'>
        <div className='text-white relative top-30 xl:top-55 raleway-st-bold flex flex-row'>
          <span>You can find your Username here in your Leetcode profile ⇓</span>
        </div>
        <div>
          <img
            src={demo}
            alt="image of username"
            className="z-0 h-80 w-80 relative mt-40 mb-3 xl:mt-60"
          />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
