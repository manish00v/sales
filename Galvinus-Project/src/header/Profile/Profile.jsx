import fetchWithAuth from "../../utils/app";
import pro from "./Profile.module.css"; // Import the CSS module
import { useEffect, useState } from "react";

const Profile = () => {
  const token = localStorage.getItem("accessToken");
  const [profile, setProfile] = useState(null); // Holds fetched profile data
  const [editedProfile, setEditedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Function to fetch profile data
  const fetchProfile = async () => {
    try {
      const res = await fetchWithAuth("/api/auth/get-user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        setProfile(data);
        setEditedProfile(data);
      } else {
        alert("Error fetching profile: " + data.error);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Error fetching profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  // Handlers for editing
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedProfile((prev) => ({ ...prev, file: file })); // Store file for upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prev) => ({
          ...prev,
          profilePic: reader.result, // Show preview before upload
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editedProfile.name);
    formData.append("email", editedProfile.email);
    formData.append("phoneNumber", editedProfile.phoneNumber);
    if (editedProfile.file) {
      formData.append("profilePic", editedProfile.file); // Append image file
    }

    try {
      const res = await fetch("http://localhost:8799/api/auth/edit-profile", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setIsEditing(false);
        fetchProfile(); // Fetch the latest profile after update
      } else {
        alert("Error updating profile: " + data.error);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("An error occurred while updating profile.");
    }
  };

  const logoutUser = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      });

      // Clear all auth tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={pro.profile}>
      <div className={pro["profile-picture"]}>
        <img
          src={editedProfile?.profilePic || profile?.profilePic || ""}
          alt="Profile"
          className={pro.image}
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={pro["file-input"]}
          />
        )}
      </div>

      <div className={pro["profile-info"]}>
        <div className={pro.nameheading}>
          {isEditing ? editedProfile.name : profile.name}
        </div>

        {isEditing ? (
          <>
            <h3 className={pro.heading}>Full Name</h3>
            <input
              type="text"
              name="name"
              value={editedProfile.name || ""}
              onChange={handleChange}
              className={pro.input}
            />

            <h3 className={pro.heading}>Email Address</h3>
            <input
              type="email"
              name="email"
              value={editedProfile.email || ""}
              onChange={handleChange}
              className={pro.input}
              disabled
            />

            <h3 className={pro.heading}>Phone Number</h3>
            <input
              type="tel"
              name="phoneNumber"
              value={editedProfile.phoneNumber || ""}
              onChange={handleChange}
              className={pro.input}
            />

            <button
              type="button"
              onClick={handleSaveClick}
              className={pro.button}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h3 className={pro.heading}>Full Name</h3>
            <div className={pro["info-box"]}>
              <p className={pro.text}>{profile.name}</p>
            </div>
            <h3 className={pro.heading}>Email Address</h3>
            <div className={pro["info-box"]}>
              <p className={pro.text}>{profile.email}</p>
            </div>
            <h3 className={pro.heading}>Phone Number</h3>
            <div className={pro["info-box"]}>
              <p className={pro.text}>{profile.phoneNumber}</p>
            </div>
            <button
              type="button"
              onClick={handleEditClick}
              className={pro.button}
            >
              Edit Profile
            </button>
            <button onClick={logoutUser}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
