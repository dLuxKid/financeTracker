import "./App.css";
// PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// COMPONENTS
import Navbar from "./components/Navbar";
import { useAuthContext } from "./contexts/authContext";
import Routers from "./Routers/Routers";

function App() {
  const { authIsReady } = useAuthContext();

  return (
    <main>
      {authIsReady && (
        <>
          <Navbar />
          <Routers />
        </>
      )}
    </main>
  );
}

export default App;
