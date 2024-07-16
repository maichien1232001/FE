import React, { useEffect, useState } from "react";
import axiosInstance from "../services/instanceAxios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/api/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {/* Hiển thị thêm các thông tin khác của người dùng nếu có */}
    </div>
  );
};

export default Profile;
