import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  return (
    <>
      <div className="header-container">
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
      <div className="footer-container">
        <Footer />
      </div>
    </>
  );
}
