import React, { useState } from "react";
import { NavLink ,useNavigate ,useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../redux/authSlice';

const StudentHeader = ({
  selectedBoard,
  grade,
  selectedLanguage,
  onGradeClick,
  onLanguageClick,
  onBoardClick,
}) => {

  const { userData } = useSelector((state) => state.auth);
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
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // Function to handle menu item click
  const handleMenuItemClick = () => {
    setMenuOpen(false); // Close the mobile menu
  };
  const getLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      <header className="sticky-top">
        <div className="headerarea headerarea__3 header__area pt-3 pb-3">
          <div className="container desktop__menu__wrapper">
            <div className="row">
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12">
                <div className="headerarea__left justify-content-between">
                  <div className="headerarea__left__logo">
                    <img
                      loading="lazy"
                      src="assets/img/logo/delta-view-logo.png"
                      className="img-fluid"
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 main_menu_wrap text-end">
                <div className="admin-header-menu">
                  <ul>
                    <li>
                      <a href="#" onClick={onGradeClick}>
                        Class {grade} <i className="icofont-rounded-down" />
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={onLanguageClick}>
                        {selectedLanguage}
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={onBoardClick}>
                        {selectedBoard}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="container-fluid mob_menu_wrapper">
            <div className="row align-items-center">
              <div className="col-6">
                <div className="mobile-logo">
                  <a className="logo__dark">
                    <img
                      loading="lazy"
                      src="assets/img/logo/delta-view-logo.png"
                      className="img-fluid"
                      alt="logo"
                    />
                  </a>
                </div>
              </div>
              <div className="col-6 text-end">
                <div className="header-right-wrap">
                  <div className="mobile-off-canvas">
                    <a
                      className="mobile-aside-button"
                      href="#"
                      onClick={toggleMenu}
                    >
                      <i className="icofont-navigation-menu" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-10 col-lg-10 main_menu_wrap text-end">
                <div className="admin-header-menu">
                  <ul>
                    <li>
                      <a href="#" onClick={onGradeClick}>
                        Class {grade} <i className="icofont-rounded-down" />
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={onLanguageClick}>
                        {selectedLanguage}
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={onBoardClick}>
                        {selectedBoard}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
          </div>
        </div>
      </header>

      {/* Mobile Off-Canvas Menu */}
      <div
        className={`mobile-off-canvas-active ${isMenuOpen ? "inside" : ""}`}
      >
        <a className="mobile-aside-close" onClick={toggleMenu}>
          <i className="icofont icofont-close-line" />
        </a>
        <div className="header-mobile-aside-wrap">
          <div className="dashboard__nav__title">
            <h6>
              <span>Welcome</span>, {userData?.name || 'User'}
            </h6>
          </div>
          <div className="mobile-menu-wrap headerarea">
            <div className="mobile-navigation">
              <nav>
                <ul className="mobile-menu">
                  <li>
                    <NavLink to="/studentDashboard" onClick={handleMenuItemClick}>
                      <FontAwesomeIcon icon={faHome} /> Home

                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/studentDashboard/profile" onClick={handleMenuItemClick}>
                      <FontAwesomeIcon icon={faUser} /> Edit Profile
                    </NavLink>
                  </li>
                  <li>
                  <NavLink to='/studentDashboard/report' className={getLinkClass('/studentDashboard/report')}  onClick={handleMenuItemClick}>
                      <FontAwesomeIcon icon={faUser} /> Report
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#" onClick={handleLogout} >
                      <FontAwesomeIcon icon={faSignOutAlt}  /> Logout
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="mobile-social-wrap">
            <a className="facebook" href="#">
              <i className="icofont icofont-facebook" />
            </a>
            <a className="twitter" href="#">
              <i className="icofont icofont-twitter" />
            </a>
            <a className="pinterest" href="#">
              <i className="icofont icofont-pinterest" />
            </a>
            <a className="instagram" href="#">
              <i className="icofont icofont-instagram" />
            </a>
            <a className="google" href="#">
              <i className="icofont icofont-youtube-play" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHeader;
