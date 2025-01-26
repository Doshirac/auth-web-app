import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { UserManagementPage } from "./pages/UserManagementPage/UserManagementPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="m-0 bg-violet flex flex-col items-center">
      <Routes>
        <Route exact
          path="/auth-web-app"
          element={<Navigate to={isAuthenticated ? "/user-management" : "/login"} />}
        />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/user-management"
          element={
            isAuthenticated ? <UserManagementPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  );
};

export default App;