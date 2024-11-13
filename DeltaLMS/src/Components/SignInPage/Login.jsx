import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice'; // Adjust the import path based on your file structure
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { sendPasswordResetLink } from '../redux/forgotPasswordSlice'; // Import forgot password thunk
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const forgotPasswordState = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success('Login successful');

      // Set the logged-in flag in local storage
      localStorage.setItem('isLoggedIn', 'true');

      if (rememberMe) {
        Cookies.set('email', email, { expires: 7 });
        Cookies.set('password', password, { expires: 7 });
      } else {
        Cookies.remove('email');
        Cookies.remove('password');
      }
      navigate('/studentDashboard');
    } else {
      toast.error('Login failed: ' + (resultAction.payload?.message || 'An unexpected error occurred'));
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      // Redirect to student dashboard if already logged in
      navigate('/studentDashboard');
    }

    // Optional: Check if credentials are saved
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, [navigate]);



  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(sendPasswordResetLink(forgotPasswordEmail));

    if (sendPasswordResetLink.fulfilled.match(resultAction)) {
      toast.success('Password reset link has been sent to your email');
      setShowForgotPassword(false);
    } else {
      toast.error('Failed to send password reset link: ' + (resultAction.payload?.message || 'An unexpected error occurred'));
    }
  };





  return (
    <>
      <main className="main_wrapper overflow-hidden">
        <section className="login-page">
          <Link className="loginlogo" to="/">
            <img src="assets/img/logo/logo_2.png" alt="logo_2" />
          </Link>
          <div className="container">
            <div className="row align-items-center">
              {/* Hide this on small screens */}
              <div className="col-lg-6 d-none d-lg-block">
                <div className="p-lg-5 px-3 py-5 dark-bg text-center">
                  <img className="img-fluid" src="assets/img/login-img.png" alt="" />
                  <div className="section-title mb-0 mt-5 text-white">
                    <h2 className="text-white">Welcome To The DeltaView</h2>
                    <p className="mb-0 text-light">
                      Any Question or Remarks? Just Write Us a Message!
                    </p>
                  </div>
                </div>
              </div>

              {/* Form section visible on all screen sizes */}
              <div className="col-lg-6 col-12">
                <div className="p-lg-5 px-3 py-5 bg-white rounded-4">
                  <h3 className="mb-4">
                    {showForgotPassword ? 'Forgot Password' : 'Login Your Account'}
                  </h3>
                  {showForgotPassword ? (
                    <form onSubmit={handleForgotPassword}>
                      <div className="form-group">
                        <input
                          type="email"
                          name="forgotPasswordEmail"
                          className="form-control"
                          placeholder="Enter your email"
                          required
                          value={forgotPasswordEmail}
                          onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="default__button w-100"
                        disabled={forgotPasswordState.loading}
                      >
                        {forgotPasswordState.loading ? (
                          <div className="d-flex justify-content-center">
                            <div className="spinner-border text-light" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : (
                          <span>Send Reset Link</span>
                        )}
                      </button>
                      <button
                        type="button"
                        className="default__button w-100 mt-2"
                        onClick={() => setShowForgotPassword(false)}
                      >
                        Back to Login
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleLogin}>
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group position-relative">
                        <input
                          type={passwordVisible ? 'text' : 'password'}
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                          {passwordVisible ? <FaEye/> : <FaEyeSlash />}
                        </span>
                      </div>
                      <div className="form-group mt-4 mb-4">
                        <div className="remember-checkbox d-flex align-items-center justify-content-between">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="remember"
                              checked={rememberMe}
                              onChange={() => setRememberMe(!rememberMe)}
                            />
                            <label className="form-check-label" htmlFor="remember">
                              Remember me
                            </label>
                          </div>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => setShowForgotPassword(true)}
                          >
                            Forgot Password?
                          </button>
                        </div>
                      </div>
                      <button type="submit" className="default__button w-100" disabled={loading}>
                        {loading ? (
                          <div className="d-flex justify-content-center">
                            <div className="spinner-border text-light" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : (
                          <span>Login Now</span>
                        )}
                      </button>
                    </form>
                  )}
                  <div className="dont-account d-flex align-items-center mt-3 justify-content-center">
                    <span className="text-black me-1">
                      Don't have an account? <Link to="/signup">Sign Up</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default Login;
