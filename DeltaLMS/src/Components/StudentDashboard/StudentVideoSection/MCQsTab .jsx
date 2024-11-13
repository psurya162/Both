import React from 'react';
import Button from 'react-bootstrap/Button'; // Assuming you're using react-bootstrap
import QuizSummary from './QuizSummaryChart ';

const MCQsTab = ({
  activeTab,
  showResults,
  totalAttempts,
  totalMarks,
  groupedMCQs,
  selectedChapter,
  currentMCQ,
  selectedAnswers,
  correctAnswers,
  handleOptionChange,
  handlePreviousQuestion,
  handleSkipQuestion,
  handleSubmit,
  currentQuestionIndex,
  retakeQuiz,
}) => {
  // Ensure this component only renders if activeTab is "mcqs"
  if (activeTab !== "mcqs") return null;
  

  return (
    <div
      className={`tab-pane fade ${activeTab === "mcqs" ? "show active" : ""}`}
      id="mcqs"
      role="tabpanel"
      aria-labelledby="mcqs"
    >
      {showResults ? (
        <QuizSummary
          totalAttempts={totalAttempts}
          correctAnswers={totalMarks}
          incorrectAnswers={totalAttempts - totalMarks}
          notAttempted={Object.values(groupedMCQs).flat().length - totalAttempts}
          retakeQuiz={retakeQuiz}
        />
      ) : selectedChapter ? (
        groupedMCQs[selectedChapter] ? (
          <div className="container">
            {/* Chapter Title */}
            <div className="row mb-3">
              <div className="col-12">
                <h4 className="text-center">{selectedChapter}</h4>
              </div>
            </div>

            {/* Question Display */}
            <div className="row mb-3">
              {currentMCQ && currentMCQ.question ? (
                <div className="col-12">
                  {/* <h5 className="fw-bold">
                    {currentMCQ.id ? `${currentMCQ.id} : ` : ""} {currentMCQ.question}
                  </h5> */}
                   <h6 >
                    {currentMCQ.id ? ` Question : ` : ""} {currentMCQ.question}
                  </h6>
                </div>
              ) : (
                <div className="col-12">
                  <h5 className="fw-bold">No question available.</h5>
                </div>
              )}
            </div>

            {/* Options Display */}
            <div className="row mb-3">
              {["a", "b", "c", "d"].map((option) => (
                <div key={option} className="col-md-6 mb-2" style={{ cursor: "pointer" }}>
                  <div
                    className={`d-flex align-items-center p-2 border rounded ${
                      correctAnswers[currentMCQ?.id] === option
                        ? "border-success bg-success text-white" // Correct answer: green
                        : selectedAnswers[currentMCQ?.id] === option
                        ? "border-danger bg-danger text-white" // Wrong answer: red
                        : "border-secondary" // Neutral state
                    }`}
                    onClick={() => currentMCQ?.id && handleOptionChange(option, currentMCQ.id)}
                  >
                    {/* Display option as text or image */}
                    {currentMCQ?.[`option_${option.toLowerCase()}`]?.match(/\.(jpeg|jpg|gif|png)$/) ? (
                      <img
                        src={currentMCQ[`option_${option.toLowerCase()}`]}
                        alt={`Option ${option}`}
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                    ) : (
                      currentMCQ?.[`option_${option.toLowerCase()}`] || "N/A"
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="row">
              <div className="col-4 text-start">
                {currentQuestionIndex > 0 && (
                  <Button
                    variant="secondary"
                    onClick={handlePreviousQuestion}
                    className="default__button w-10"
                  >
                    Previous
                  </Button>
                )}
              </div>
              <div className="col-4 d-flex justify-content-center">
                <Button
                  variant="secondary"
                  onClick={handleSkipQuestion}
                  className="default__button w-100 mx-2"
                >
                  Skip
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  className="default__button w-100 mx-2"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="default-content">
            <img
              src="/assets/img/Artboard 1 1.png"
              alt="Placeholder Image"
              style={{ width: "100%" }}
            />
          </div>
        )
      ) : (
        <div className="coming-soon">
          No content available for this subject.
        </div>
      )}
    </div>
  );
};

export default MCQsTab;
