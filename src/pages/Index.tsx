
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import LetterTile from '@/components/LetterTile';
import GameHeader from '@/components/GameHeader';
import GameStats from '@/components/GameStats';
import WordList from '@/components/WordList';
import { generateRandomLetters, shuffleArray, calculateWordScore } from '@/utils/gameUtils';
import { validateWord } from '@/utils/wordUtils';

const LETTER_COUNT = 10;
const GAME_TIME = 180; // 3 minutes

const Index = () => {
  const [letters, setLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [gameActive, setGameActive] = useState(true);
  
  // Initialize or restart the game
  const initializeGame = useCallback(() => {
    const newLetters = generateRandomLetters(LETTER_COUNT);
    setLetters(newLetters);
    setSelectedLetters([]);
    setCurrentWord('');
    setFoundWords([]);
    setScore(0);
    setTimeLeft(GAME_TIME);
    setGameActive(true);
  }, []);
  
  // Handle timer
  useEffect(() => {
    if (!gameActive) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          toast.info("Time's up! Game over.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameActive]);
  
  // Initialize game on first render
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);
  
  // Handle letter selection
  const handleLetterClick = (index: number) => {
    if (!gameActive) return;
    
    if (selectedLetters.includes(index)) {
      // Deselect letter
      setSelectedLetters(prev => prev.filter(i => i !== index));
      setCurrentWord(prev => prev.slice(0, -1));
    } else {
      // Select letter
      setSelectedLetters(prev => [...prev, index]);
      setCurrentWord(prev => prev + letters[index]);
    }
  };
  
  // Shuffle letters
  const handleShuffle = () => {
    setLetters(shuffleArray([...letters]));
    setSelectedLetters([]);
    setCurrentWord('');
  };
  
  // Submit word
  const handleSubmitWord = () => {
    if (!gameActive || currentWord.length < 3) return;
    
    const result = validateWord(currentWord, letters, foundWords);
    
    if (result.isValid) {
      const wordScore = calculateWordScore(currentWord);
      setScore(prev => prev + wordScore);
      setFoundWords(prev => [...prev, currentWord.toLowerCase()]);
      toast.success(`+${wordScore} points!`);
    } else {
      toast.error(result.message);
    }
    
    // Reset selection
    setSelectedLetters([]);
    setCurrentWord('');
  };
  
  // Clear current word
  const handleClearWord = () => {
    setSelectedLetters([]);
    setCurrentWord('');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="game-container">
        <GameHeader onShuffle={handleShuffle} onRestart={initializeGame} />
        
        <GameStats score={score} timeLeft={timeLeft} maxTime={GAME_TIME} />
        
        <div className="word-input">
          {currentWord || "Form a word..."}
        </div>
        
        <div className="grid grid-cols-5 gap-2 my-4">
          {letters.map((letter, index) => (
            <LetterTile
              key={`${letter}-${index}`}
              letter={letter}
              isSelected={selectedLetters.includes(index)}
              onClick={() => handleLetterClick(index)}
            />
          ))}
        </div>
        
        <div className="flex gap-2 w-full mb-6">
          <Button 
            className="flex-1" 
            variant="outline" 
            onClick={handleClearWord}
            disabled={!gameActive || selectedLetters.length === 0}
          >
            Clear
          </Button>
          <Button 
            className="flex-1" 
            onClick={handleSubmitWord}
            disabled={!gameActive || currentWord.length < 3}
          >
            Submit
          </Button>
        </div>
        
        <WordList words={foundWords} />
        
        {!gameActive && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
            <p className="mb-4">Final Score: <span className="font-bold text-primary">{score}</span></p>
            <p className="mb-4">Words Found: <span className="font-bold">{foundWords.length}</span></p>
            <Button onClick={initializeGame}>Play Again</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
