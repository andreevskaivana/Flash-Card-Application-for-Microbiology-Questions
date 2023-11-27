import React, { useState, useEffect, useRef } from 'react';

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial'); // Set initial height to 'auto'

  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 300) + 'px'); // Set height as a string with 'px'
  }

  useEffect(() => {
    setMaxHeight();
  }, [flip, flashcard.question, flashcard.correct_answer, flashcard.options]);

  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      onClick={() => setFlip(!flip)}
      style={{ height: height }} // Set the height dynamically
    >
      <div className={`front ${flip ? 'hidden' : ''}`} ref={frontEl}>
        {flashcard.question}
        <div className='flashcard-options'>
          {flashcard.options.map((option) => {
            return <div className='flashcard-option'>{option}</div>;
          })}
        </div>
      </div>
      <div className='back' ref={backEl}>
        {flashcard.correct_answer}
      </div>
    </div>
  );
}
