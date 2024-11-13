import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="headerarea headerarea__3 header__sticky header__area">
        <div className="container desktop__menu__wrapper ">
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-6">
              <div className="headerarea__left">
                <div className="headerarea__left__logo">
                  <Link to="/">
                    <img
                      loading="lazy"
                      src="assets/img/logo/delta-view-logo.png"
                      className="img-fluid"
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 main_menu_wrap">
              <div className="headerarea__main__menu">
                <nav>
                  <ul>
                    <li className="mega__menu position-static">
                      <NavLink
                        exact
                        activeClassName="active"
                        className="headerarea__has__dropdown"
                        to="/"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="mega__menu position-static">
                      <NavLink
                        activeClassName="active"
                        className="headerarea__has__dropdown"
                        to="/about-us"
                      >
                        About Us
                      </NavLink>
                    </li>
                    <li className="mega__menu position-static">
                      <NavLink
                        activeClassName="active"
                        className="headerarea__has__dropdown"
                        to="/Delta-view-app"
                      >
                        DeltaView App
                      </NavLink>
                    </li>
                    <li className="mega__menu position-static">
                      <NavLink
                        activeClassName="active"
                        className="headerarea__has__dropdown"
                        to="/Delta-Partner"
                      >
                        Partner with DeltaView
                      </NavLink>
                    </li>
                    <li className="mega__menu position-static">
                      <NavLink
                        activeClassName="active"
                        className="headerarea__has__dropdown"
                        to="/contact-us"
                      >
                        Contact Us
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6">
              <div className="headerarea__right">
                <div className="headerarea__login">
                  <Link to="/login">
                    <i className="fa-solid fa-user"></i> Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mob_menu_wrapper">
          <div className="row align-items-center">
            <div className="col-6">
              <div className="mobile-logo">
                <Link className="logo__dark" to="/">
                  <img
                    loading="lazy"
                    src="assets/img/logo/delta-view-logo.png"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
            <div className="col-6">
              <div className="header-right-wrap">
                <div className="mobile-off-canvas">
                  <Link className="mobile-aside-button" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`mobile-off-canvas-active ${isMenuOpen ? "inside" : ""}`}>
        <Link className="mobile-aside-close" onClick={toggleMenu}>
          <i className="fa fa-close" />
        </Link>
        <div className="header-mobile-aside-wrap">
          <div className="mobile-menu-wrap headerarea">
            <div className="mobile-navigation">
              <nav>
                <ul className="mobile-menu">
                  <li>
                    <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about-us" onClick={toggleMenu}>About Us</NavLink>
                  </li>
                  <li>
                    <NavLink to="/Delta-view-app" onClick={toggleMenu}>Delta View App</NavLink>
                  </li>
                  <li>
                    <NavLink to="/Delta-Partner" onClick={toggleMenu}>Partner with DeltaView</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact-us" onClick={toggleMenu}>Contact US</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" onClick={toggleMenu}>Login</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
