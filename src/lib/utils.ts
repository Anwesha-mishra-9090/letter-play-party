import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Enhanced dictionary validation that ensures common words are recognized
 * This is a more comprehensive approach than the basic englishDictionary check
 */
export function isValidEnglishWord(word: string): boolean {
  // Convert to lowercase for consistent checking
  const lowercaseWord = word.toLowerCase();
  
  // Common short words that might be missing from some dictionaries
  const commonShortWords = new Set([
    'a', 'an', 'as', 'at', 'be', 'by', 'do', 'go', 'he', 'hi', 'if', 'in', 'is', 'it', 'me', 'my',
    'no', 'of', 'on', 'or', 'ox', 'so', 'to', 'up', 'us', 'we', 'am', 'ax', 'ex', 'ok',
    'tea', 'eat', 'ate', 'sea', 'see', 'bee', 'fee', 'lee', 'tee', 'toe', 'tie', 'pie', 'die',
    'lie', 'air', 'arm', 'art', 'ash', 'ask', 'awe', 'awn', 'aye', 'bad', 'bag', 'ban', 'bar',
    'bat', 'bay', 'bed', 'bee', 'beg', 'bet', 'bid', 'big', 'bin', 'bit', 'boa', 'bob', 'bog',
    'boo', 'bow', 'box', 'boy', 'bra', 'bud', 'bug', 'bum', 'bun', 'bus', 'but', 'buy', 'bye',
    'cab', 'cad', 'cam', 'can', 'cap', 'car', 'cat', 'caw', 'cod', 'cog', 'con', 'coo', 'cop',
    'cor', 'cos', 'cot', 'cow', 'coy', 'cry', 'cub', 'cud', 'cue', 'cup', 'cut', 'dab', 'dad',
    'dam', 'day', 'den', 'dew', 'did', 'die', 'dig', 'dim', 'din', 'dip', 'doe', 'dog', 'don',
    'dot', 'dry', 'dub', 'due', 'dug', 'duh', 'dun', 'duo', 'dye', 'ear', 'eat', 'ebb', 'egg',
    'ego', 'eke', 'elf', 'elk', 'elm', 'emu', 'end', 'era', 'erg', 'err', 'eve', 'ewe', 'eye'
  ]);

  // Check if it's a common short word first
  if (commonShortWords.has(lowercaseWord)) {
    return true;
  }

  // Then try the main dictionary
  // Import from englishDictionary.ts
  const { englishDictionary } = require('@/utils/englishDictionary');
  
  return englishDictionary.has(lowercaseWord);
}
