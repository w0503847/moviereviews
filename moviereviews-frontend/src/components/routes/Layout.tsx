import { Outlet } from "react-router";

export default function Layout() {
    return (
        <>
            <nav className="navbar">
            </nav>
            
            <main className="container">
                <Outlet />
            </main>

            <footer className="container mb-4">
                <p>Copyright &copy; 2026 Movie Reviews</p>
            </footer>
        </>)
}