import { useState } from "react";
import Login from "./pages/Login"; // El login que hicimos al inicio
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  // Función para manejar el login exitoso
  const handleLoginSuccess = (data) => {
    localStorage.setItem("access_token", data.access_token);
    setToken(data.access_token);
  };

  return (
    <div className="App">
      {!token ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Layout>
            <Dashboard />
          </Layout>
        </>
      )}
    </div>
  );
}

export default App;
