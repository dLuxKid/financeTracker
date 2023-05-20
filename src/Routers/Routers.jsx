import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function Routers() {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={user ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default Routers;
