import "./App.css";
import { iniPlanets } from "./planets/planetData";
import PlanetNode from "./planets/PlanetNode";
import { useState, useEffect } from "react";
import { fetchSpaceData } from "./planets/planetData";

function App() {
  const greeting = "Welcome to Mission Control!";
  const [iniPlanets, setPlanets] = useState([]);
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
        <ul>
        {iniPlanets.map((planet) => (
          <PlanetNode 
          key={planet.id}
          name={planet.name}
          color={planet.color}
          distance={planet.distance}
          />
        ))}
      </ul>
      )}
    </div>
  );
}

export default App;
