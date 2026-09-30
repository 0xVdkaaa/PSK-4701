export default function AuthLayout({ children }) {
    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans">
            {children}
        </div>
    );
}