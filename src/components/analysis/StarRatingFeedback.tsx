import React, { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const ratingComments = {
  1: 'Very Poor',
  2: 'Poor',
  3: 'Average',
  4: 'Good',
  5: 'Excellent',
};  
const backendUrl = import.meta.env.VITE_BACKEND_URL;
interface StarRatingFeedbackProps {
    userId: string;  
  }

const StarRatingFeedback: React.FC<StarRatingFeedbackProps> = ({userId}) => {
  const maxChars = 250;
  const [ratingUI, setRatingUI] = useState(0);
  const [hoverUI, setHoverUI] = useState(0);

  const [ratingFunc, setRatingFunc] = useState(0);
  const [hoverFunc, setHoverFunc] = useState(0);

  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const charCount = feedback.length;

  const handleSubmit = async () => {
    if (ratingUI === 0 || ratingFunc === 0) {
      setError('Please select a star rating for both UI/Styling and Functionality.');
      setSuccessMessage('');
      return;
    }
    if (charCount > maxChars) {
      setError(`Feedback cannot exceed ${maxChars} characters. You have written ${charCount}.`);
      setSuccessMessage('');
      return;
    }
    setError('');
    setSubmitting(true);
    setSuccessMessage('');

    try {
      console.log('User Review Submitted:', {
        ratingUI,
        ratingFunc,
        feedback: feedback.trim(),
      });
      await axios.post(`${backendUrl}/api/feedback`, {
        user_id: userId,
        rating_ui: ratingUI,
        rating_func :ratingFunc,
        feedback: feedback.trim(),
      });

      setFeedback('');
      setRatingUI(0);
      setRatingFunc(0);
      setSuccessMessage('Thank you, your feedback is valuable!');
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (
    rating: number,
    hover: number,
    setRating: (val: number) => void,
    setHover: (val: number) => void,
    label: string
  ) => {
    const display = hover || rating;
    return (
      <div className="w-full sm:w-1/2 px-1 sm:px-3 mb-4 raleway-st">
        <h3 className="text-base sm:text-lg font-medium mb-2 text-center sm:text-left">{label}</h3>
        <div className="flex justify-center sm:justify-start flex-wrap gap-2 sm:gap-3 mb-2">
          {[1, 2, 3, 4, 5].map((star) => {
            const filled = star <= display;
            return (
              <button
                key={`${label}-star-${star}`}
                type="button"
                aria-label={`${star} star`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none"
              >
                <Star
                  size={28}
                  className={`${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  w-6 h-6 sm:w-8 sm:h-8`}
                />
              </button>
            );
          })}
        </div>
        <p
          className="text-center sm:text-left text-purple-700 font-medium select-none text-sm sm:text-base min-h-[1.5rem]"
          aria-live="polite"
        >
          {display > 0 ? ratingComments[display as keyof typeof ratingComments] : '\u00A0' }
        </p>
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md px-4 py-6 sm:px-8 sm:py-8">
      <h2 className="text-lg sm:text-2xl font-semibold mb-6 sm:mb-8 text-center sm:text-left">
        Rate your experience
      </h2>

      <div className="flex flex-col sm:flex-row w-full">
        {renderStars(ratingUI, hoverUI, setRatingUI, setHoverUI, 'UI / Styling')}
        {renderStars(ratingFunc, hoverFunc, setRatingFunc, setHoverFunc, 'Functionality')}
      </div>

      <textarea
        className="w-full p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
        placeholder={`Leave your feedback (max ${maxChars} characters)...`}
        rows={4}
        value={feedback}
        maxLength={maxChars}
        onChange={(e) => {
          if (e.target.value.length <= maxChars) {
            setFeedback(e.target.value);
          }
        }}
        disabled={submitting}
      />
      <div
        className={`text-xs sm:text-sm mt-1 mb-4 text-right select-none ${
          charCount >= maxChars ? 'text-red-600 font-semibold' : 'text-gray-500'
        }`}
      >
        {charCount} / {maxChars} characters
      </div>

      {error && (
        <p className="text-red-600 mb-3 text-center sm:text-left text-sm" role="alert">
          {error}
        </p>
      )}

      {successMessage && (
        <div
          className="flex items-center justify-center sm:justify-start mb-4 space-x-2 text-green-600 font-semibold text-sm sm:text-base"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>{successMessage}</span>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className={`w-full py-2 sm:py-3 rounded bg-purple-600 text-white font-semibold transition
          ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
      >
        {submitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </div>
  );
};

export default StarRatingFeedback;
