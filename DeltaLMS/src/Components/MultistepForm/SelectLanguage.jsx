import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setSelectedLanguage, updateLanguage, fetchUserData } from '../redux/authSlice';
import { toast } from 'sonner';
import { Row, Col } from 'react-bootstrap';

const SelectLanguage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedLanguage = useSelector((state) => state.auth.selectedLanguage);
  const { userData } = useSelector(state => state.auth);

  useEffect(() => {
    // Fetch user data when the component mounts
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (userData && userData.language_id) {
      dispatch(setSelectedLanguage(userData.language_id.toString())); // Ensure it's a string
    }
  }, [dispatch, userData]);

  const handleLanguageSelect = (language) => {
    dispatch(setSelectedLanguage(language));
  };

  const handleNext = () => {
    if (!selectedLanguage) {
      toast.error("Please select a language.");
      return;
    }

    dispatch(updateLanguage(selectedLanguage))
      .unwrap()
      .then(() => {
        navigate('/select-class');
      })
      .catch((error) => {
        console.error("Failed to update language:", error);
        toast.error("Failed to update language. Please try again.");
      });
  };

  return (
    <main className="main_wrapper overflow-hidden">
      <section className="login-steps steps-bg">
        <div className="container">
          <Row>
            <Col lg={12} className="text-center">
              <Link className="loginlogo" to="/selectboard">
                <i className="fa-solid fa-angles-left"></i><span>Back</span>
              </Link>
            </Col>
          </Row>
          <div className="row align-items-center">
            <div className="col-lg-5 mx-auto text-center">
              <div className="select-board-box">
                <img src="/assets/img/logo/delta-view-logo.png" alt="logo_2" />
                <div className="select-board">
                  <h4>Choose Your Preferred Language</h4>
                  <ul className="list-box">
                    <li>
                      <Link 
                        className={selectedLanguage === '1' ? 'active' : ''} 
                        onClick={(e) => { e.preventDefault(); handleLanguageSelect('1'); }}
                      >
                        English
                      </Link>
                    </li>
                    <li>
                      <Link 
                        className={selectedLanguage === '2' ? 'active' : ''} 
                        onClick={(e) => { e.preventDefault(); handleLanguageSelect('2'); }}
                      >
                        Hindi
                      </Link>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="default__button w-100"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SelectLanguage;
