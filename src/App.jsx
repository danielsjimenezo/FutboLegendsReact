import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ComparePage from "./pages/ComparePage.jsx";
import RankingsPage from "./pages/RankingsPage.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/rankings" element={<RankingsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
