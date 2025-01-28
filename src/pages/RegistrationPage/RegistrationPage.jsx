import { useState } from "react";
import { validatePassword } from "../../hooks/validatePassword";
import { validateEmail } from "../../hooks/validateEmail";
import Button from "../../components/Button/Button";

export const RegistrationPage = () => {
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    return (
      <form 
        className="m-0 w-full h-[86%] flex flex-col justify-between items-center"
      >

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input 
            type="email" 
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            id="email" 
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmation" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
          <input 
            type="password" 
            id="confirmation" 
            value={confirmation}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

        <Button
          type="submit"
          text="Регистрация"
          size="large"
        />
      </form>
    );
};
