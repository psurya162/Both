import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SuspenseLoader from './SuspenseLoader';

// Lazy-loaded components
const StudentLayout = lazy(() => import('./Components/StudentDashboard/StudentLayout'));
const StudentSubject = lazy(() => import('./Components/StudentDashboard/StudentSubject'));
const StudentProfile = lazy(() => import('./Components/StudentDashboard/Studentprofile'));
const Signup = lazy(() => import('./Components/SignUpPage/Singup'));
const SelectBoard = lazy(() => import('./Components/MultistepForm/SelectBoard'));
const Login = lazy(() => import('./Components/SignInPage/Login'));
const SelectLanguage = lazy(() => import('./Components/MultistepForm/SelectLanguage'));
const SelectClass = lazy(() => import('./Components/MultistepForm/SelectClass'));
const SelectStream = lazy(() => import('./Components/MultistepForm/SelectStream'));
const StudentVideoSection = lazy(() => import('./Components/StudentDashboard/StudentVideoSection'));
const HeroSection = lazy(() => import('./Components/Homepage/HeroSection/Herosection'));
const Layout = lazy(() => import('./Components/Homepage/Layout/Layout'));
const AboutUs = lazy(() => import('./Components/Homepage/AboutUs/AboutUs'));
const ContactUs = lazy(() => import('./Components/Homepage/ContactUs/ContactUs'));
const DeltaView = lazy(() => import('./Components/Homepage/DeltaView/DeltaView'));
const DeltaPartner = lazy(() => import('./Components/Homepage/DeltaPartner/DeltaPartner'));
const UpgradePage = lazy(() => import('./Components/UpgradePage/Upgrade'));
const ResetPassword = lazy(() => import('./Components/SignInPage/ResetPassword'));
const ReportPage = lazy(() => import('./Components/StudentDashboard/StudentReport'));
const NotFound = lazy(() => import('./Components/NotFound/NotFound'));
const StudentLicense=lazy(()=>import("./Components/StudentDashboard/StudentLicense"))

const App = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/delta-view-app" element={<DeltaView />} />
          <Route path="/delta-partner" element={<DeltaPartner />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/selectboard" element={<SelectBoard />} />
        <Route path="/select-language" element={<SelectLanguage />} />
        <Route path="/select-class" element={<SelectClass />} />
        <Route path="/select-stream" element={<SelectStream />} />

        {/* Student dashboard routes */}
        <Route path="/studentDashboard" element={<StudentLayout />}>
          <Route index element={<StudentSubject />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="report" element={<ReportPage />} />
          <Route path='license' element={<StudentLicense/>}/>
        </Route>

        {/* Video section with only header */}
        <Route path="/studentDashboard/subject/:subjectId/:langid" element={<StudentVideoSection />} />

        {/* Additional routes */}
      
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/upgrade" element={<UpgradePage />} />

        {/* Catch-all route for 404 */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Suspense>
  );
};

export default App;
