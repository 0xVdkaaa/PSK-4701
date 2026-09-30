export default function Label({ htmlFor, children }) {
    return (
        <label htmlFor={htmlFor} className="block text-gray-700 text-xs font-bold mb-2">
            {children}
        </label>
    );
}