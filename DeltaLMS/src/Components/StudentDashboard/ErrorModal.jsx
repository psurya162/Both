import React from "react";
import { Modal, Button } from "react-bootstrap";

const ErrorModal = ({ showErrorModal, errorMessage, onClose }) => {
  return (
    <>
      <Modal
        show={showErrorModal}
        onHide={onClose}
        centered 
        animation={true}
        backdrop="static" 
        keyboard={false} 
        
      >
        <Modal.Header closeButton>
          <Modal.Title>Oops! Video Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{errorMessage}</p>
      
          
        </Modal.Body>
        <Modal.Footer>
          <Button className="default__button w-25" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ErrorModal;
