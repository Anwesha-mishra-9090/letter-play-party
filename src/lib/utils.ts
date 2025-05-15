import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import englishDictionary from "@/utils/englishDictionary"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Expanded set of common words for more comprehensive dictionary coverage
const commonWords = new Set([
  // Common 2-letter words
  'of', 'to', 'in', 'it', 'is', 'be', 'as', 'at', 'so', 'we', 'he', 'by', 'or', 'on', 'do', 'if', 'me', 'my', 'up', 'an', 'go', 'no', 'us', 'am',
  // Common 3-letter words 
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'any', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use',
  // Food and drink related words
  'tea', 'eat', 'ate', 'cup', 'pie', 'egg', 'ham', 'jam', 'oil', 'pea', 'nut', 'bun', 'rye', 'ice',
  // Animal related words
  'cat', 'dog', 'cow', 'pig', 'hen', 'fox', 'owl', 'bat', 'ant', 'bee', 'ape',
  // Colors
  'red', 'blue', 'cyan', 'pink', 'gold', 'grey', 'teal',
  // Additional common words
  'folk', 'folks',
  // Other common short words
  'air', 'arm', 'art', 'ash', 'ask', 'awe', 'awn', 'aye', 'bad', 'bag', 'ban', 'bar', 
  'bat', 'bay', 'bed', 'bee', 'beg', 'bet', 'bid', 'big', 'bin', 'bit', 'boa', 'bob', 'bog',
  'boo', 'bow', 'box', 'boy', 'bra', 'bud', 'bug', 'bum', 'bun', 'bus', 'but', 'buy', 'bye',
  'cab', 'cad', 'cam', 'can', 'cap', 'car', 'cat', 'caw', 'cod', 'cog', 'con', 'coo', 'cop',
  'cor', 'cos', 'cot', 'cow', 'coy', 'cry', 'cub', 'cud', 'cue', 'cup', 'cut', 'dab', 'dad',
  'dam', 'day', 'den', 'dew', 'did', 'die', 'dig', 'dim', 'din', 'dip', 'doe', 'dog', 'don',
  'dot', 'dry', 'dub', 'due', 'dug', 'duh', 'dun', 'duo', 'dye', 'ear', 'eat', 'ebb', 'egg',
  'ego', 'eke', 'elf', 'elk', 'elm', 'emu', 'end', 'era', 'erg', 'err', 'eve', 'ewe', 'eye',
  'fad', 'fag', 'fan', 'far', 'fat', 'fax', 'fee', 'few', 'fig', 'fin', 'fir', 'fit', 'fix',
  'flu', 'fly', 'foe', 'fog', 'for', 'fox', 'fry', 'fun', 'fur', 'gag', 'gap', 'gas', 'gay',
  'gee', 'gel', 'gem', 'get', 'gig', 'gin', 'gnu', 'god', 'got', 'gum', 'gun', 'gut', 'guy',
  'gym', 'had', 'hag', 'ham', 'has', 'hat', 'hay', 'hem', 'hen', 'her', 'hey', 'hid', 'him',
  'hip', 'his', 'hit', 'hog', 'hon', 'hop', 'hot', 'how', 'hub', 'hue', 'hug', 'huh', 'hum',
  'hut', 'ice', 'icy', 'ill', 'imp', 'ink', 'inn', 'ion', 'its', 'ivy', 'jab', 'jag', 'jam',
  'jar', 'jaw', 'jay', 'jet', 'jew', 'jig', 'job', 'jog', 'jot', 'joy', 'jug'
]);

/**
 * Enhanced Oxford-based dictionary validation that ensures comprehensive word recognition
 * This uses both our common word list and the main English dictionary
 */
export function isValidEnglishWord(word: string): boolean {
  // Convert to lowercase for consistent checking
  const lowercaseWord = word.toLowerCase();
  
  // First check our common words list
  if (commonWords.has(lowercaseWord)) {
    return true;
  }
  
  // Then check the main dictionary
  return englishDictionary.has(lowercaseWord);
}
