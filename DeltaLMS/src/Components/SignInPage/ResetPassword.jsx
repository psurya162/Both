import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/resetPassword'; // Adjust the import path based on your file structure
import { toast } from 'sonner';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const { token } = useParams(); // Get token from URL parameters
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.resetPassword);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await dispatch(resetPassword({ token, newPassword, confirmPassword })).unwrap();
      toast.success('Password has been reset successfully');
      setIsPasswordReset(true);

      // Navigate away after 3 minutes
      setTimeout(() => {
        navigate('/login'); // Adjust the route as needed
      }, 2000); // 180000 milliseconds = 3 minutes
    } catch (error) {
      toast.error('Failed to reset password');
      console.error('Error resetting password:', error);
    }
  };

  return (
    <main className="main_wrapper overflow-hidden">
      <section className="reset-password-page">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto">
              <div className="p-lg-5 px-3 py-5 bg-white rounded-4">
                {isPasswordReset ? (
                  <div className="text-center">
                    <img src="/path/to/success-tick.png" alt="Success Tick" className="img-fluid" />
                    <h3 className="mt-4">Password has been reset successfully</h3>
                  </div>
                ) : (
                  <>
                    <h3 className="mb-4">Reset Your Password</h3>
                    <form onSubmit={handleResetPassword}>
                      <div className="form-group mb-3">
                        <input
                          type="password"
                          name="newPassword"
                          className="form-control"
                          placeholder="New Password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form-control"
                          placeholder="Confirm Password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="default__button w-100" disabled={loading}>
                        {loading ? (
                          <div className="d-flex justify-content-center">
                            <div className="spinner-border text-light" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : (
                          <span>Reset Password</span>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
