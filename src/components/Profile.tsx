// src/components/ProfileUpload.tsx
import React, { useState, useEffect } from "react";
import defProfile from "../assets/useravatar.png";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Load profile image from local storage when component mounts
  useEffect(() => {
    const savedProfileImage = localStorage.getItem("profileImage");
    if (savedProfileImage) {
      setProfileImage(savedProfileImage); // Set profile image from localStorage
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String); // Set Base64 string to state
        localStorage.setItem("profileImage", base64String); // Save Base64 string to local storage
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  return (
    <div>
      <label htmlFor="profile-upload" className="cursor-pointer">
        <img
          src={profileImage || defProfile} // If no profileImage, use default avatar
          alt="Profile"
          className="h-11 w-11 rounded-full cursor-pointer object-cover"
        />
      </label>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }} // Hide the file input element
      />
    </div>
  );
};

export default Profile;
