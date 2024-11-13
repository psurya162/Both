import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ErrorModal from './ErrorModal'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { toast } from "sonner";
import {
  fetchSubjectVideos,
  fetchSubjectBooks,
  fetchSubjectMCQs,
  setIsSubscribed,
} from "../redux/videoSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faCirclePlay,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import UpgradeModel from "./StudentVideoSection/UpgradeModel";
import MediaTab from "./StudentVideoSection/MediaTab ";
import BooksTab from "./StudentVideoSection/BooksTab";
import MCQsTab from "./StudentVideoSection/MCQsTab ";
import { updatePlaytime } from "../redux/videoPlaytimeSlice";
import { bookmarkVideo } from "../redux/videoBookmark";


const StudentVideoSection = () => {
  const { subjectId, langid } = useParams();

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});
  const [videoID, SetVideoId] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleVideoProgress = (duration) => {
    setProgress(duration); // Storing the duration in the state
    const tokenID = localStorage.getItem("token");


    dispatch(
      updatePlaytime({

        subjectId,
        videoId: videoID, // Replace with actual videoId
        playTime: duration.playedSeconds,
        classId: playback.class_id,
        boardId: playback.board_id,
        languageId: playback.language_id,
      })
    );
    // Logging the progress
  };
  const bookmarkedVideos = useSelector((state) => state.videoBookmark.bookmarkedVideos);

  const handleBookmarkClick = (video) => {


    // Extract video-related fields
    const videoId = video.video_id;
    const classId = video.class_id || null;
    const boardId = video.board_id || null;
    const languageId = video.language_id || null;



    // Dispatch the bookmark action
    dispatch(
      bookmarkVideo({
        subjectId,
        videoId, // Replace with actual videoId

        classId: playback.class_id,
        boardId: playback.board_id,
        languageId: playback.language_id
      })
    );
  };




  const { subjectVideos, books, mcqs, error, isSubscribed } = useSelector((state) => state.videos);


  const [activeTab, setActiveTab] = useState("chapt_video");
  const [currentMedia, setCurrentMedia] = useState("");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [groupedVideos, setGroupedVideos] = useState({});
  const [groupedBooks, setGroupedBooks] = useState({});
  const [groupedMCQs, setGroupedMCQs] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [totalMarks, setTotalMarks] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [totalAttempts, setTotalAttempts] = useState(0); // Added state for totalAttempts
  const { subjectLogo, subjectName, langId } = location.state || {};
  const [selectedChapter, setSelectedChapter] = useState(null);



  const [playback, Setplayback] = useState('');

  const fetchData = async () => {
    try {
      if (subjectId && langid) {
        
        const videoAction = await dispatch(fetchSubjectVideos({ subjectId, langid }));
        if (fetchSubjectVideos.fulfilled.match(videoAction)) {
          dispatch(setIsSubscribed(videoAction.payload.isSubscribed));
        }

        if (activeTab === "books") {
          
          const bookAction = await dispatch(fetchSubjectBooks(subjectId));
          if (!fetchSubjectBooks.fulfilled.match(bookAction)) {
            setErrorMessage(bookAction.payload);
          }
        } else if (activeTab === "mcqs") {
          
          const mcqAction = await dispatch(fetchSubjectMCQs(subjectId));
       
          if (!fetchSubjectMCQs.fulfilled.match(mcqAction)) {
            setErrorMessage(mcqAction.payload);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, subjectId, langid, activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // Fetch data only if the new tab is "books" or "mcqs"
    if (tab === "books") {
      dispatch(fetchSubjectBooks(subjectId));
    } else if (tab === "mcqs") {
      dispatch(fetchSubjectMCQs(subjectId));
    }
  };

  const handleMediaClick = (url, isLocked, vid) => {

    if (isLocked) {
      setShowUpgradeModal(true);  // Show upgrade modal if video is locked
    } else if (!url) {
      // Show error modal if the URL is missing
      setErrorMessage("This video is currently unavailable.");
      setShowErrorModal(true);
    } else {
      // Play video if it's unlocked and URL is available
      SetVideoId(vid);
      setCurrentMedia(url);
    }
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleCloseModal = () => setShowUpgradeModal(false);

  useEffect(() => {
    const grouped = subjectVideos.reduce((acc, video) => {
      if (!acc[video.chapter_title]) {
        acc[video.chapter_title] = [];
      }
      acc[video.chapter_title].push(video);
      return acc;
    }, {});
    setGroupedVideos(grouped);
  }, [subjectVideos]);

  useEffect(() => {
    const grouped = books.reduce((acc, book) => {
      if (!acc[book.chapter_title]) {
        acc[book.chapter_title] = [];
      }
      acc[book.chapter_title].push(book);
      return acc;
    }, {});
    setGroupedBooks(grouped);
  }, [books]);

  useEffect(() => {
    if (activeTab === "mcqs") {
      const grouped = mcqs.reduce((acc, mcq) => {
        const { chapter_id: chapterId, chapter_title: chapterTitle } = mcq;

        if (!chapterId || chapterId === -1) {
         
          return acc; // Skip invalid MCQs
        }

        const validChapterTitle = chapterTitle || "Unknown Chapter"; // Default title if none is available

        if (!acc[validChapterTitle]) {
          acc[validChapterTitle] = [];
        }

        acc[validChapterTitle].push(mcq);
        return acc;
      }, {});
      setGroupedMCQs(grouped);
    }
  }, [mcqs, activeTab]);




  const handlePreviousQuestion = () => {
    if (selectedChapter) {
      const chapterQuestions = groupedMCQs[selectedChapter] || [];
      const newIndex = Math.max(currentQuestionIndex - 1, 0);
      setCurrentQuestionIndex(newIndex);
    }
  };


  const handleSkipQuestion = () => {
    if (selectedChapter) {
      const chapterQuestions = groupedMCQs[selectedChapter] || [];
      if (!selectedAnswers[currentMCQ.id]) {
        setSelectedAnswers({
          ...selectedAnswers,
          [currentMCQ.id]: null, // Mark as skipped
        });
      }
      setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, chapterQuestions.length - 1));
    }
  };

  // Function to complete the quiz and show summary after a chapter is finished
  const handleQuizCompletion = () => {
    let marks = 0;
    let correctAnswersMap = {};
    let totalAttempted = 0;
    let incorrectAnswers = 0;
    let notAttempted = 0;
  
    // Calculate results for the current chapter
    Object.values(groupedMCQs[selectedChapter]).forEach((mcq) => {
      const selectedOption = selectedAnswers[mcq.id];
      const correctOption = mcq.correct_option;
  
      if (selectedOption !== null && selectedOption !== undefined) {
        // Count question only if attempted
        totalAttempted += 1;
  
        if (selectedOption === correctOption) {
          marks += 1;
        } else {
          incorrectAnswers += 1;
        }
      } else {
        notAttempted += 1; // Count as not attempted if no option is selected
      }
  
      correctAnswersMap[mcq.id] = correctOption;
    });
  
    // Update state with the results for this chapter
    setTotalMarks(marks);
    setTotalAttempts(totalAttempted);
    setCorrectAnswers(correctAnswersMap);
    setShowResults(true); // Display the summary for the current chapter
  
    // Now the user can review the summary and click a button to move to the next chapter
  };

  const getCurrentMCQ = () => {
    const chapterEntries = Object.entries(groupedMCQs); // Array of [chapterTitle, mcqs] pairs
    let questionOffset = currentQuestionIndex;
    

    

    // Find the selected chapter's MCQs
    const selectedChapterMCQs = groupedMCQs[selectedChapter];
    if (selectedChapterMCQs) {
      if (questionOffset < selectedChapterMCQs.length) {
        
        return selectedChapterMCQs[questionOffset]; // Return the current MCQ for the selected chapter
      }
    }

    return null; // Return null if no question is found for the selected chapter
  };


  const currentMCQ = getCurrentMCQ();
  // Modify the handleOptionChange to ensure answers are saved uniquely for each question
  const handleOptionChange = (option, questionId) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: option,
    }));
  };

  // Adjust the handleSubmit function
  const handleSubmit = () => {
    if (currentMCQ) {
      const selectedOption = selectedAnswers[currentMCQ.id];
      const correctOption = currentMCQ.correct_option;

      if (!selectedOption) {
        toast.error("Please select an option or skip the question.");
        return; // Exit if no option is selected
      }

      if (selectedOption === correctOption) {
        setCorrectAnswers((prevCorrectAnswers) => ({
          ...prevCorrectAnswers,
          [currentMCQ.id]: correctOption,
        }));
      } else {
        setCorrectAnswers((prevCorrectAnswers) => ({
          ...prevCorrectAnswers,
          [currentMCQ.id]: correctOption,
        }));
      }

      // Move to the next question after a delay
      setTimeout(() => {
        const chapterQuestions = groupedMCQs[selectedChapter];
        if (currentQuestionIndex >= chapterQuestions.length - 1) {
          // Trigger quiz completion if it's the last question in the chapter
          handleQuizCompletion();
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }, 300); // Short delay for feedback
    }
  };


  const handleAccordionClick = (chapterTitle, chapterId) => {
    // console.log(`Chapter ID: ${chapterId}, Chapter Title: ${chapterTitle}`);
    setSelectedChapter(chapterTitle);
    setCurrentQuestionIndex(0);  // Reset question offset
    setSelectedAnswers({});      // Clear previous answers
    setTotalMarks(0);            // Reset total marks
    setTotalAttempts(0);         // Reset total attempts
    setShowResults(false);       // Hide results if shown previously
    setCorrectAnswers({});       // Clear previous correct answers
  };
  



  const retakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTotalMarks(0);
    setCorrectAnswers({});
    setTotalAttempts(0);
    setShowResults(false);
  };
  



  return (
    <div className="main_wrapper">
      <header className="sticky-top">
        <div className="headerarea headerarea__3 header__area d-flex align-items-center">
          <div className="col-6">

            <IoArrowBackCircleSharp onClick={() => window.history.back()} style={{ fontSize: "30px" }} />

          </div>




          <div className="col-6 text-end">
            <div className="headerarea__right__logo">
              <img
                loading="lazy"
                src="/assets/img/Artboard 1 1.png"
                alt="logo"
                style={{ width: "150px" }}
              />
            </div>
          </div>
          <div className="container desktop__menu__wrapper">
            <div className="row justify-content-between align-items-center" >


            </div>
          </div>
        </div>
      </header>

      <section className="learning-sec">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7 bdr-right   ">
              <div className="custom-sticky sticky-top">
                <ul
                  className="nav about__button__wrap dashboard__button__wrap mb-4 justify-content-between"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className={`single__tab__link ${activeTab === "chapt_video" ? "active" : ""
                        }`}
                      onClick={() => handleTabClick("chapt_video")}
                      type="button"
                      aria-selected={activeTab === "chapt_video"}
                      role="tab"
                    >
                      Video
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`single__tab__link ${activeTab === "books" ? "active" : ""
                        }`}
                      onClick={() => handleTabClick("books")}
                      type="button"
                      aria-selected={activeTab === "books"}
                      role="tab"
                    >
                      Books
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`single__tab__link ${activeTab === "mcqs" ? "active" : ""
                        }`}
                      onClick={() => handleTabClick("mcqs")}
                      type="button"
                      aria-selected={activeTab === "mcqs"}
                      role="tab"
                    >
                      MCQ
                    </button>
                  </li>
                </ul>

                <MediaTab
                  activeTab={activeTab}
                  subjectVideos={subjectVideos}
                  currentMedia={currentMedia}
                  onProgress={handleVideoProgress}
                />

                <BooksTab
                  activeTab={activeTab}
                  books={books}
                  currentMedia={currentMedia}
                />

                <MCQsTab
                  activeTab={activeTab}
                  showResults={showResults}
                  totalAttempts={totalAttempts}
                  totalMarks={totalMarks}
                  groupedMCQs={groupedMCQs}
                  selectedChapter={selectedChapter}
                  currentMCQ={currentMCQ}
                  selectedAnswers={selectedAnswers}
                  correctAnswers={correctAnswers}
                  handleOptionChange={handleOptionChange}
                  handlePreviousQuestion={handlePreviousQuestion}
                  handleSkipQuestion={handleSkipQuestion}
                  handleSubmit={handleSubmit}
                  currentQuestionIndex={currentQuestionIndex}
                  retakeQuiz={retakeQuiz}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="course-layout-content-box custom-sticky sticky-top">
                <div className="inner-title justify-content-between">
                  <div className="inner-title mb-0">
                    <div className="dashboard__single__counter">
                      <img
                        loading="lazy"
                        src={subjectLogo}
                        alt="Logo"
                        width={50}
                      />
                    </div>
                    <div>
                      <h4>{subjectName}</h4>
                      <p>
                        {activeTab === "books"
                          ? `Total Books ${books.length}`
                          : activeTab === "mcqs"
                            ? `Total Chapters ${mcqs.length}`
                            : `  Total Videos ${subjectVideos.length}`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleBackButton}
                    className="default__button "
                  >
                    Back
                  </button>
                </div>
                <div className="accordion accordion-flush" id="courseaccordion">
                  {error ? (
                    <div className="coming-soon">Coming Soon</div>
                  ) : activeTab === "chapt_video" && Object.keys(groupedVideos).length > 0 ? (
                    Object.entries(groupedVideos).map(([chapterTitle, videos], chapterIndex) => (
                      <div className="accordion-item" key={chapterIndex}>
                        <h2 className="accordion-header" id={`sec-heading${chapterIndex + 1}`}>
                          <button
                            className={`accordion-button ${chapterIndex === 0 ? "" : "collapsed"}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#sec${chapterIndex + 1}`}
                            aria-expanded={chapterIndex === 0}
                            aria-controls={`sec${chapterIndex + 1}`}
                          >
                            <span>Chapter {chapterIndex + 1} :</span> {chapterTitle}
                          </button>
                        </h2>
                        <div
                          id={`sec${chapterIndex + 1}`}
                          className={`accordion-collapse collapse ${chapterIndex === 0 ? "show" : ""}`}
                          aria-labelledby={`sec-heading${chapterIndex + 1}`}
                          data-bs-parent="#courseaccordion"
                        >
                          <div className="accordion-body course-layout-content-box-inner ps-0 pe-0">
                            <ul className="nav nav-tabs d-block" role="tablist">
                              {videos.map((video, videoIndex) => {
                                const isLocked = !isSubscribed && video.isLocked;
                                return (
                                  <li className="nav-item d-block" role="presentation" key={video.id || videoIndex}>
                                    <div className="d-flex justify-content-between">
                                      <button
                                        className="nav-link"
                                        onClick={() => handleMediaClick(video.url, isLocked, video.video_id)}
                                      >
                                        {isLocked ? (
                                          <>
                                            <FontAwesomeIcon icon={faLock} className="lock-icon" style={{ padding: "0px 10px" }} />
                                            <span>{video.video_title}</span>
                                          </>
                                        ) : (
                                          <>
                                            <FontAwesomeIcon icon={faCirclePlay} style={{ padding: "0px 10px" }} />
                                            {video.video_title}
                                          </>
                                        )}
                                      </button>

                                      <button
                                        className="nav-link"
                                        onClick={() => handleBookmarkClick(video)}
                                      >
                                        {bookmarkedVideos.includes(video.video_id) ? (
                                          <FaBookmark size={24} /> // Bookmarked icon
                                        ) : (
                                          <FaRegBookmark size={24} /> // Unbookmarked icon
                                        )}
                                      </button>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : activeTab === "books" && Object.keys(groupedBooks).length > 0 ? (
                    Object.entries(groupedBooks).map(([chapterTitle, books], chapterIndex) => (
                      <div className="accordion-item" key={chapterIndex}>
                        <h2 className="accordion-header" id={`sec-heading${chapterIndex + 1}`}>
                          <button
                            className={`accordion-button ${chapterIndex === 0 ? "" : "collapsed"}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#sec${chapterIndex + 1}`}
                            aria-expanded={chapterIndex === 0}
                            aria-controls={`sec${chapterIndex + 1}`}
                          >
                            <span>Book {chapterIndex + 1} :</span> {chapterTitle}
                          </button>
                        </h2>
                        <div
                          id={`sec${chapterIndex + 1}`}
                          className={`accordion-collapse collapse ${chapterIndex === 0 ? "show" : ""}`}
                          aria-labelledby={`sec-heading${chapterIndex + 1}`}
                          data-bs-parent="#courseaccordion"
                        >
                          <div className="accordion-body course-layout-content-box-inner ps-0 pe-0">
                            <ul className="nav nav-tabs d-block" role="tablist">
                              {books.map((book) => (
                                <li className="nav-item d-block" role="presentation" key={book.book_id}>
                                  <button
                                    className="nav-link"
                                    onClick={() => handleMediaClick(book.book_url, false)}
                                  >
                                    <FontAwesomeIcon icon={faBook} style={{ padding: "0px 10px" }} />
                                    {book.book_title}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : activeTab === "mcqs" && Object.keys(groupedMCQs).length > 0 ? (
                    Object.entries(groupedMCQs).map(([chapterTitle, mcqs], chapterIndex) => {
                      const chapterId = mcqs[0]?.chapter_id || chapterIndex + 1;

                      return (
                        <div className="accordion-item" key={chapterId}>
                          <h2 className="accordion-header" id={`sec-heading${chapterId}`}>
                            <button
                              className={`accordion-button ${selectedChapter === chapterTitle ? "" : "collapsed"}`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#sec${chapterId}`}
                              aria-expanded={selectedChapter === chapterTitle}
                              aria-controls={`sec${chapterId}`}

                            >
                              <span>Chapter {chapterId} :</span> {chapterTitle}

                            </button>
                          </h2>
                          <div
                            id={`sec${chapterId}`}
                            className={`accordion-collapse collapse ${chapterIndex === 0 ? "show" : ""}`}
                            aria-labelledby={`sec-heading${chapterId}`}
                            data-bs-parent="#courseaccordion"
                          >
                            <div className="accordion-body course-layout-content-box-inner ps-0 pe-0">
                              <ul className="nav nav-tabs d-block" role="tablist">
                                <li className="nav-item d-block" role="presentation">
                                  <button
                                    className="nav-link"
                                    onClick={() => handleAccordionClick(chapterTitle, chapterId)}
                                  >
                                    {chapterTitle}
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="coming-soon">
                      No content available for this subject.
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <UpgradeModel
        showUpgradeModal={showUpgradeModal}
        handleCloseModal={handleCloseModal}
      />
      <ErrorModal
        showErrorModal={showErrorModal}
        errorMessage={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
    </div>

  );
};

export default StudentVideoSection;
