import React from "react";
import Button from "../../components/Button/Button";
import { UserManagementTable } from "../../components/UserManagementTable/UserManagementTable";
import { useNavigate } from "react-router-dom";

export const UserManagementPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const currentUserId = currentUser?.id; 

  return (
    <div className="m-auto flex flex-col items-left justify-center w-4/5">
      <header className="my-12 flex justify-between items-center w-1/2 max-[768px]:w-full h-16 max-[768px]:h-14 max-[768px]:my-14 bg-white px-4 py-2 rounded-md">
        <h1 className="text-xl font-bold text-dark-gray max-[768px]:text-base">User Management</h1>
        <Button buttonType="tertiary" size="medium" text="Logout" onClick={handleLogout} />
      </header>
<<<<<<< HEAD:client/src/pages/UserManagementPage/UserManagementPage.jsx
      <UserManagementTable/>
=======
      <UserManagementTable currentUserId={currentUserId}/>
>>>>>>> ad249ea3ad1077577bed3023ee2d1142b15b6c8c:src/pages/UserManagementPage/UserManagementPage.jsx
    </div>
  );
};