import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header.jsx";
import Footer from "./layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ComparePage from "./pages/ComparePage.jsx";
import RankingsPage from "./pages/rankingsPage/RankingsPage.jsx";
import CurrentPage from "./pages/currentPage/CurrentPage.jsx";
import LeaguePage from "./pages/leaguePage/LeaguePage.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadPlayerData, loadMaxValues } from "./context/playerSlice.js";

function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loadPlayerData())
    dispatch(loadMaxValues())
  },[])

  return (
    <>
      <div className="header-container">
        <Header />
      </div>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/current" element={<CurrentPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />

          <Route path="/compare" element={<ComparePage />} />
          <Route path="/compare/:id1" element={<ComparePage />} />
          <Route path="/compare/:id1/:id2" element={<ComparePage />} />

          <Route path="/rankings" element={<RankingsPage />} />

          <Route path="/league/:leagueId" element={<LeaguePage />} />
        </Routes>
        <div className="footer-container">
          <Footer />
        </div>
      </main>
    </>
  );
}

export default App;
