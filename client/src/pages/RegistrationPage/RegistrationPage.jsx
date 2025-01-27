import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button/Button";

export const RegistrationPage = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmation, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmation) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${process.env.BACKEND_URL}:5000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: useremail, password, name }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          setErrorMessage("This email is already registered. Please use a different email.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
        return;
      }
      alert("You've registered successfully. Now you can login.");
      navigate("/login");
    } catch (error) {
      setErrorMessage("An error occurred. Please check your connection.");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="m-auto bg-white border border-white rounded-3xl w-[26%] h-[90%] flex justify-center items-center shadow-md max-[768px]:w-[80%] max-[768px]:h-1/2">
        <div className="h-[80%] w-2/3 flex flex-col justify-between items-center">
          <h2 className="text-xl font-bold text-dark-gray max-[768px]:text-base">Registration</h2>
          <form
            className="m-0 w-full h-[90%] flex flex-col justify-between items-center"
            onSubmit={handleRegistration}
          >
            <div className="w-full">
              <label className="block text-gray-700 text-[2vh] font-bold mb-2 max-[768px]:text-[1.6vh]">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full h-12 text-[2vh] pl-4 pr-10 bg-violet-100 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none max-[768px]:text-[1.6vh] max-[768px]:h-9"
                />
              </div>
            </div>
            <div className="w-full">
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
              </div>
            </div>
            <div className="w-full">
              <label className="block text-gray-700 text-[2vh] font-bold mb-2 max-[768px]:text-[1.6vh]">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 text-[2vh] pl-4 pr-10 bg-violet-100 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none max-[768px]:text-[1.6vh] max-[768px]:h-9"
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="confirmation"
                className="block text-gray-700 text-[2vh] font-bold mb-2 max-[768px]:text-[1.6vh]"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmation"
                placeholder="Confirm your password"
                value={confirmation}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full h-12 text-[2vh] pl-4 pr-10 bg-violet-100 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none max-[768px]:text-[1.6vh] max-[768px]:h-9"
              />
            </div>
            {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
            <Button type="submit" text="Register" size="large" />
            <p className="mt-2 text-gray-600 text-center">
              Sign in if you have an account already?{" "}
              <Link to="/login" className="text-purple-600 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
