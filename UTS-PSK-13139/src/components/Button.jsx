export const Button = ({ type = "button", onClick, children, className = "", wFull = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${wFull ? 'w-full' : ''} bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};