export default function Input({ id, name, type, placeholder, value, onChange }) {
    return (
        <input 
            id={id} 
            name={name}
            type={type} 
            placeholder={placeholder} 
            value={value}
            onChange={onChange}
            className="border border-gray-300 rounded w-full py-2 px-3 text-sm focus:outline-none focus:border-blue-500" 
        />
    );
}