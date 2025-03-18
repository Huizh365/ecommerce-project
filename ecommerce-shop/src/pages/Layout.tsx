import { Outlet } from "react-router"
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CartProvider } from "../contexts/CartContext";

export const Layout = () => {
    return (
      
      <CartProvider>
        <header>
            < Nav />
        </header>
        <main>
            < Outlet />
        </main>
        <footer>
            < Footer />
        </footer>
        </CartProvider>
      
    );
  };