import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IoIosChatboxes } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const UpgradeModel = ({ showUpgradeModal, handleCloseModal }) => {
  const navigate = useNavigate();

  const HandleNavigate = () => {
    navigate('/upgrade');
  };

  return (
    <>
      <Modal show={showUpgradeModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <img
              src="/assets/img/logo/delta-view-logo.png"
              alt="Delta View Logo"
              className="img-fluid"
              style={{ width: '100px' }}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
     
          <div className="d-flex align-items-center mb-2">
            <TiTick style={{ fontSize: '1.5rem', marginRight: '8px' }} />
            <p className="mb-0">3 months & 1 year plans starting from ₹100/week</p>
          </div>
          <div className="d-flex align-items-center mb-2">
            <TiTick style={{ fontSize: '1.5rem', marginRight: '8px' }} />
            <p className="mb-0">You need to upgrade to access this content.</p>
          </div>
          <div className="d-flex align-items-center">
            <TiTick style={{ fontSize: '1.5rem', marginRight: '8px' }} />
            <p className="mb-0">Engaging animated lessons simplify tough concepts</p>
          </div>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
         
          <Button
            onClick={HandleNavigate}
            className="default__button w-100 me-2 " 
          >
            Pay <MdOutlinePayment style={{ fontSize: '1.5rem', marginLeft: '8px' }} />
          </Button>
          <Button
            onClick={handleCloseModal}
            className="default__button w-100"
          >
            Chat With Us <IoIosChatboxes style={{ fontSize: '1.5rem', marginLeft: '8px' }} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpgradeModel;
