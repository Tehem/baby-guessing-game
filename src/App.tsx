import React, { useState, useCallback, useMemo } from 'react';
import { babies } from './data/babies';
import GameSummary from './components/GameSummary';
import { Shuffle } from 'lucide-react';

const TOTAL_ROUNDS = 10;

function App() {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Shuffle and select 10 babies for the game
  const gameSequence = useMemo(() => {
    const shuffled = [...babies].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, TOTAL_ROUNDS);
  }, [gameOver]); // Reset sequence when game is over

  const currentBaby = gameSequence[currentRound - 1];

  // Generate a wrong answer that's different from the correct one
  const wrongAnswer = useMemo(() => {
    const otherNames = babies
      .filter(baby => baby.name !== currentBaby.name)
      .map(baby => baby.name);
    return otherNames[Math.floor(Math.random() * otherNames.length)];
  }, [currentBaby]);

  // Randomize button order
  const [correctButton, wrongButton] = useMemo(() => {
    return Math.random() < 0.5 
      ? [currentBaby.name, wrongAnswer]
      : [wrongAnswer, currentBaby.name];
  }, [currentBaby, wrongAnswer]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple answers
    
    setSelectedAnswer(answer);
    const isCorrect = answer === currentBaby.name;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback({ message: "Correct!", isCorrect: true });
    } else {
      setFeedback({ message: `Wrong! It's ${currentBaby.name}`, isCorrect: false });
    }

    setTimeout(() => {
      if (currentRound === TOTAL_ROUNDS) {
        setGameOver(true);
      } else {
        setCurrentRound(prev => prev + 1);
        setSelectedAnswer(null);
        setFeedback(null);
      }
    }, 1500);
  };

  const startNewGame = useCallback(() => {
    setCurrentRound(1);
    setScore(0);
    setGameOver(false);
    setFeedback(null);
    setSelectedAnswer(null);
  }, []);

  if (gameOver) {
    return <GameSummary score={score} totalRounds={TOTAL_ROUNDS} onNewGame={startNewGame} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Baby Name Game</h1>
            <p className="text-sm">Round {currentRound}/{TOTAL_ROUNDS}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">Score: {score}</p>
          </div>
        </div>
        
        <div className="p-4">
          <img 
            src={currentBaby.imageUrl} 
            alt="Baby"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          
          <div className="grid grid-cols-2 gap-4">
            {[correctButton, wrongButton].map((name, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(name)}
                disabled={!!selectedAnswer}
                className={`
                  py-3 px-6 rounded-lg font-semibold text-lg transition-colors
                  ${selectedAnswer 
                    ? name === currentBaby.name 
                      ? 'bg-green-500 text-white'
                      : name === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }
                `}
              >
                {name}
              </button>
            ))}
          </div>
          
          {feedback && (
            <div className={`
              mt-4 p-3 rounded-lg text-center font-semibold
              ${feedback.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
            `}>
              {feedback.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;