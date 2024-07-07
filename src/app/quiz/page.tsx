'use client';

import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Quiz = () => {
  const [question, setQuestion] = useState<number>(0);
  const [progressBar, setProgressBar] = useState<number>(10);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>('');
  const [score, setScore] = useState<number>(0);
  const [showNextQuestion, setShowNextQuestion] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const quizData = {
    title: 'Sample Quiz',
    icon: 'quiz-icon.png',
    iconbg: '#FFC0CB',
    questions: [
      {
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        answer: 'Paris',
      },
      {
        question: 'Who wrote the play "Hamlet"?',
        options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Leo Tolstoy'],
        answer: 'William Shakespeare',
      },
      // Add more questions as needed
    ],
  };

  let currentQuestion = quizData.questions && quizData.questions[question];
  let numberOfQuestions = quizData.questions?.length || 0;

  const handleSubmit = () => {
    if (selectedAnswer === '') {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    if (selectedAnswer === currentQuestion?.answer) {
      setScore(score + 1);
    }
    setShowNextQuestion(true);
    setIsSubmitted(true);
  };

  const handleSelectedAnswer = (answer: string | undefined) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    setIsSubmitted(false);
    setSelectedAnswer('');
    setQuestion(question + 1);
    setProgressBar(progressBar + 10);
    setShowNextQuestion(false);
  };

  return (
    <>
      {numberOfQuestions === 0 ? (
        <p className='flex justify-center items-center h-screen w-full text-black'>No questions available for this quiz.</p>
      ) : Number(question) === numberOfQuestions ? (
<div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-2xl'>All questions answered!</p>
          <p className='text-xl'>Score: {score}</p>
        </div>
      ) : (
        <section className="mt-8 px-6 sm:px-16 xl:flex xl:w-full xl:px-0 h-[96vh] flex flex-col justify-center items-center">
          <div className="xl:flex gap-3">
            <div>
              <p className="text-sm italic text-greyNavy sm:text-[20px]">
                Question {question + 1} of {numberOfQuestions}
              </p>
              <h2 className="text-[20px] font-medium sm:text-[36px]">
                {currentQuestion?.question}
              </h2>
            </div>
            <div className="mt-6 flex h-4 w-full items-center justify-start rounded-full bg-white px-1 xl:w-[465px]">
              <span
                className="h-2 rounded-[104px] bg-purple"
                style={{ width: `${progressBar}%` }}
              ></span>
            </div>
          </div>
          <div className="xl:w-1/2">
            <ul className="space-y-3 pb-3 sm:space-y-6 sm:pb-6">
              {currentQuestion?.options.map((option, index) => {
                const letter = String.fromCharCode(65 + index); // 65 is the ASCII value for 'A'
                const isSelected = selectedAnswer === option;
                const isCorrect = currentQuestion?.answer === option;
                const optionClasses = `min-h-14 sm:min-h-20 ${
                  isSubmitted ? 'pointer-events-none' : 'group cursor-pointer'
                } flex h-auto w-full items-center justify-between gap-4 rounded-xl border-[3px] bg-white p-3 font-medium drop-shadow-sm sm:rounded-3xl xl:min-h-[92px] xl:w-[564px] ${
                  isSelected || isSubmitted ? (isCorrect ? 'border-green' : 'border-red') : 'border-white'
                }`;
                const letterClasses = `flex h-10 w-10 items-center justify-center rounded-md text-[18px] uppercase text-greyNavy sm:h-14 sm:w-14 sm:rounded-xl sm:text-[28px] ${
                  isSelected ? 'bg-purple' : 'bg-lightGrey'
                }`;
                return (
                  <li
                    key={index}
                    className={optionClasses}
                    onClick={() => handleSelectedAnswer(option)}
                  >
                    <span className={letterClasses}>{letter}</span>
                    <p className="w-[200px] text-base sm:w-[456px] sm:text-[28px] sm:leading-tight">
                      {option}
                    </p>
                    <span className="ml-auto h-8 w-8 sm:h-15 sm:w-15 mt-4">
                      {isSelected && isSubmitted && (isCorrect ? (
                      <FaCheck />
                      ) : (
                        <FaTimes />
                      ))}
                    </span>
                  </li>
                );
              })}
            </ul>
            {!showNextQuestion ? (
              <button
                className="bg-gradient-to-r from-green-400 via-blue-500 to-gray-500 hover:bg-btnHover h-14
                  w-full rounded-xl py-2 text-xs font-semibold text-white transition-all duration-200 ease-in-out sm:h-[92px] sm:rounded-3xl sm:text-[28px] xl:w-[564px]"
                onClick={handleSubmit}
              >
                Submit Answer
              </button>
            ) : (
              <button
                className="hover:bg-btnHover h-14 w-full rounded-xl bg-gray-600 py-2 text-xs font-semibold text-white transition-all duration-200 ease-in-out sm:h-[92px] sm:rounded-3xl sm:text-[28px]"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            )}
            {error && (
              <p className="mt-3 flex items-center justify-center gap-2 text-[18px] text-red sm:text-2xl">
                <span>Please select an answer</span>
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Quiz;
