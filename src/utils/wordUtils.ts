import englishDictionary from './englishDictionary';

/**
 * Check if word can be formed from the given letters
 * @param word Word to check
 * @param letters Available letters
 * @returns Boolean indicating if the word can be formed
 */
export const canFormWord = (word: string, letters: string[]): boolean => {
  const letterCounts: Record<string, number> = {};
  
  // Count available letters
  letters.forEach(letter => {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  });
  
  // Check if each letter in the word is available
  for (const char of word.toLowerCase()) {
    if (!letterCounts[char] || letterCounts[char] <= 0) {
      return false;
    }
    letterCounts[char]--;
  }
  
  return true;
};

/**
 * Check if a word is valid English
 * @param word Word to check
 * @returns Boolean indicating if the word is valid
 */
export const isValidWord = (word: string): boolean => {
  const { isValidEnglishWord } = require('@/lib/utils');
  
  // Word must be at least 2 characters
  if (word.length < 2) {
    return false;
  }

  // Use our enhanced dictionary validation
  return isValidEnglishWord(word);
};

/**
 * Validate a submitted word
 * @param word Word to validate
 * @param letters Available letters
 * @param foundWords Previously found words
 * @returns Object with validation result and message
 */
export const validateWord = (word: string, letters: string[], foundWords: string[]): { 
  isValid: boolean; 
  message: string;
} => {
  if (word.length < 3) {
    return { isValid: false, message: "Words must be at least 3 letters long" };
  }
  
  if (foundWords.includes(word.toLowerCase())) {
    return { isValid: false, message: "You already found this word" };
  }
  
  if (!canFormWord(word, letters)) {
    return { isValid: false, message: "Can't form this word with the available letters" };
  }
  
  if (!isValidWord(word)) {
    return { isValid: false, message: "Not a valid English word" };
  }
  
  return { isValid: true, message: "Valid word!" };
};

/**
 * Calculate bonus points based on word length
 * @param word The submitted word
 * @returns Bonus points
 */
export const calculateBonus = (word: string): number => {
  const length = word.length;
  
  if (length >= 7) return 10;
  if (length >= 6) return 5;
  if (length >= 5) return 3;
  if (length >= 4) return 1;
  
  return 0;
};
