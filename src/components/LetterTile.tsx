
import React from 'react';
import { cn } from '@/lib/utils';

interface LetterTileProps {
  letter: string;
  isSelected: boolean;
  onClick: () => void;
}

const LetterTile = ({ letter, isSelected, onClick }: LetterTileProps) => {
  return (
    <div 
      className={cn("letter-tile", isSelected && "selected")}
      onClick={onClick}
    >
      {letter.toUpperCase()}
    </div>
  );
};

export default LetterTile;
