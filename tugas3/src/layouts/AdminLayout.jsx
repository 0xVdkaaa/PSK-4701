import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdminLayout({ children, title }) {
    return (
        <div className="bg-gray-100 flex min-h-screen font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header title={title} />
                <main className="p-6 flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}