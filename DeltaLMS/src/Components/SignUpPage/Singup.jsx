import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp, signup, resetOtp } from '../redux/authSlice';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [emailAlreadyVerified, setEmailAlreadyVerified] = useState(false);
  const [completeProfileStep, setCompleteProfileStep] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false); // State to control OTP visibility for mobile
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    otpSent,
    otpVerified,
    otpExpiry,
    loading,

  } = useSelector((state) => state.auth);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Track if device is mobile

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Update timer for OTP expiry
  useEffect(() => {
    let timer;
    if (otpSent && otpExpiry) {
      timer = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((otpExpiry - now) / 1000));
        setTimeRemaining(remaining);
        if (now > otpExpiry) {
          dispatch(resetOtp()); // Reset OTP when expired
          setModalIsOpen(false);
          clearInterval(timer);
        }
      }, 1000);
    } else {
      setTimeRemaining(null);
    }
    return () => clearInterval(timer);
  }, [otpSent, otpExpiry, dispatch]);

  // Reset form states when navigating away from the signup page
  useEffect(() => {
    return () => {
      setEmail('');
      setOtp('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setOtpVisible(false);
      setModalIsOpen(false);
      setTimeRemaining(null);
      setEmailAlreadyVerified(false);
      setCompleteProfileStep(false);
      dispatch(resetOtp()); // Reset OTP-related states
    };
  }, [dispatch]);

  const handleSendOtp = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return; // Stop execution if the email is invalid
    }

    if (otpSent && Date.now() < otpExpiry) {
      toast.info('OTP already sent. Please wait before requesting a new one.');
      return;
    }

    setSpinnerVisible(true);

    dispatch(sendOtp(email)).then(({ error, payload }) => {
      setSpinnerVisible(false);


      if (error) {
        toast.error(`Error: ${payload.message}`);
      } else {
        if (payload.message === 'Email already exists') {
          toast.error('Your email already exists. Redirecting to login.');
          setTimeout(() => {
            navigate('/login');
          }, 3000); // Increase delay slightly to ensure toast is shown before redirect
        } else if (payload.message === 'Your email is verified. Please complete the remaining steps') {
          // Email is verified but profile is incomplete
          setCompleteProfileStep(true);
          setEmailAlreadyVerified(true);
          toast.info('Your email is already verified. Please complete your profile.');
        } else if (payload.message === 'Your account is fully verified. Please login') {
          // Account fully verified, redirect to login
          toast.info('Your account is fully verified. Redirecting to login.');

          // Ensure OTP section is hidden and the user is redirected
          setEmailAlreadyVerified(true);
          // setOtpSent(false); // Prevent the OTP UI from rendering
          setTimeout(() => {
            navigate('/login'); // Redirect to login after showing the message
          }, 3000); // Increased the delay to 3 seconds to ensure the toast is displayed
        } else {
          // OTP sent successfully
          toast.success(payload.message || 'OTP sent successfully!');
          // setOtpSent(true); 
          if (window.innerWidth <= 768) {
            setModalIsOpen(true); // Open modal on mobile
          } else {
            setOtpVisible(true); // Show OTP input directly on larger screens
          }
        }
      }
    });
  };







  const handleVerifyOtp = () => {
    const otpRegex = /^\d{6}$/;

    if (!otpRegex.test(otp)) {
      toast.error('OTP must be a 6-digit number.');
      return;
    }

    setSpinnerVisible(true);

    dispatch(verifyOtp({ otp, email }))
      .unwrap()
      .then((payload) => {
        setSpinnerVisible(false);

        // Handle successful OTP verification
        if (payload.message === 'OTP verification successful') {
          toast.success('OTP verified successfully!');
          setEmailAlreadyVerified(true);

          if (payload.nextStep === 'completeProfile') {
            setCompleteProfileStep(true); // Proceed to next step
          }
          setModalIsOpen(false); // Close modal after successful verification
        }
      })
      .catch((error) => {
        setSpinnerVisible(false);

        // Display specific error message
        if (error.error === "Wrong OTP") {
          toast.error("Wrong OTP");
        } else {
          toast.error(error.error || "Something went wrong");
        }
      });
  };






  const handleSignup = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    // Check for empty fields
    if (!username || !email || !password || !confirmPassword) {
      toast.error('All fields are required.');
      return; // Stop execution if any field is empty
    }

    // Check if the password meets the required format
    if (!passwordRegex.test(password)) {
      toast.error('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.');
      return; // Stop execution if the password is invalid
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return; // Stop execution if passwords do not match
    }

    // Proceed to signup if all validations pass
    if (otpVerified || emailAlreadyVerified || completeProfileStep) {
      dispatch(signup({ username, password, confirmPassword, email })).then(({ payload, error }) => {
        if (error) {
          // Log the error to see the full object
          console.error("Signup error:", error);
          // Show backend error message if available
          const errorMessage = error?.data?.message || 'An unexpected error occurred.';
          toast.error(`Error: ${errorMessage}`);
        } else {
          const { token, message } = payload;
          if (token) {
            localStorage.setItem('token', token);
            toast.success(message || 'Signup successful!');
            setTimeout(() => {
              navigate('/selectboard');
            }, 2000);
          } else {
            toast.error('Signup failed. Token not received.');
          }
        }
      });
    } else {
      toast.info('Please verify OTP before signing up.');
    }
  };




  const handleEditEmail = () => {
    dispatch(resetOtp());
    setEmail('');
    setOtp('');
    setTimeRemaining(null);

    setEmailAlreadyVerified(false); // Reset email already verified status
    setEmailExists(false); // Reset email exists status
    setCompleteProfileStep(false); // Reset the profile step status
  };

  return (
    <section className="login-page">
      <Link to="/" className="loginlogo">
        <img src="assets/img/logo/logo_2.png" alt="logo_2" />
      </Link>

      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="p-lg-5 px-3 py-5 dark-bg text-center">
              <img className="img-fluid" src="assets/img/signup.png" alt="" />
              <div className="section-title mb-0 mt-5 text-white">
                <h2 className="text-white">Welcome To The DeltaView</h2>
                <p className="mb-0 text-light">Enter the right details to sign up</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="p-lg-5 px-3 py-5 bg-white rounded-4">
              <h3 className="mb-4">Sign Up Your Account</h3>
              <form method="post" action="#">
                <div className="form-group">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    placeholder="User name"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Email"
                    autoComplete="off"
                    disabled={otpSent || emailAlreadyVerified}
                  />
                  <small className={`exsmall ${emailAlreadyVerified ? 'text-success' : ''}`}>
                    {emailAlreadyVerified ? 'Verified' : 'Verify Your Email'}
                  </small>
                  {otpSent && !emailAlreadyVerified && (
                    <>
                      <small className="exsmall text-danger btn-link" onClick={handleEditEmail}>
                        Edit Email
                      </small>
                      <button
                        type="button"
                        className="verify-email-btn"
                        onClick={handleSendOtp}
                        disabled={loading}
                      >
                        {spinnerVisible && loading ? (
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : otpSent ? (
                          <i className="fa-regular fa-check-circle" />
                        ) : (
                          <i className="fa-regular fa-circle-right" />
                        )}
                      </button>
                    </>
                  )}
                  {!otpSent && !emailAlreadyVerified && (
                    <button
                      type="button"
                      className="verify-email-btn"
                      onClick={handleSendOtp}
                      disabled={loading}
                    >
                      {spinnerVisible && loading ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <i className="fa-regular fa-circle-right" />
                      )}
                    </button>
                  )}
                </div>
                {otpSent && !otpVerified && !emailAlreadyVerified && otpVisible && (
                  <div className="form-group">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="form-control"
                      placeholder="OTP"
                      autoComplete="off"
                    />
                    <small className="exsmall">
                      Time Remaining: {timeRemaining !== null ? `${timeRemaining} seconds` : 'Calculating...'}
                    </small>
                    
                    <button
                      type="button"
                      className="verify-email-btn otpverify"
                      onClick={handleVerifyOtp}
                      disabled={loading || !otp}
                    >
                      {spinnerVisible ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : 'Verify'}
                    </button>
                  </div>
                )}



                <div className="form-group  position-relative">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                    autoComplete="off"
                  />
                   <span
                  className="position-absolute eye-icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  style={{
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
                </div>
               
                <div className="form-group  position-relative">
                  <input
                   type={confirmPasswordVisible ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control"
                    placeholder="Confirm Password"
                    autoComplete="off"
                  />
                  <span
                  className="position-absolute eye-icon"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  style={{
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
                >
                
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
                </div>
                
                <button
                  type="button"
                  className="default__button w-100"
                  onClick={handleSignup}
                // disabled={loading || !(otpVerified || emailAlreadyVerified)}
                >
                  <span>Sign Up</span>
                </button>
              </form>
              <div className="dont-account d-flex align-items-center mt-3 justify-content-center">
                <span className="text-black me-1">
                  Already have an account? <Link to="/login">Login</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      <Modal show={modalIsOpen} centered onHide={() => setModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formOtp">
            <Form.Control
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              autoComplete="off"
            />
            <small>
              OTP {timeRemaining ? `${timeRemaining}s` : 'Expired'}
            </small>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>

          <Button  onClick={handleVerifyOtp} disabled={loading} className="default__button w-100">
            {spinnerVisible && loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            ) : (
              'Verify OTP'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Signup;
