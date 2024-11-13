import React from 'react';
import { Button } from 'react-bootstrap';

const QuizSummary = ({ totalAttempts, correctAnswers, incorrectAnswers, notAttempted,retakeQuiz   }) => {
  
  return (
    <div className="container mt-3">
      <h4 className='text-center'>Quiz Summary</h4>
      <div className="row text-center">
        <div className="col-md-6">
            <p className='fw-bold'>Total Attempts: </p>
            <p className='fw-bold'>Correct Answers: </p>
            <p className='fw-bold'>Incorrect Answers: </p>
            <p className='fw-bold'>Not Attempted: </p>

        </div>
        <div className="col-md-6">
            <p className='fw-bold'> {totalAttempts}</p>
            <p className='fw-bold'>{correctAnswers}</p>
            <p className='fw-bold'>{incorrectAnswers}</p>
            <p className='fw-bold'>{notAttempted}</p>
           
        </div>
       
      </div>
      <Button className="default__button w-10 " onClick={retakeQuiz} >Retake</Button>
    </div>
  );
};

export default QuizSummary;
