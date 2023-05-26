// STYLES
import "./App.css";
// COMPONENTS
import Navbar from "./components/Navbar";
// CONTEXT HOOK
import { useAuthContext } from "./contexts/authContext";
// ROUTES
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
