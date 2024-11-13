// import React, { useState } from 'react';
// import ReactPlayer from 'react-player';


// const MediaTab = ({ activeTab, subjectVideos, currentMedia, onProgress }) => {
//   const handleProgress = (progress) => {
//     onProgress(progress);  // Passing the progress (duration) back to the parent
//   };
//   return (
//     <div
//       className={`tab-pane fade ${activeTab === "chapt_video" ? "show active" : ""}`}
//       id="chapt_video"
//       role="tabpanel"
//       aria-labelledby="chapt_video"
//     >
//       {activeTab === "chapt_video" && (
//         subjectVideos.length > 0 ? (
//           currentMedia ? (
//             <ReactPlayer
//               url={currentMedia}
//               width="100%"
//               controls={true}
//               onProgress={handleProgress} 
//             />
//           ) : (
//             <img
//               src="https://img.freepik.com/free-vector/web-app-subscribe-button-online-followers-vector_1017-45945.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712966400&semt=ais"
//               alt="Placeholder Image"
//               style={{ width: "100%" }}
//             />
//           )
//         ) : (
//           <div className="coming-soon">Coming Soon</div>
//         )
//       )}
//     </div>
//   );
// };

// export default MediaTab;


// below is done by me 
import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

const MediaTab = ({ activeTab, subjectVideos, currentMedia, onProgress, lastWatchedTime }) => {
  const playerRef = useRef(null); // Reference to the ReactPlayer instance
  const [playedTime, setPlayedTime] = useState(lastWatchedTime || 0); // Last watched time or 0
 
  const handleProgress = (progress) => {
        onProgress(progress); 
        setPlayedTime(progress.playedSeconds);  // Passing the progress (duration) back to the parent
   };

  // Seek to the last watched time when the component mounts or media changes
  useEffect(() => {
    if (playerRef.current && lastWatchedTime > 0) {
      playerRef.current.seekTo(lastWatchedTime, 'seconds'); // Seek to last watched time
    }
  }, [lastWatchedTime, currentMedia]);

  return (
    <div
      className={`tab-pane fade ${activeTab === "chapt_video" ? "show active" : ""}`}
      id="chapt_video"
      role="tabpanel"
      aria-labelledby="chapt_video"
    >
      {activeTab === "chapt_video" && (
        subjectVideos.length > 0 ? (
          currentMedia ? (
            <ReactPlayer
              ref={playerRef}
              url={currentMedia}
              width="100%"
              controls={true}
              onProgress={handleProgress} 
              playing={true}
              // Seek the video to the last watched time if it's available
              config={{
                file: {
                  attributes: {
                    preload: 'auto',
                  },
                },
              }}
            />
          ) : (
            <img
              src="/assets/img/Artboard 1 1.png"
              alt="Placeholder Image"
              style={{ width: "100%" }}
            />
          )
        ) : (
          <div className="coming-soon">Coming Soon</div>
        )
      )}
    </div>
  );
};

export default MediaTab;
