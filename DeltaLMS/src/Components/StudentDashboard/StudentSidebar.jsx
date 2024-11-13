import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../redux/authSlice';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { GrLicense } from "react-icons/gr";

const StudentSidebar = () => {
  const { userData } = useSelector((state) => state.auth);

  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await dispatch(logoutAction());
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="dashboard__inner sticky-top">
      <div className="dashboard__nav__title">
        <h6>
          <span>Welcome</span>, {userData?.name || 'User'}
        </h6>
      </div>
      <div className="dashboard__nav">
        <ul>
          <li>
            <Link to="/studentDashboard" className={getLinkClass('/studentDashboard')}>
              <FontAwesomeIcon icon={faHome} /> Home 
              
            </Link>
          </li>
          <li>
            <Link to="/studentDashboard/profile" className={getLinkClass('/studentDashboard/profile')}>
              <FontAwesomeIcon icon={faUser} /> Edit Profile
            </Link>
          </li>
          <li>
            <Link to='/studentDashboard/report' className={getLinkClass('/studentDashboard/report')}>
              <FontAwesomeIcon icon={faUser} /> Report
            </Link>
          </li>
          {/* <li>
            <Link to='/studentDashboard/license' className={getLinkClass('/studentDashboard/license')}>
            <GrLicense /> License
            </Link>
          </li> */}
          <li>
            <Link onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentSidebar;
