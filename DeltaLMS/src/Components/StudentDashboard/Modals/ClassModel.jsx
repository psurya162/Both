import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Helper function to convert grade number to ordinal format
const getOrdinal = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const ClassModel = ({ show, handleClose, handleClassSelect, selectedClass }) => {
  return (
    <Modal show={show} onHide={() => handleClose("class")} aria-labelledby="choose-class-modal" centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Choose Class</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="select-board">
          <ul className="list-class">
            {['12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1'].map((grade) => (
              <li key={grade}>
                <Link to="#" onClick={() => handleClassSelect(grade)} className={selectedClass === grade ? "active" : ""}>
                  {getOrdinal(grade)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="default__button w-100" onClick={() => handleClose("class")}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClassModel;
