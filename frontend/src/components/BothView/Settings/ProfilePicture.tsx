import React, { useState, useEffect } from "react";
import ApiService from "../../../utils/ApiService";
import { getUserRole } from "../../../utils/authConfig";
const ProfilePicture: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const rawrole = getUserRole();
        const role = rawrole === "ROLE_TENANT" ? "tenant" : "admin"; 
        const response = await ApiService.fetchImage(`${role}/profilePicture`);
        const imageUrl = URL.createObjectURL(response.data);
        setProfilePicture(imageUrl);
      } catch (err) {
        console.error("Failed to fetch profile picture:", err);
        setError("Could not load profile picture.");
      }
    };

    fetchProfilePicture();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {profilePicture ? (
        <img
          src={profilePicture}
          alt="Profile"
          style={{ borderRadius: "50%", width: "150px", height: "150px" }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePicture;
