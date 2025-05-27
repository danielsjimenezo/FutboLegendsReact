import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadPlayerData, loadMaxValues } from "./context/playerSlice.js";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPlayerData());
    dispatch(loadMaxValues());
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;