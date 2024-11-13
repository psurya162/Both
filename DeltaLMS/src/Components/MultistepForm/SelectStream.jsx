import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "sonner";
import { useDispatch, useSelector } from 'react-redux';
import { selectStream } from '../redux/authSlice';

const SelectStream = () => {
  const [localStream, setLocalStream] = useState(null); // Local state to manage stream selection
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userData } = useSelector(state => state.auth); // Access loading and userData

  // Mapping stream names to their corresponding numeric codes
  const streamMapping = {
    Science: 1,
    Commerce: 2,
    Arts: 3
  };

  useEffect(() => {
    // Set local stream based on userData when the component mounts
    if (userData?.stream) {
      setLocalStream(userData.stream);
    }
  }, [userData]);

  const handleStreamSelect = (stream) => {
    setLocalStream(streamMapping[stream]); // Update local state
    toast.info(`You Selected the ${stream}`);
  };

  const handleNext = async () => {
    if (localStream === null) {
      toast.error("Please select a stream.");
      return;
    }

    try {
      await dispatch(selectStream(localStream)).unwrap(); // Pass numeric code
      toast.success("Stream selected successfully");

      setTimeout(() => {
        navigate("/studentDashboard");
      }, 2000);
    } catch (error) {
      console.error("Error selecting stream:", error);
      toast.error("Failed to select stream");
    }
  };

  return (
    <main className="main_wrapper overflow-hidden">
      <section className="login-steps steps-bg">
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <Link to="/select-class" className="loginlogo">
                <i className="fa-solid fa-angles-left"></i> <span>Back</span>
              </Link>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col lg={4} className="mx-auto text-center">
              <div className="select-board-box">
                <img src="/assets/img/logo/delta-view-logo.png" alt="logo_2" />
                <div className="select-board">
                  <h4>Select Your Stream</h4>
                  <ul className="list-box">
                    <li>
                      <Link
                        onClick={() => handleStreamSelect("Arts")}
                        className={localStream === 3 ? "active" : ""}
                      >
                        <img src="/assets/img/art.png" alt="Arts" /> Arts
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => handleStreamSelect("Commerce")}
                        className={localStream === 2 ? "active" : ""}
                      >
                        <img src="/assets/img/commerce.png" alt="Commerce" /> Commerce
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => handleStreamSelect("Science")}
                        className={localStream === 1 ? "active" : ""}
                      >
                        <img src="/assets/img/science.png" alt="Science" /> Science
                      </Link>
                    </li>
                  </ul>
                  <Button
                    className="default__button w-100"
                    onClick={handleNext}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Next'}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default SelectStream;
