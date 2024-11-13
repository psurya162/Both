import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StreamModal = ({ show, handleClose, handleStreamSelect, selectedStream }) => {
  const [currentStream, setCurrentStream] = useState(selectedStream);

  // Stream name mapping
  const streamMap = {
    '1': 'Arts',
    '2': 'Commerce',
    '3': 'Science',
  };

  useEffect(() => {
    setCurrentStream(selectedStream);
  }, [selectedStream]);

  const handleStreamClick = (streamId) => {
    const selectedStreamName = streamMap[streamId];
    
    setCurrentStream(streamId);

    handleStreamSelect(streamId);  // Passing stream ID, which corresponds to the stream name in `streamMap`
  };

  return (
    <Modal show={show} onHide={() => handleClose("stream")} aria-labelledby="choose-stream-modal" centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Choose Stream</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="select-board">
          <ul className="list-box">
            {['1', '2', '3'].map((streamId) => (
              <li key={streamId}>
                <Link
                  to="#"
                  onClick={() => handleStreamClick(streamId)}
                  className={currentStream === streamId ? "active" : ""}
                >
                  {streamMap[streamId]} {/* Displaying stream name */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="default__button w-100" onClick={() => handleClose("stream")}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StreamModal;
