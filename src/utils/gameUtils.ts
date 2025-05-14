
// Set of common English letters with their frequencies
const LETTERS_FREQUENCY = {
  'e': 12, 't': 9, 'a': 8, 'o': 8, 'i': 7, 'n': 7, 's': 7, 'h': 6, 'r': 6, 'd': 4,
  'l': 4, 'c': 3, 'u': 3, 'm': 3, 'w': 3, 'f': 2, 'g': 2, 'y': 2, 'p': 2, 'b': 2,
  'v': 1, 'k': 1, 'j': 1, 'x': 1, 'q': 1, 'z': 1
};

/**
 * Generates a random set of letters, biased towards more common English letters
 * @param count Number of letters to generate
 * @returns Array of letters
 */
export const generateRandomLetters = (count: number): string[] => {
  const letters: string[] = [];
  const letterPool: string[] = [];
  
  // Create a pool of letters based on their frequency
  Object.entries(LETTERS_FREQUENCY).forEach(([letter, frequency]) => {
    for (let i = 0; i < frequency; i++) {
      letterPool.push(letter);
    }
  });
  
  // Pick random letters from the pool
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * letterPool.length);
    letters.push(letterPool[randomIndex]);
  }
  
  return letters;
};

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param array Array to shuffle
 * @returns Shuffled array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Calculate score for a word based on its length
 * @param word Word to score
 * @returns Score value
 */
export const calculateWordScore = (word: string): number => {
  const length = word.length;
  
  // Bonus points for longer words
  if (length <= 2) return 0; // No points for very short words
  if (length === 3) return 1;
  if (length === 4) return 2;
  if (length === 5) return 3;
  if (length === 6) return 5;
  if (length === 7) return 8;
  return 10 + (length - 7) * 2; // Additional points for words longer than 7 letters
};
