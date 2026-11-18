export const Modal = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold"
        >
          &#x2715;
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900">{title}</h2>
        {children}
      </div>
    </div>
  );
};