
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle, RefreshCw } from 'lucide-react';

interface GameHeaderProps {
  onShuffle: () => void;
  onRestart: () => void;
}

const GameHeader = ({ onShuffle, onRestart }: GameHeaderProps) => {
  return (
    <div className="w-full flex items-center justify-between mb-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary">WordCraft</h1>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onShuffle}
          title="Shuffle Letters"
        >
          <Shuffle className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onRestart}
          title="New Game"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GameHeader;
