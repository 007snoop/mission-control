const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
const LSS_API_KEY = import.meta.env.VITE_LSS_API_KEY;

export async function fetchSpaceData() {
  try {
    const apiBase = import.meta.env.DEV
      ? '/api'
      : import.meta.env.VITE_API_URL || 'https://api.le-systeme-solaire.net';

    const response = await fetch(`${apiBase}/rest/bodies/`, {
      headers: {
        Authorization: `Bearer ${LSS_API_KEY}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Telemetry connection failed: ${response.status}`);
    }

    const data = await response.json();

    const realPlanets = data.bodies.filter(body => body.isPlanet === true);

    return realPlanets.map(p => ({
      id: p.id,
      name: p.englishName,
      color: p.englishName === "Earth" ? "royalblue" : p.englishName === "Mars" ? "crimson" : "goldenrod",
      distance: `${(p.semimajorAxis / 149597870).toFixed(2)} AU`
    }));
  } catch (e) {
    console.error("NASA API Stream error:", e);
    return [];
  }
  
}


export const iniPlanets = [
  { name: "Earth", color: "royalBlue", distance: "1.00 AU" },
  { name: "Mercury", color: "grey", distance: "0.39 AU" },
  { name: "Venus", color: "golenrod", distance: "0.72 AU" },
  { name: "Mars", color: "crimson", distance: "1.52 AU" },
];
