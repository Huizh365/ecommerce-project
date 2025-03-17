import { Outlet } from "react-router"
import { AdminNav } from "../components/AdminNav";

export const AdminLayout = () => {
    return (
      <>
        <header>
            < AdminNav />
        </header>
        <main>
            < Outlet />
        </main>

      </>
    );
  };