import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from '../Images/Profile.jpg';
import AdminBackground from '../Images/AdminBackground.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';




const ProfilePage = ({ userId }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    class: '',
    email: '',
    rollNumber: '',
    fatherName: '',
    motherName: '',
    address: '',
    phone: '',
  });

  const [editableFields, setEditableFields] = useState({
    email: false,
    address: false,
    phone: false,
  });

  useEffect(() => {
    // Fetch profile data from the API
    axios.get(`http://localhost:8080/hello/getProfile/${userId}`)
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, [userId]);

  const handleInputChange = (field, value) => {
    setProfileData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  // const handleEditClick = (field) => {
  //   setEditableFields(prevFields => ({
  //     ...prevFields,
  //     [field]: true,
  //   }));
  // };

  const handleUpdateClick = () => {
    // Call the API to update the profile
    axios.post('http://localhost:8080/hello/updateProfile', profileData)
      .then(response => {
        // Handle successful update
        console.log('Profile updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });

    // Disable editing after updating
    setEditableFields({
      email: false,
      address: false,
      phone: false,
    });
  };

  return (
    <>
    <style>
      {`
        body {
          background-image: url(${AdminBackground});
          background-size: cover;
          margin: 0;
          padding: 0;
        }
      `}
    </style>
    <div style={{ textAlign: 'center' }}>
  <h2>Student Information</h2>

  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' ,marginTop:'50px'}}>
    <img
      src={Profile}
      alt="Profile Pic"
      style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
    />
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', }}>
    <div>
      <p>{profileData.name}</p>
    </div>

    <div>
      <p>{profileData.class}</p>
    </div>
  </div>

  <table style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}>
    <tbody>
      <tr>
        <td><label>Email:</label></td>
        <td>
        <div style={{ display: 'flex' }}>
            <input
              type="text"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!editableFields.email}
            />
            {editableFields.email ? (
              <span onClick={() => setEditableFields({ ...editableFields, email: false })}>
                <FontAwesomeIcon icon={faCheckCircle} style={{ marginLeft: '5px', cursor: 'pointer' }} />
              </span>
            ) : (
              <span onClick={() => setEditableFields({ ...editableFields, email: true })}>
                <FontAwesomeIcon icon={faEdit} style={{ marginLeft: '5px', cursor: 'pointer' }} />
              </span>
            )}
          </div>
        </td>
      </tr>

      <tr>
        <td style={{ verticalAlign: 'top' }}><label>Roll Number:</label></td>
        <td style={{ verticalAlign: 'top' }}>{profileData.rollNumber}</td>
      </tr>

      <tr>
        <td style={{ verticalAlign: 'top' }}><label>Father's Name:</label></td>
        <td style={{ verticalAlign: 'top' }}>{profileData.fatherName}</td>
      </tr>

      <tr>
        <td style={{ verticalAlign: 'top' }}><label>Mother's Name:</label></td>
        <td style={{ verticalAlign: 'top' }}>{profileData.motherName}</td>
      </tr>

      <tr>
        <td><label>Address:</label></td>
        <td>
        <div style={{ display: 'flex' }}>
            <input
              type="text"
              value={profileData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!editableFields.address}
            />
            {editableFields.address ? (
              <span onClick={() => setEditableFields({ ...editableFields, address: false })}>
                <FontAwesomeIcon icon={faCheckCircle} style={{ marginLeft: '5px', cursor: 'pointer' }} />
              </span>
            ) : (
              <span onClick={() => setEditableFields({ ...editableFields, address: true })}>
                <FontAwesomeIcon icon={faEdit} style={{ marginLeft: '5px', cursor: 'pointer' }} />
              </span>
            )}
          </div>
        </td>
      </tr>

      <tr>
        <td><label>Phone:</label></td>
        <td>
        <div style={{ display: 'flex' }}>
            <input
              type="text"
              value={profileData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!editableFields.phone}
            />
            {editableFields.phone ? (
              <span onClick={() => setEditableFields({ ...editableFields, phone: false })}>
                <FontAwesomeIcon icon={faCheckCircle} style={{ marginLeft: '5px', cursor: 'pointer' }} />
              </span>
            ) : (
              <span onClick={() => setEditableFields({ ...editableFields, phone: true })}>
                <FontAwesomeIcon icon={faEdit} style={{ marginLeft: '5px', cursor: 'pointer' }} />
              </span>
            )}
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <div>
    <button onClick={handleUpdateClick}>Update Profile</button>
  </div>
</div>
    </>
  );
};

export default ProfilePage;
