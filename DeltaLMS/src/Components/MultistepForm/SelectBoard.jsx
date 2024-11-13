import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setSelectedBoard, updateBoard, fetchUserData } from '../redux/authSlice';
import { toast } from 'sonner';

const SelectBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedBoard = useSelector((state) => state.auth.selectedBoard);
  const { userData } = useSelector(state => state.auth);
  const userId = userData?.id;

  useEffect(() => {
    // Fetch user data when the component mounts
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (userData && userData.board_id) {
      dispatch(setSelectedBoard(userData.board_id.toString())); // Ensure it's a string
    }
  }, [dispatch, userData]);

  const handleBoardSelect = (board) => {
    dispatch(setSelectedBoard(board));
  };

  const handleNextClick = () => {
    if (!selectedBoard) {
      toast.error('Please select a board before proceeding.');
      return;
    }

    dispatch(updateBoard({ board_id: selectedBoard }))
      .unwrap()
      .then(() => {
        navigate('/select-language');
      })
      .catch(() => {
        toast.error('Failed to update board. Please try again.');
      });
  };

  return (
    <main className="main_wrapper overflow-hidden">
      <section className="login-steps steps-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mx-auto text-center">
              <div className="select-board-box">
                <img src="/assets/img/logo/delta-view-logo.png" alt="logo_2" />
                <div className="select-board">
                  <h4>Select Board</h4>
                  <ul className="list-box">
                    <li>
                      <Link
                        className={selectedBoard === '1' ? 'active' : ''}
                        onClick={(e) => { e.preventDefault(); handleBoardSelect('1'); }}
                      >
                        Central Board of Secondary Education
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={selectedBoard === '2' ? 'active' : ''}
                        onClick={(e) => { e.preventDefault(); handleBoardSelect('2'); }}
                      >
                        ICSE
                      </Link>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="default__button w-100"
                    onClick={handleNextClick}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SelectBoard;
