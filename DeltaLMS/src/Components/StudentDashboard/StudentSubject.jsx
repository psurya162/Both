import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSubjects } from '../redux/authSlice';
import { fetchSubjectVideos, fetchSubjectBooks, clearBooks, clearMCQs, fetchSubjectMCQs } from '../redux/videoSlice';
import { useNavigate } from 'react-router-dom';
import { MdSubject } from "react-icons/md";
const StudentSubject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userSubjects, loading, error, userData } = useSelector((state) => state.auth);
  

  useEffect(() => {
    if (userSubjects.length === 0) {
      dispatch(fetchUserSubjects());
    }
  }, [dispatch, userSubjects.length]);

  const handleSubjectClick = (subject) => {
    const subjectId = subject.id;
    const langId = userData.language_id;

    // Check if langId is defined
    if (!langId) {
      console.error('Language ID is undefined.');
      return; // Exit if langId is not available
    }



    dispatch(clearBooks());
    dispatch(clearMCQs()); // Clear previous MCQs data

    dispatch(fetchSubjectVideos({ subjectId, langId }))
      .then(() => {
       
        navigate(`/studentDashboard/subject/${subjectId}/${langId}`, {
          state: { subjectLogo: subject.subject_logo, subjectName: subject.subject_name }
        });
      })
      .catch((error) => {
        console.error('Error fetching subject videos:', error);
      });

    dispatch(fetchSubjectBooks(subjectId))
      .catch((error) => {
        console.error('Error fetching subject books:', error);
      });

    dispatch(fetchSubjectMCQs(subjectId))
      .catch((error) => {
        console.error('Error fetching subject MCQs:', error);
      });
  };

  if (loading) {
    return (
      <div className="dashboard__content__wraper">
        <div className="dashboard__section__title">
          <h4>Subject</h4>
        </div>
        <div className="text-center">
          <p>Loading subjects...</p>
          <p>Please wait while we fetch your subjects.</p>
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard__content__wraper">
      <div className="dashboard__section__title">
        <h4> <MdSubject  style={{marginRight:"10px"}}/>Subject</h4>
      </div>
      <div className="row">
        {/* Check if there are no subjects */}
        {userSubjects.length === 0 ? (
          <div className="col-12 text-center">
            <h5>Coming Soon</h5> {/* Display "Coming Soon" message */}
          </div>
        ) : (
          userSubjects.map((subject) => (
            <div key={subject.id} className="col-lg-auto col-12 fix-width168 d-flex">
              <div
                onClick={() => handleSubjectClick(subject)}
                className="dashboard__single__counter"
                role="button"
                tabIndex={0}
              >
                <div className="counterarea__text__wraper d-block text-center">
                  <div className="counter__img mb-2 me-0">
                    <img
                      className="img-logo"
                      loading="lazy"
                      src={subject.subject_logo}
                      alt="counter"
                    />
                  </div>
                  <div className="counter__content__wraper">
                    <p>{subject.subject_name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentSubject;
