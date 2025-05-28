import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import ProtectedRoute from "./loaders/appLoader";
import ProtectedLayout from "../layout/ProtectedLayout";
import HomePage from "../pages/homePage/HomePage";
import CurrentPage from "../pages/currentPage/CurrentPage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import ComparePage from "../pages/comparePage/ComparePage";
import RankingsPage from "../pages/rankingsPage/RankingsPage";
import LeaguePage from "../pages/leaguePage/LeaguePage";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function AppRoutes() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<ProtectedLayout />}>
              <Route index element={<HomePage />} />
              <Route path="current" element={<CurrentPage />} />
              <Route path="profile/:id" element={<ProfilePage />} />
              <Route path="compare" element={<ComparePage />} />
              <Route path="compare/:id1" element={<ComparePage />} />
              <Route path="compare/:id1/:id2" element={<ComparePage />} />
              <Route path="rankings" element={<RankingsPage />} />
              <Route path="league/:leagueId" element={<LeaguePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}
