import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LanguageModal = ({ show, handleCloseModal, handleLanguageSelect }) => {
  // State to track the active language
  const [activeLanguage, setActiveLanguage] = useState(null);

  const handleLanguageClick = (languageId) => {
    setActiveLanguage(languageId); // Update active language
    handleLanguageSelect(languageId); // Call the parent's language selection handler
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      aria-labelledby="choose-language-modal"
      centered
      size="sm"
    >
      <Modal.Header closeButton>
        <Modal.Title>Choose Language</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="select-board">
          <ul className="list-box">
            <li>
              <Link
                variant="link"
                onClick={() => handleLanguageClick('1')}
                className={activeLanguage === '1' ? 'active' : ''} // Apply active class
              >
                English
              </Link>
            </li>
            <li>
              <Link
                variant="link"
                onClick={() => handleLanguageClick('2')}
                className={activeLanguage === '2' ? 'active' : ''} // Apply active class
              >
                Hindi
              </Link>
            </li>
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="default__button w-100"onClick={handleCloseModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LanguageModal;
