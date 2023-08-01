import React, { useState } from 'react';
import AutoMath from './AutoMath';

type Option = {
  text: string;
  isCorrect: boolean;
};

type Question = {
  question: string;
  options: Option[];
};

type MCQProps = {
  questionData: Question;
};

const MCQComponent: React.FC<MCQProps> = ({ questionData }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrectSelected, setIsCorrectSelected] = useState<boolean>(false);

  const handleOptionSelect = (index: number, isCorrect: boolean) => {
    setSelectedOption(index);
    setIsCorrectSelected(isCorrect);
  };

  const handleAnswerButtonClick = () => {
    setShowAnswer(true);
  };

  
  return (
    <div className='border-2 border-zink-400 p-3 rounded-2xl my-5 w-auto'>
      <div className='mb-3'>      <AutoMath text={questionData.question}/></div>
      {questionData.options.map((option, index) => (
        <div key={index}>
          <div className='ml-2 flex items-center'>
            <input
             className="h-4 w-4 my-2"
              type="radio"
              name="option"
              value={index}
              checked={selectedOption === index}
              onChange={() => handleOptionSelect(index,option.isCorrect)}
              disabled={showAnswer}
            />
            
            <label className='ml-3 block text-sm font-medium leading-6'>
            <AutoMath text={option.text}/>
            </label>

            <div className='ml-2 transition-all'>{showAnswer && (
              <p>
                {isCorrectSelected ? (option.isCorrect ? '🎉' : ''): (option.isCorrect ? '💡' : (index === selectedOption ? '❌' : ''))}
              </p>
            )}</div>
            
          </div>
        </div>
      ))}
      <button className="mt-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-400" onClick={handleAnswerButtonClick} disabled={showAnswer}>
        Submit Answer
      </button>
    </div>
  );
};

export default MCQComponent;
