import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ComparePage from "./pages/ComparePage.jsx";
import RankingsPage from "./pages/RankingsPage.jsx";

function App() {
  return (
    <>
      <div className="header-container">
        <Header />
      </div>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />

          <Route path="/compare" element={<ComparePage />} />
          <Route path="/compare/:id1" element={<ComparePage />} />
          <Route path="/compare/:id1/:id2" element={<ComparePage />} />

          <Route path="/rankings" element={<RankingsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
