import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
// PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// COMPONENTS
import Navbar from "./components/Navbar";
import { useAuthContext } from "./contexts/authContext";

function App() {
  const { authIsReady } = useAuthContext();

  return (
    <main>
      {authIsReady && (
        <>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </>
      )}
    </main>
  );
}

export default App;
