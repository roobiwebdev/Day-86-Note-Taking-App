// // src/components/ProfileUpload.tsx
// import React, { useState, useEffect } from "react";
// import defProfile from "../assets/useravatar.png";

// const Profile: React.FC = () => {
//   const [profileImage, setProfileImage] = useState<string | null>(null);

//   // Load profile image from local storage when component mounts
//   useEffect(() => {
//     const savedProfileImage = localStorage.getItem("profileImage");
//     if (savedProfileImage) {
//       setProfileImage(savedProfileImage); // Set profile image from localStorage
//     }
//   }, []);

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result as string;
//         setProfileImage(base64String); // Set Base64 string to state
//         localStorage.setItem("profileImage", base64String); // Save Base64 string to local storage
//       };
//       reader.readAsDataURL(file); // Read the file as a Data URL
//     }
//   };

//   return (
//     <div>
//       <label htmlFor="profile-upload" className="cursor-pointer">
//         <img
//           src={profileImage || defProfile} // If no profileImage, use default avatar
//           alt="Profile"
//           className="h-11 w-11 rounded-full cursor-pointer object-cover"
//         />
//       </label>
//       <input
//         id="profile-upload"
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//         style={{ display: "none" }} // Hide the file input element
//       />
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import defProfile from "../assets/useravatar.png";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Load profile image from local storage when component mounts
  useEffect(() => {
    const savedProfileImage = localStorage.getItem("profileImage");
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem("profileImage", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative w-12 h-12 rounded-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <label htmlFor="profile-upload" className="relative block">
        <img
          src={profileImage || defProfile}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover transition-all duration-300 hover:brightness-75"
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer 
            transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
        >
          <Camera
            size={24}
            color="white"
            className={`transition-transform duration-500 ${
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          />
        </div>
      </label>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default Profile;
