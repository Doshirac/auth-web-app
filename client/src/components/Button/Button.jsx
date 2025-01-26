const sizeClasses = {
    large: 'w-full h-12 max-[768px]:h-10',
    medium: 'w-32 h-10 max-[768px]:h-8 max-[768px]:w-1/3',
    small: 'w-12 h-10 max-[768px]:h-8',
  };
  
  const typeClasses = {
    primary: 'bg-violet text-white font-bold border-violet-600',
    secondary: 'bg-transparent border-purple text-violet-600 border-violet-600',
    tertiary: 'bg-red-400 text-slate-950 font-bold border-red-600',
  };
  
  const Button = ({ buttonType = "primary", size = "small", type = "button", onClick, text }) => {
    const sizeClass = sizeClasses[size] || '';
    const typeClass = typeClasses[buttonType] || ''
    return (
      <button
        type={type}
        className={`border ${typeClass} ${sizeClass} rounded-md text-center text-base leading-7 tracking-wide text-transform: uppercase max-[768px]:text-sm`}
        onClick={onClick}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  