
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

// English word list - small sample for fast validation
// In a real app, you might use an API or a more complete dictionary
const COMMON_ENGLISH_WORDS = new Set([
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "it", "for", "not", "on", "with",
  "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her",
  "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up",
  "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time",
  "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could",
  "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think",
  "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even",
  "new", "want", "because", "any", "these", "give", "day", "most", "us", "is", "was", "are", "been",
  "were", "being", "am", "had", "has", "does", "did", "doing", "done", "many", "much", "few", "more", 
  "most", "other", "another", "some", "such", "same", "each", "every", "both", "all", "either", "neither", 
  "any", "anything", "nothing", "everything", "something", "nobody", "somebody", "everyone", "anybody", 
  "everyone", "somebody", "night", "day", "sun", "moon", "star", "sky", "earth", "world", "land", "sea", 
  "water", "fire", "air", "wind", "rain", "snow", "ice", "heat", "cold", "warm", "hot", "cool", "tree", 
  "flower", "grass", "leaf", "root", "stem", "branch", "plant", "animal", "bird", "fish", "cat", "dog", 
  "horse", "lion", "tiger", "bear", "wolf", "fox", "deer", "rabbit", "mouse", "rat", "pig", "cow", "sheep", 
  "goat", "bee", "ant", "fly", "book", "page", "word", "line", "story", "tale", "game", "play", "sport", "team", 
  "race", "food", "bread", "meat", "fruit", "apple", "orange", "grape", "lemon", "pear", "peach", "plum"
]);

/**
 * Check if a word is valid English
 * @param word Word to check
 * @returns Boolean indicating if the word is valid
 */
export const isValidWord = (word: string): boolean => {
  if (word.length < 3) return false; // Most word games require 3+ letter words
  return COMMON_ENGLISH_WORDS.has(word.toLowerCase());
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
