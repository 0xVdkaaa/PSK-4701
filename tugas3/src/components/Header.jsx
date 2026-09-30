export default function Header({ title }) {
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </header>
    );
}