import React from "react";

import { Link } from "react-router-dom";

const DeltaView = () => {
  return (
    <>
      {/* herobannerarea__section__start */}
      <div className="coaches-area pt-pb-100 after-circle-right">
        <div className="container">
          <div className="row">
            <div
              className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
              data-aos="fade-up"
            >
              <div className="herobannerarea__content__wraper">
                <div className="herobannerarea__title">
                  <div className="herobannerarea__title__heading__2 herobannerarea__title__heading__3">
                    <h2>
                      One App for all <span>your</span> Learning Needs
                    </h2>
                  </div>
                </div>
                <div className="herobannerarea__text herobannerarea__text__2">
                  <p>Learning app for classes 1st to 12th All Subjects</p>
                </div>
                <div className="hreobannerarea__button__2">
                  <Link >
                    <img
                      src="assets/img/about/google-play.png"
                      alt="img"
                    />
                  </Link>
                  <Link >
                    <img src="assets/img/about/app-store.png" alt="img" />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-4"
              data-aos="fade-up"
            >
              <img
                loading="lazy"
                className="img-fluid"
                src="assets/img/Easy-To-Understand-And-Use-Interface.png"
                alt="aboutimg"
              />
            </div>
          </div>
        </div>
      </div>
      {/* herobannerarea__section__end*/}
      <section className="our-value-sec pt-pb-100 bg-light">
        <div className="container">
          <div className="row">
            <div
              className="section__title text-center aos-init aos-animate"
              data-aos="fade-up"
            >
              <div className="section__title__heading heading__underline">
                <h2 className="mb-3">
                  DeltaView: Learning App for Classes 1st to 12th
                </h2>
                <p>
                  DeltaView is a Rich &amp; Comprehensive Learning App which
                  offers best of Digital Content in all subjects, additional
                  skills, reading and holistic growth
                </p>
              </div>
            </div>
          </div>
          <div className="row border-r10">
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 d-flex p-0">
              <div className="value-box colorshade-1">
                <h5>Learn Your Concepts</h5>
                <p>
                  Curriculum aligned Animated Video lessons STEM Projects for
                  Pratical Learning
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 d-flex p-0">
              <div className="value-box colorshade-2">
                <h5>Master each Topic</h5>
                <p>
                  Practice Questions with instant feedback Topic wise &amp; Full
                  Syllabus Tests for exam Readiness
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 d-flex p-0">
              <div className="value-box colorshade-3">
                <h5>For Reading and Holistic Growth</h5>
                <p>Syllabus Books Stories, Poems, Biographies and Much more</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-pb-100">
        <div className="container">
          <div className="row">
            <div
              className="section__title text-center aos-init aos-animate"
              data-aos="fade-up"
            >
              <div className="section__title__heading heading__underline">
                <h2 className="mb-3">Subjects Covered</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12">
                  <h5>Core Subjects</h5>
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/maths.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Math</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/physics.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Physics</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/chemistry.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Chemistry</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/biology.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Biology</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/eng.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>English</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/hindi.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Hindi</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/sanskrit.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Sanskrit</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/computer.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Computer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12">
                  <h5>Science (XI-XII)</h5>
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/maths.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Math</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/physics.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Physics</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/chemistry.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Chemistry</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/biology.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Biology</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/eng.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>English</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/hindi.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Hindi</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/sanskrit.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Sanskrit</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/computer.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Computer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12">
                  <h5>Commerce</h5>
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/maths.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Math</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/physics.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Physics</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/chemistry.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Chemistry</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/biology.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Biology</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/eng.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>English</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/hindi.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Hindi</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/sanskrit.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Sanskrit</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/computer.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Computer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12">
                  <h5>Additional Subjects</h5>
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/maths.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Math</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/physics.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Physics</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/chemistry.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Chemistry</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/biology.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Biology</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/eng.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>English</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/hindi.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Hindi</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/sanskrit.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Sanskrit</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto col-12 fix-width168">
                  <div className="dashboard__single__counter">
                    <div className="counterarea__text__wraper d-block text-center">
                      <div className="counter__img mb-2 me-0">
                        <img
                          loading="lazy"
                          src="assets/img/counter/computer.png"
                          alt="counter"
                        />
                      </div>
                      <div className="counter__content__wraper">
                        <p>Computer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-light aboutarea__2 aboutarea__4 coaches-area pt-pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 aos-init aos-animate"
              data-aos="fade-up"
            >
              <div className="about__right__wraper__2 about__right__wraper__4">
                <div className="educationarea__img text-end d-flex">
                  <img
                    loading="lazy"
                    className="aboutimg__4__img__1"
                    src="assets/img/Select-Your-Grade-When-Joining.png"
                    alt="about"
                  />
                  <img
                    loading="lazy"
                    className="aboutimg__4__img__1"
                    src="assets/img/Select-Your-Grade-When-Joining.png"
                    alt="about"
                  />
                </div>
              </div>
            </div>
            <div
              className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 aos-init aos-animate offset-lg-1"
              data-aos="fade-up"
            >
              <div className="aboutarea__content__wraper">
                <div className="section__title__2">
                  <div className="section__title__heading__2 section__title__heading__3 heading__fontsize__2">
                    <h2>
                      Access to content of all classes, switch classes anytime
                      to learn anything
                    </h2>
                  </div>
                </div>
                <div className="aboutarea__para aboutarea__para__2">
                  <p>
                    DeltaView comes with a very unique feature that enables
                    switching classes anytime during the subscription period,
                    empowering students to cover their historical learning gaps
                    and also learn ahead of their grade levels
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="aboutarea__2 aboutarea__4 coaches-area pt-pb-100 after-circle-right">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 aos-init aos-animate"
              data-aos="fade-up"
            >
              <div className="aboutarea__content__wraper">
                <div className="section__title__2">
                  <div className="section__title__heading__2 section__title__heading__3 heading__fontsize__2">
                    <h2>Animated Video Lessons for building concepts</h2>
                  </div>
                </div>
                <div className="aboutarea__para aboutarea__para__2">
                  <p>
                    Engaging animated videos for an enjoyable learning
                    experience. Each video connects a concept with a real life
                    situation building deeper understanding and skills to apply
                    the knowledge.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 aos-init aos-animate"
              data-aos="fade-up"
            >
              <div className="about__right__wraper__2 about__right__wraper__4">
                <div className="text-end">
                  <img
                    loading="lazy"
                    className="img-fluid"
                    src="assets/img/Enjoyable-Learning-Content-On.png"
                    alt="about"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light aboutarea__2 aboutarea__4 coaches-area pt-pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 aos-init aos-animate"
              data-aos="fade-up"
            >
              <div className="about__right__wraper__2 about__right__wraper__4">
                <div className="text-end d-flex">
                  <img
                    loading="lazy"
                    className="img-fluid"
                    src="assets/img/Enjoyable-Learning-Content-On.png"
                    alt="about"
                  />
                </div>
              </div>
            </div>
            <div
              className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 offset-lg-1 aos-init aos-animate"
              data-aos="fade-up"
            >
              <div className="aboutarea__content__wraper">
                <div className="section__title__2">
                  <div className="section__title__heading__2 section__title__heading__3 heading__fontsize__2">
                    <h2>Digital Book Library for Holistic Growth</h2>
                  </div>
                </div>
                <div className="aboutarea__para aboutarea__para__2">
                  <p>
                    DeltaView has a rich digital library with amazing stories,
                    picture books, inspirational biographies, STEM &amp; books
                    on personal growth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" aboutarea__2 aboutarea__4 coaches-area pt-pb-100 after-circle-right">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 aos-init aos-animate offset-lg-1"
              data-aos="fade-up"
            >
              <div className="aboutarea__content__wraper">
                <div className="section__title__2">
                  <div className="section__title__heading__2 section__title__heading__3 heading__fontsize__2">
                    <h2>Project Videos for Practical Learning</h2>
                  </div>
                </div>
                <div className="aboutarea__para aboutarea__para__2">
                  <p>
                    Excite the curious minds with a rich collection of Project
                    videos where one gets to create experiments and build models
                    &amp; toys using easily available material at home and
                    school
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 aos-init aos-animate"
              data-aos="fade-up"
            >
              <div className="about__right__wraper__2 about__right__wraper__4">
                <div className="educationarea__img text-end d-flex">
                  <img
                    loading="lazy"
                    className="aboutimg__4__img__1"
                    src="assets/img/STEM-Projects-On.png"
                    alt="about"
                  />
                  <img
                    loading="lazy"
                    className="aboutimg__4__img__1"
                    src="assets/img/Interesting-Practical_Project-Videos-On.png"
                    alt="about"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light aboutarea__2 aboutarea__4 coaches-area pt-pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 aos-init aos-animate"
              data-aos="fade-up"
            >
              <div className="about__right__wraper__2 about__right__wraper__4">
                <div className="educationarea__img text-end d-flex">
                  <img
                    loading="lazy"
                    className="aboutimg__4__img__1"
                    src="assets/img/Chapter-Wise-Tests-With-Timer-On.png"
                    alt="about"
                  />
                  <img
                    loading="lazy"
                    className="aboutimg__4__img__1"
                    src="assets/img/Quickly-Check-Your-Test-Journey-with.png"
                    alt="about"
                  />
                </div>
              </div>
            </div>
            <div
              className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 aos-init aos-animate offset-lg-1"
              data-aos="fade-up"
            >
              <div className="aboutarea__content__wraper">
                <div className="section__title__2">
                  <div className="section__title__heading__2 section__title__heading__3 heading__fontsize__2">
                    <h2>
                      Master every topic and be exam ready with Practice &amp;
                      Tests
                    </h2>
                  </div>
                </div>
                <div className="aboutarea__para aboutarea__para__2">
                  <p>
                    Topic wise Practice questions with instant feedback to build
                    mastery on every concept. There are also Chapter Wise full
                    syllabus tests to ensure better preparations for the exams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="aboutarea__2 aboutarea__4 pt-pb-60 alldevices after-circle-right">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 aos-init aos-animate"
              data-aos="fade-up"
            >
              <div className="about__right__wraper__2 about__right__wraper__4">
                <div className="educationarea__img text-start">
                  <img
                    loading="lazy"
                    className="aboutimg__4__img__1"
                    src="assets/img/about/All-Smart-Devices.png"
                    alt="about"
                  />
                </div>
              </div>
            </div>
            <div
              className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 aos-init aos-animate"
              data-aos="fade-up"
            >
              <div className="aboutarea__content__wraper">
                <div className="section__title__2">
                  <div className="section__title__heading__2 section__title__heading__3 heading__fontsize__2">
                    <h2>Available Across All Devices</h2>
                  </div>
                </div>
                <div className="aboutarea__para aboutarea__para__2">
                  <p>
                    25+Contrary to popular belief, Lorem Ipsum is not simply
                    random text roots in a piece of classical Latin literature
                    from 45 BC 25+Contrary to popular belief, Lorem Ipsum is not
                    simply random text roots in a piece of classical Latin
                    literature from 45 BC
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

export default DeltaView;