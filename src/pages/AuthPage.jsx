import { useState } from "react";
import { LoginPage } from "./LoginPage/LoginPage";
import { RegistrationPage } from "./RegistrationPage/RegistrationPage";

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="m-auto bg-white border border-white rounded-3xl w-[26%] h-3/4 flex justify-center items-center shadow-md max-[768px]:w-[80%] max-[768px]:h-1/2">
        <div className="h-[80%] w-2/3 flex flex-col justify-between items-center">
          <div className="w-2/3 flex flex-row justify-between items-center self-start uppercase font-bold text-[1vw] tracking-light max-[768px]:text-[3.3vw]">
            <h2 onClick={() => setActiveTab("login")}>Login</h2>
            <h2 onClick={() => setActiveTab("register")}>Registration</h2>
          </div>
          {activeTab === "login" && (
            <LoginPage />
          )}
          {activeTab === "register" && (
            <RegistrationPage />
          )}
        </div>
      </div>
    </div>
  );
};
