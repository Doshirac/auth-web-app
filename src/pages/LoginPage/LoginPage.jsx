import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { ReactComponent as ShowPasswordIcon } from "../../assets/images/visibility.svg";
import { ReactComponent as HidePasswordIcon } from "../../assets/images/visibility_off.svg";
import { ReactComponent as PersonIcon } from "../../assets/images/person.svg";


export const LoginPage = () => {
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCancel = () => {
        setUseremail('');
        setPassword('');
    };

    return (
        <form className="m-0 w-full h-[86%] flex flex-col justify-between items-center">
            <div className="w-full h-[56%] flex flex-col justify-between items-start">
                <div className="w-full">
                    <label className="block text-gray-700 text-[2vh] font-bold mb-2 max-[768px]:text-[1.6vh]">E-mail</label>
                    <div className="relative">
                        <input
                            type="email"
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                            placeholder="Enter your email"
                            value={useremail}
                            onChange={(e) => setUseremail(e.target.value)}
                            required
                            className="w-full h-11 text-[2vh] pl-4 pr-10 bg-violet-100 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none max-[768px]:text-[1.6vh] max-[768px]:h-9"
                        />
                        <PersonIcon className="absolute right-2 top-3.5 text-gray-400 w-8 h-4 max-[768px]:top-2.5" />
                    </div>
                </div>
                <div className="w-full">
                    <label className="block text-gray-700 text-[2vh] font-bold mb-2 max-[768px]:text-[1.6vh]">Пароль</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full h-11 text-[2vh] pl-4 pr-10 bg-violet-100 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none max-[768px]:text-[1.6vh] max-[768px]:h-9"
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
                <label className="flex items-center text-black font-semibold">
                    <input
                        className="mr-4 bg-violet-100 h-full w-4"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="text-[2vh] max-[768px]:text-[1.6vh]">Запомнить меня</span>
                </label>
            </div>
            {errorMessage && (
                <div className="text-red-500 text-sm mb-4">
                    {errorMessage}
                </div>
            )}
            <Button
                    type="submit"
                    text="ВОЙТИ"
                    size="large"
            />
            <a href="/" className="text-center text-sm text-purple-600 hover:underline">
                Забыли пароль?
            </a>
            <Button type="button" text="Отмена" size="medium" buttonType="secondary" onClick={() => {handleCancel()} }/>
        </form>
    );
}
