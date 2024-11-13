import React, { useState } from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  const [userEmail, setUserEmail] = useState("")

  const HandleChange = (e) => {
    setUserEmail(e.target.value)
  }

  const handleSubmit = () => {
    // alert(`Your email is ${userEmail}`)
    console.log(`Your email is ${userEmail}`);
  }
  return (
    <>
      <div className="footerarea">
        <div className="container">
          <div className="footerarea__newsletter__wraper">
            <div className="row">
              <div
                className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12"
                data-aos="fade-up"
              >
                <div className="footerarea__text">
                  <h3>
                    Still You Need Our <span>Support</span> ?
                  </h3>
                  <p>
                    Don’t wait make a smart &amp; logical quote here. Its pretty easy.
                  </p>
                </div>
              </div>
              <div
                className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12"
                data-aos="fade-up"
              >
                <div className="footerarea__newsletter">
                  <div className="footerarea__newsletter__input">
                    <form action="#">
                      <input type="text" placeholder="Enter your email here" />
                      <div className="footerarea__newsletter__button">
                        <button type="submit" className="subscribe__btn">
                          Subscribe Now
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footerarea__wrapper footerarea__wrapper__2">
            <div className="row">
              <div
                className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12"
                data-aos="fade-up"
              >
                <div className="footerarea__inner">
                  <div className="footerarea__heading">
                    <h3>Usefull Links</h3>
                  </div>
                  <div className="footerarea__list">
                    <ul>
                      <li>
                        <Link to="#">About Us</Link>
                      </li>
                      <li>
                        <Link to="#">Teachers</Link>
                      </li>
                      <li>
                        <Link to="#">Partner</Link>
                      </li>
                      <li>
                        <Link to="#">Room-Details</Link>
                      </li>
                      <li>
                        <Link to="#">Gallery</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12"
                data-aos="fade-up"
              >
                <div className="footerarea__right__wraper footerarea__inner">
                  <div className="footerarea__heading">
                    <h3>Social Media</h3>
                  </div>
                  <div className="footerarea__icon">
                    <ul>
                      <li>
                        <Link to="http://facebook.com/" target="_blank">
                          <i class="fa-brands fa-facebook"></i> Facebook
                        </Link>
                      </li>
                      <li>
                        <Link to="http://twitter.com/" target="_blank">
                          <i class="fa-brands fa-twitter"></i> Twitter
                        </Link>
                      </li>
                      <li>
                        <Link to="http://linkedin.com/" target="_blank">
                          <i class="fa-brands fa-linkedin"></i> Linkedin
                        </Link>
                      </li>
                      <li>
                        <Link to="http://instagram.com/" target="_blank">
                          <i class="fa-brands fa-instagram"></i> Instagram
                        </Link>
                      </li>
                      <li>
                        <Link to="http://youtube.com/" target="_blank">
                          <i class="fa-brands fa-youtube"></i> Youtube
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footerarea__copyright__wrapper footerarea__copyright__wrapper__2">
            <div className="row">
              <div className="col-xl-2 col-lg-2">
                <div className="copyright__logo">
                  <Link to="https://www.deltaitnetwork.com/" target="_blank">
                    <img
                      loading="lazy"
                      src="assets/img/logo/logo_2.png"
                      className="img-fluid"
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10">
                <div className="footerarea__copyright__content footerarea__copyright__content__2 text-end">
                  <p>
                    Copyright © 2023 by <span>DeltaView</span>. All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Footer;