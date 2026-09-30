export default function Input({ id, type, placeholder, value, onChange }) {
    return (
        <input 
            id={id} 
            type={type} 
            placeholder={placeholder} 
            value={value}
            onChange={onChange}
            className="border border-gray-300 rounded w-full py-2 px-3 text-sm focus:outline-none focus:border-blue-500" 
        />
    );
}