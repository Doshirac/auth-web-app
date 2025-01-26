// import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthPage } from "./pages/AuthPage";
// import { UserManagementPage } from "./pages/UserManagementPage/UserManagementPage";

// const App = () => {
//   const isAuthenticated = !!localStorage.getItem("token");

//   return (
//     <div className="m-0 bg-violet flex flex-col items-center">
//       <Routes>
//         <Route path="/" element={<Navigate to={isAuthenticated ? "/user-management" : "/auth"} />} />
//         <Route path="/auth" element={<AuthPage />} />
//         <Route
//           path="/user-management"
//           element={
//             isAuthenticated ? <UserManagementPage /> : <Navigate to="/auth" />
//           }
//         />
//       </Routes>
//     </div>
//   );
// };

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { UserManagementPage } from "./pages/UserManagementPage/UserManagementPage";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="m-0 bg-violet flex flex-col items-center">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/user-management" : "/login"} />}
        />
        <Route path="/login" element={<LoginPage />} />
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