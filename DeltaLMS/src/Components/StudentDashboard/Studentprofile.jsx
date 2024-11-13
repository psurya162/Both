import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, fetchUserData } from '../redux/authSlice';
import { toast } from 'sonner';

const StudentProfile = () => {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.auth);
  const [updatedUserData, setUpdatedUserData] = useState(userData || {});

  // Function to format the date to "yyyy-MM-dd"
  const formatDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) return ''; // Check for valid date input
    const date = new Date(dateString);
    
    // Get year, month (add 1 since months are zero-based), and day
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ensure two-digit month
    const day = ('0' + date.getDate()).slice(-2); // Ensure two-digit day
    
    return `${year}-${month}-${day}`; // Return formatted date "yyyy-MM-dd"
  };
  
  useEffect(() => {
    if (userData) {
      setUpdatedUserData(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is the date of birth, format it correctly before setting it
    const formattedValue = name === 'dob' ? new Date(value).toISOString() : value;

    setUpdatedUserData({
      ...updatedUserData,
      [name]: formattedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the dob is in the correct format before dispatching
      const profileData = {
        ...updatedUserData,
        dob: new Date(updatedUserData.dob).toISOString().split('T')[0], // Format as "yyyy-MM-dd"
      };

      await dispatch(updateUserProfile(profileData)).unwrap();
      dispatch(fetchUserData());
      toast.success('Your Profile is Updated Successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  if (loading && !userData) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const {
    name = '',
    email = '',
    phone = '',
    alternatephone = '',
    gender = '',
    dob = '',
    city = '',
    state = '',
    address = '',
    grade = '',
  } = updatedUserData;


  return (
    <>
      <div className="dashboardarea__wraper mb-4">
        <div className="dashboardarea__img">
          <div className="dashboardarea__inner admin__dashboard__inner">
            <div className="dashboardarea__left">
              <div className="dashboardarea__left__content">
                <h5>
                  <span>Hello</span>, {name || 'User'}
                </h5>
                <p>{email}</p>
              </div>
            </div>
            <div className="dashboardarea__right">
              <div className="dashboardarea__right__button">
                <div className="info-class">
                <span>Class ({grade})</span>
                <span>Board ({userData?.board_id || 'N/A'})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard__content__wraper">
        <div className="dashboard__section__title">
          <h4>My Profile</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xl-12">
              <div className="row">
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Id"
                        value={email}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="phone">Mobile</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Mobile Number"
                        value={phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="alternatephone">Alternate Number</label>
                      <input
                        type="text"
                        name="alternatephone"
                        placeholder="Alternate Number"
                        value={alternatephone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="gender">Gender</label>
                      <select
                        name="gender"
                        value={gender}
                        onChange={handleChange}
                      >
                        <option disabled="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="dob">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        placeholder="Date of Birth"
                        value={formatDate(dob)}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
               
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor="address">Address</label>
                      <textarea
                        name="address"
                        placeholder="Address"
                        value={address}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="dashboard__form__button">
                    <button type="submit" className="default__button">
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentProfile;
