import React from 'react';
import { Trophy } from 'lucide-react';

interface GameSummaryProps {
  score: number;
  totalRounds: number;
  onNewGame: () => void;
}

const GameSummary: React.FC<GameSummaryProps> = ({ score, totalRounds, onNewGame }) => {
  const percentage = (score / totalRounds) * 100;
  
  return (
    <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
      <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
      <p className="text-xl mb-2">Your Score: {score}/{totalRounds}</p>
      <p className="text-lg mb-4">Accuracy: {percentage.toFixed(1)}%</p>
      <button
        onClick={onNewGame}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameSummary;