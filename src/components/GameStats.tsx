
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface GameStatsProps {
  score: number;
  timeLeft: number;
  maxTime: number;
}

const GameStats = ({ score, timeLeft, maxTime }: GameStatsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 my-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Score</span>
          <span className="text-2xl font-bold">{score}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm text-gray-500">Time Left</span>
          <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>
      <Progress value={(timeLeft / maxTime) * 100} className="h-2" />
    </div>
  );
};

export default GameStats;
