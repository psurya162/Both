import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import StudentHeader from "./StudentHeader";
import StudentSidebar from "./StudentSidebar";
import {
  fetchUserData,
  fetchUserSubjects,
  updateGrade,
  updateStream,
  updateLanguage,
  updateBoard,
} from '../redux/authSlice';
import Loader from "./Loader";
import ClassModel from "./Modals/ClassModel";
import StreamModal from "./Modals/StreamModal";
import LanguageModal from "./Modals/LanguageModal";
import BoardModel from "./Modals/BoardModel";
import { toast } from 'sonner';

const StudentLayout = () => {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.auth);

  const [isDataFetched, setIsDataFetched] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showStreamModal, setShowStreamModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [pendingGrade, setPendingGrade] = useState('');
  const [selectedStream, setSelectedStream] = useState(null); // Track selected stream

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle function for the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!isDataFetched) {
      dispatch(fetchUserData()).then(() => setIsDataFetched(true));
    }
  }, [dispatch, isDataFetched]);

  useEffect(() => {
    if (userData?.grade) {
      setSelectedClass(userData.grade);
    }
    if (userData?.language_id) {
      const languageMap = {
        '1': 'English',
        '2': 'Hindi',
      };
      setSelectedLanguage(languageMap[userData.language_id]);
    }
    if (userData?.board_id) {
      const boardMap = {
        '1': 'CBSE',
        '2': 'ICSE',
      };
      setSelectedBoard(boardMap[userData.board_id]);
    }
  }, [userData]);

  useEffect(() => {
    if (selectedClass) {
      dispatch(fetchUserSubjects());
    }
  }, [dispatch, selectedClass]);

  const handleClassClick = () => setShowClassModal(true);

  const handleClassSelect = (grade) => {
    setSelectedStream(null); // Reset selectedStream when changing classes

    if (grade === '11' || grade === '12') {
      setPendingGrade(grade);
      setShowStreamModal(true);
    } else {
      setSelectedClass(grade);
      dispatch(updateGrade(grade));
    }
    setShowClassModal(false);
  };

  const handleStreamSelect = (stream) => {
    dispatch(updateStream(stream));
    dispatch(updateGrade(pendingGrade));
    setSelectedClass(pendingGrade);
    setSelectedStream(stream); // Set the selected stream
    setShowStreamModal(false);
  };

  const handleCloseModal = (modal) => {
    switch (modal) {
      case "class":
        setShowClassModal(false);
        break;
      case "stream":
        setShowStreamModal(false);
        setPendingGrade('');
        break;
      case "language":
        setShowLanguageModal(false);
        break;
      case "board":
        setShowBoardModal(false);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (selectedStream) {
      
      dispatch(fetchUserSubjects());
    }
  }, [dispatch, selectedStream]);
  

  const handleLanguageSelect = (languageId) => {
    const languageMap = {
      '1': 'English',
      '2': 'Hindi',
    };
    const selectedLang = languageMap[languageId];
    setSelectedLanguage(selectedLang);
    
    // Dispatch the action to update the language
    dispatch(updateLanguage(languageId))
      .unwrap()
      .then(() => {
        // Fetch user data again to ensure it reflects the updated language
        dispatch(fetchUserData()).unwrap().then(() => {
          dispatch(fetchUserSubjects()); // Fetch subjects based on updated data
        });
        setShowLanguageModal(false);
      })
      .catch(() => {
        toast.error("Failed to update language");
      });
  };
  

  const handleBoardSelect = (board) => {
    const boardMap = {
      'CBSE': '1',
      'ICSE': '2',
    };
    const boardId = boardMap[board];

    if (!boardId) {
      toast.error("Invalid board selection");
      return;
    }

    setSelectedBoard(board);
    dispatch(updateBoard({ board_id: boardId }))
      .unwrap()
      .then(() => {
        dispatch(fetchUserSubjects());
        setShowBoardModal(false);
      })
      .catch(() => {
        toast.error("Failed to update board");
      });
  };

  const handleOpenLanguageModal = () => setShowLanguageModal(true);
  const handleCloseLanguageModal = () => handleCloseModal("language");
  const handleOpenBoardModal = () => setShowBoardModal(true);

  if (loading && !isDataFetched) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="main_wrapper">
      <StudentHeader
        grade={userData?.grade}
        selectedLanguage={selectedLanguage}
        selectedBoard={selectedBoard}
        onGradeClick={handleClassClick}
        onLanguageClick={handleOpenLanguageModal}
        onBoardClick={handleOpenBoardModal}
      />
      <div className="dashboard">
        <div className="container-fluid full__width__padding">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12">
              <StudentSidebar />
            </div>
            <div className="col-xl-9 col-lg-9 col-md-12">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <ClassModel
        show={showClassModal}
        handleClose={() => handleCloseModal("class")}
        handleClassSelect={handleClassSelect}
        selectedClass={selectedClass}
      />
      <StreamModal
        show={showStreamModal}
        handleClose={() => handleCloseModal("stream")}
        handleStreamSelect={handleStreamSelect}
        selectedStream={selectedStream} // Pass selectedStream to StreamModal if needed
      />
      <LanguageModal
        show={showLanguageModal}
        handleCloseModal={handleCloseLanguageModal}
        handleLanguageSelect={handleLanguageSelect}
      />
      <BoardModel
        show={showBoardModal}
        handleClose={() => handleCloseModal("board")}
        handleBoardSelect={handleBoardSelect}
        selectedBoard={selectedBoard}
      />
    </div>
  );
};

export default StudentLayout;
