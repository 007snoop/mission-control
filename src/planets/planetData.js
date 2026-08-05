export async function fetchSpaceData() {
  try {
    const dataUrl = `${import.meta.env.BASE_URL}planets.json`;
    const response = await fetch(dataUrl, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load planet data: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    console.error('NASA API Stream error:', e);
    return [];
  }
}


export const iniPlanets = [
  { name: "Earth", color: "royalBlue", distance: "1.00 AU" },
  { name: "Mercury", color: "grey", distance: "0.39 AU" },
  { name: "Venus", color: "golenrod", distance: "0.72 AU" },
  { name: "Mars", color: "crimson", distance: "1.52 AU" },
];
