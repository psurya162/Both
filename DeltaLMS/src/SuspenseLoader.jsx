import React, { useState, useEffect } from 'react';

const SuspenseLoader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) return null;

  return (
    <div id="back__preloader">
      <div id="back__circle_loader"></div>
      <div className="back__loader_logo">
        <img loading="lazy" src="assets/img/favicon.png" alt="Preload" />
      </div>
    </div>
  );
};

export default SuspenseLoader;