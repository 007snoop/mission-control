import "./App.css";
import SolarSystem from "./planets/SolarSystem";
import { useState, useEffect } from "react";
import { fetchSpaceData } from "./planets/planetData";
import Footer from "./assets/Footer";

function App() {
  const greeting = "Welcome to Mission Control!";
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const liveData = await fetchSpaceData();
      setPlanets(liveData);
      setLoading(false);
    }

    loadData();
  }, []);

 
  return (
    <div
      style={{
        backgroundColor: "#0B3C5D",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>{greeting}</h1>
      <p>A real time map of our cosmic neighbourhood</p>

      <hr style={{borderColor: '#328CC1', margin: '20px 0' }} />

      {loading ? (
        <p>Accessing deep space telemetry...</p>
      ) : (
        <SolarSystem planets={planets} />
      )}

      <Footer />
      
    </div>
  );
}

export default App;
