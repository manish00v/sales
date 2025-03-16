import pro from './Profile.module.css'; // Import the CSS module
import { useContext, useState } from 'react';
import { ProfileContext } from '../../contexts/ProfileContext';

const Profile = () => {
  const { profile, updateProfile } = useContext(ProfileContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateProfile(editedProfile);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={pro.profile}>
      <div className={pro['profile-picture']}>
        {editedProfile.profilePicture ? (
          <img src={editedProfile.profilePicture} alt="Profile" className={pro.image} />
        ) : (
          <div className={pro['profile-icon']}>👤</div>
        )}
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={pro['file-input']}
          />
        )}
      </div>
      
      <div className={pro['profile-info']}>
        {/* Dynamic nameheading */}
        <div className={pro.nameheading}>
          {isEditing ? editedProfile.userName : profile.userName}
        </div>

        {isEditing ? (
          <>
            <h3 className={pro.heading}>Full Name</h3>
              <input
                type="text"
                name="userName"
                value={editedProfile.userName}
                onChange={handleChange}
                className={pro.input}
              />
            
            <h3 className={pro.heading}>Email Address</h3>
              <input
                type="email"
                name="email"
                value={editedProfile.email}
                onChange={handleChange}
                className={pro.input}
              />
         
            <h3 className={pro.heading}>Phone Number</h3>
              <input
                type="tel"
                name="number"
                value={editedProfile.number}
                onChange={handleChange}
                className={pro.input}
              />
          </>
        ) : (
          <>
            <h3 className={pro.heading}>Full Name</h3>
            <div className={pro['info-box']}>
              <p className={pro.text}>{profile.userName}</p>
            </div>
            <h3 className={pro.heading}>Email Address</h3>
            <div className={pro['info-box']}>
              <p className={pro.text}>{profile.email}</p>
            </div>
            <h3 className={pro.heading}>Phone Number</h3>
            <div className={pro['info-box']}>
              <p className={pro.text}>{profile.number}</p>
            </div>
          </>
        )}
      </div>
      <button
        onClick={isEditing ? handleSaveClick : handleEditClick}
        className={pro.button}
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default Profile;