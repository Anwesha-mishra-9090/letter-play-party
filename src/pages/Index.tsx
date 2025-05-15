
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import LetterTile from '@/components/LetterTile';
import GameHeader from '@/components/GameHeader';
import GameStats from '@/components/GameStats';
import WordList from '@/components/WordList';
import { generateRandomLetters, shuffleArray, calculateWordScore } from '@/utils/gameUtils';
import { validateWord, calculateBonus } from '@/utils/wordUtils';

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
  const [consecutiveValidWords, setConsecutiveValidWords] = useState(0);
  const [showBonus, setShowBonus] = useState(false);
  const [lastBonus, setLastBonus] = useState(0);
  
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
    setConsecutiveValidWords(0);
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
    
    try {
      const result = validateWord(currentWord, letters, foundWords);
      
      if (result.isValid) {
        const wordScore = calculateWordScore(currentWord);
        const bonus = calculateBonus(currentWord);
        const wordWithBonus = wordScore + bonus;
        
        setScore(prev => prev + wordWithBonus);
        setFoundWords(prev => [...prev, currentWord.toLowerCase()]);
        
        // Consecutive valid word bonus
        setConsecutiveValidWords(prev => prev + 1);
        
        // Show bonus message
        if (bonus > 0) {
          setLastBonus(bonus);
          setShowBonus(true);
          setTimeout(() => setShowBonus(false), 1500);
        }
        
        let message = `+${wordScore} points!`;
        if (bonus > 0) {
          message += ` +${bonus} bonus!`;
        }
        
        toast.success(message);
        
        // Add consecutive bonus every 3 words
        if (consecutiveValidWords > 0 && (consecutiveValidWords + 1) % 3 === 0) {
          const streakBonus = 5;
          setScore(prev => prev + streakBonus);
          toast.success(`Word streak! +${streakBonus} bonus points!`);
        }
      } else {
        toast.error(result.message);
        // Reset consecutive words
        setConsecutiveValidWords(0);
      }
    } catch (error) {
      console.error("Error validating word:", error);
      toast.error("Error validating word. Please try again.");
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

  // Handle keyboard input for word entry
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!gameActive) return;
    
    if (e.key === 'Enter') {
      handleSubmitWord();
      return;
    }
    
    if (e.key === 'Backspace') {
      if (selectedLetters.length > 0) {
        setSelectedLetters(prev => prev.slice(0, -1));
        setCurrentWord(prev => prev.slice(0, -1));
      }
      return;
    }
    
    // Check if pressed key matches any available letter
    const key = e.key.toLowerCase();
    const availableLetterIndices = letters.map((letter, index) => 
      !selectedLetters.includes(index) && letter.toLowerCase() === key ? index : -1
    ).filter(index => index !== -1);
    
    if (availableLetterIndices.length > 0) {
      const indexToUse = availableLetterIndices[0];
      setSelectedLetters(prev => [...prev, indexToUse]);
      setCurrentWord(prev => prev + letters[indexToUse]);
    }
  }, [gameActive, letters, selectedLetters, handleSubmitWord]);
  
  // Set up keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        <GameHeader onShuffle={handleShuffle} onRestart={initializeGame} />
        
        <GameStats 
          score={score} 
          timeLeft={timeLeft} 
          maxTime={GAME_TIME} 
          wordCount={foundWords.length}
        />
        
        <div className="word-input bg-white rounded-lg shadow-md p-4 text-xl font-medium text-center my-4 h-16 flex items-center justify-center relative">
          {currentWord || "Form a word..."}
          
          {/* Bonus popup */}
          {showBonus && (
            <div className="absolute top-0 right-0 transform -translate-y-full bg-green-500 text-white px-3 py-1 rounded-t-md font-bold animate-bounce">
              +{lastBonus} Bonus!
            </div>
          )}
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
          <div className="mt-6 text-center bg-white rounded-lg shadow-md p-6">
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
