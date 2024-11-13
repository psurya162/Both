import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BoardModel = ({ show, handleClose, handleBoardSelect, selectedBoard }) => {
    return (
        <Modal show={show} onHide={() => handleClose("board")} aria-labelledby="choose-board-modal" centered size="sm">
            <Modal.Header closeButton>
                <Modal.Title>Choose Board</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="select-board">
                    <ul className="list-box">
                        {/* Example boards; replace with actual board options */}
                        {['CBSE', 'ICSE'].map((board) => (
                            <li key={board}>
                                <Link  onClick={() => handleBoardSelect(board)} className={selectedBoard === board ? "active" : ""}>
                                    {board}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="default__button w-100" onClick={() => handleClose("board")}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BoardModel;
