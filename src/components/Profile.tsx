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

  // Handle the profile image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // Set the image URL to state
      localStorage.setItem("profileImage", imageUrl); // Save image URL to local storage
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
