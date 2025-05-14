
import React from 'react';

interface WordListProps {
  words: string[];
}

const WordList = ({ words }: WordListProps) => {
  if (words.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow-md p-4 text-center text-gray-500">
        Form words from the letters above!
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 max-h-48 overflow-y-auto">
      <h3 className="font-semibold mb-2 text-gray-700">Found Words:</h3>
      <div className="flex flex-wrap gap-2">
        {words.map((word, index) => (
          <div 
            key={`${word}-${index}`}
            className="px-2 py-1 bg-accent rounded-md text-sm font-medium"
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordList;
