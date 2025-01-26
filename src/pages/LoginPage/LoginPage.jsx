import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { ReactComponent as ShowPasswordIcon } from "../../assets/images/visibility.svg";
import { ReactComponent as HidePasswordIcon } from "../../assets/images/visibility_off.svg";
import { ReactComponent as PersonIcon } from "../../assets/images/person.svg";

export const LoginPage = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCancel = () => {
    setUseremail("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: useremail, password }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          setErrorMessage("Your account is blocked. Please contact support.");
        } else if (response.status === 401) {
          setErrorMessage("Invalid email or password.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("You've logged in successfully.");
      navigate("/user-management");
    } catch (error) {
      setErrorMessage("An error occurred. Please check your connection.");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="m-auto bg-white border border-white rounded-3xl w-[26%] h-3/4 flex justify-center items-center shadow-md max-[768px]:w-[80%] max-[768px]:h-1/2">
        <div className="h-[80%] w-2/3 flex flex-col justify-between items-center">
          <h2 className="text-xl font-bold text-dark-gray max-[768px]:text-base">Login</h2>
          <form
            className="m-0 w-full h-[86%] flex flex-col justify-between items-center"
            onSubmit={handleLogin}
          >
            <div className="w-full flex flex-col items-start">
              <div className="w-full h-[82%] flex flex-col items-center">
                <div className="w-full mb-4">
                  <label className="block text-gray-700 text-[2vh] font-bold mb-2 max-[768px]:text-[1.6vh]">
                    E-mail
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={useremail}
                      onChange={(e) => setUseremail(e.target.value)}
                      required
                      className="w-full h-12 text-[2vh] pl-4 pr-10 bg-violet-100 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none max-[768px]:text-[1.6vh] max-[768px]:h-9"
                    />
                    <PersonIcon className="absolute right-2 top-3.5 text-gray-400 w-8 h-4 max-[768px]:top-2.5" />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-gray-700 text-[2vh] font-bold mb-2 max-[768px]:text-[1.6vh]">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full h-12 text-[2vh] pl-4 pr-10 bg-violet-100 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none max-[768px]:text-[1.6vh] max-[768px]:h-9"
                    />
                    {showPassword ? (
                      <HidePasswordIcon
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-3 text-gray-400 cursor-pointer w-8 h-6 max-[768px]:top-2"
                      />
                    ) : (
                      <ShowPasswordIcon
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-3 text-gray-400 cursor-pointer w-8 h-6 max-[768px]:top-2"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
            <Button type="submit" text="Sign in" size="large" />
            <a
              href="/"
              className="text-center text-[2.2vh] text-sm text-purple-600 hover:underline max-[768px]:text-[1.8vh]"
            >
              Forgot password?
            </a>
            <Button
              type="button"
              text="Cancel"
              size="medium"
              buttonType="secondary"
              onClick={handleCancel}
            />
            <p className="mt-2 text-gray-600 text-center">
              Sign up if not registered yet?{" "}
              <Link to="/register" className="text-purple-600 hover:underline">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
