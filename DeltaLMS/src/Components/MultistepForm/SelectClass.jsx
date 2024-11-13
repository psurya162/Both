import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { updateStudentData, fetchUserData } from "../redux/authSlice"; // Adjust import path as necessary

const SelectClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const studentData = useSelector((state) => state.auth.userData); // Access userData slice directly
  const [localData, setLocalData] = useState({
    name: '',
    phone: '',
    grade: ''
  });

  useEffect(() => {
    // Fetch user data when the component mounts
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    // Update local data when studentData changes
    if (studentData) {
      setLocalData({
        name: studentData.name || '',
        phone: studentData.phone || '',
        grade: studentData.grade || ''
      });
    }
  }, [studentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      toast.error("Name should contain only alphabets.");
      return;
    }

    if (name === "phone" && !/^\d*$/.test(value)) {
      toast.error("Phone number should contain only numbers.");
      return;
    }

    setLocalData({ ...localData, [name]: value });
  };

  const handleSelectClass = (selectedClass) => {
    setLocalData({ ...localData, grade: selectedClass });
    toast.info(`You selected ${selectedClass} class.`);
  };

  const handleSubmit = async () => {
    try {
      if (!localData.name || !localData.phone || !localData.grade) {
        toast.error("Please fill in all required fields.");
        return;
      }

      if (!/^\d{10}$/.test(localData.phone)) {
        toast.error("Please enter a valid 10-digit phone number.");
        return;
      }

      // Dispatch the updateStudentData action
      dispatch(updateStudentData(localData));

      // Navigate based on the selected class
      if (localData.grade === "11" || localData.grade === "12") {
        navigate("/select-stream", { replace: true }); // Navigate to the stream selection page
      } else {
        setTimeout(() => {
          navigate("/studentDashboard", { replace: true }); // Navigate to the dashboard
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data");
    }
  };

  return (
    <main className="main_wrapper overflow-hidden">
      <section className="login-steps steps-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <Link className="loginlogo" to="/select-language">
                <i className="fa-solid fa-angles-left"></i><span>Back</span>
              </Link>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-4 mx-auto text-center">
              <div className="select-board-box">
                <img src="/assets/img/logo/delta-view-logo.png" alt="logo_2" />
                <div className="select-board">
                  <h4>Tell us a bit about yourself</h4>
                  <div className="form-group text-start">
                    <label>What's Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      onChange={handleChange}
                      name="name"
                      value={localData.name} // Access localData
                    />
                  </div>
                  <div className="form-group text-start">
                    <label>What's Your Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Phone Number"
                      maxLength="10"
                      onChange={handleChange}
                      value={localData.phone} // Access localData
                      name="phone"
                    />
                  </div>
                  <div className="select-board">
                    <ul className="list-class">
                      {[...Array(10)].map((_, index) => (
                        <li key={index + 1}>
                          <Link
                            className={localData.grade === `${index + 1}` ? "active" : ""}
                            onClick={() => handleSelectClass(`${index + 1}`)}
                          >
                            {index + 1}th
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          className={localData.grade === "11" ? "active" : ""}
                          onClick={() => handleSelectClass("11")}
                        >
                          11th
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={localData.grade === "12" ? "active" : ""}
                          onClick={() => handleSelectClass("12")}
                        >
                          12th
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <button
                    className="default__button w-100"
                    onClick={handleSubmit}
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

export default SelectClass;
