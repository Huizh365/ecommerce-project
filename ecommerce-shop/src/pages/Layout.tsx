import { Outlet } from "react-router"
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const Layout = () => {
    return (
      <>
        <header>
            < Nav />
        </header>
        <main>
            < Outlet />
        </main>
        <footer>
            < Footer />
        </footer>
      </>
    );
  };