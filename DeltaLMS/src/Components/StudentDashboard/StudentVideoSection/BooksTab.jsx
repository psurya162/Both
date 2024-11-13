import React from 'react';

const BooksTab = ({ activeTab, books, currentMedia }) => {
  return (
    <div
      className={`tab-pane fade ${activeTab === "books" ? "show active" : ""}`}
      id="books"
      role="tabpanel"
      aria-labelledby="books"
    >
      {activeTab === "books" && (
        books.length > 0 ? (
          currentMedia ? (
            <iframe
              src={currentMedia}
              style={{ width: "100%", height: "500px" }}
              title="Book Viewer"
            ></iframe>
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

export default BooksTab;
