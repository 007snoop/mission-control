import { useMemo, useState } from 'react';

const sunBody = {
  id: 'sun',
  name: 'Sun',
  englishName: 'Sun',
  bodyType: 'Star',
  distance: '0.00 AU',
  distanceAU: 0,
  meanRadiusKm: 696342,
  surfaceGravity: 274,
  orbitalPeriodDays: 0,
  rotationPeriodHours: 609.12,
  avgTemp: 5778,
  moons: [],
};

function formatNumber(value, precision = 1) {
  return value == null || Number.isNaN(value) ? 'Unknown' : value.toFixed(precision);
}

const formatValue = (label, value, unit = '') => (
  <div className="detail-tile">
    <div className="detail-label">{label}</div>
    <div className="detail-value">{typeof value === 'number' ? `${formatNumber(value)}${unit}` : value ?? 'Unknown'}</div>
  </div>
);

function SolarSystem({ planets }) {
  const [selectedId, setSelectedId] = useState(sunBody.id);
  const selectedPlanet = useMemo(
    () => [sunBody, ...planets].find((planet) => planet.id === selectedId) || sunBody,
    [planets, selectedId],
  );

  const sortedPlanets = useMemo(
    () => [...planets].sort((a, b) => (a.distanceAU ?? 0) - (b.distanceAU ?? 0)),
    [planets],
  );

  const maxDistance = Math.max(...sortedPlanets.map((planet) => planet.distanceAU ?? 0), 1);
  const sceneSize = 620;
  const center = sceneSize / 2;
  const orbitBase = 60;
  const orbitMax = 240;
  const planetColors = {
    Mercury: '#b8b8b8',
    Venus: '#d0a76d',
    Earth: '#4da6ff',
    Mars: '#d5553f',
    Jupiter: '#d9a66b',
    Saturn: '#e0c08a',
    Uranus: '#7ad4e0',
    Neptune: '#5a6fe0',
  };

  const sunSelected = selectedId === sunBody.id;

  return (
    <section className="solar-section">
      <div className="solar-grid">
        <div className="solar-scene" aria-label="Solar system map">
          <button
            type="button"
            className={`sun${sunSelected ? ' selected' : ''}`}
            aria-label="Select Sun"
            onClick={() => setSelectedId(sunBody.id)}
          />
          {sortedPlanets.map((planet, index) => {
            const orbitRadius = orbitBase + ((planet.distanceAU ?? 0) / maxDistance) * (orbitMax - orbitBase);
            const angle = (index / sortedPlanets.length) * Math.PI * 2 - Math.PI / 2;
            const x = center + orbitRadius * Math.cos(angle);
            const y = center + orbitRadius * Math.sin(angle);
            const xPercent = (x / sceneSize) * 100;
            const yPercent = (y / sceneSize) * 100;
            const orbitPercent = (orbitRadius * 2 / sceneSize) * 100;
            const planetSize = Math.max(16, Math.min(50, 14 + ((planet.meanRadiusKm ?? 2000) / 2000) * 18));
            const isSelected = planet.id === selectedId;
            const planetColor = planetColors[planet.englishName] ?? '#999';
            const labelOffsetXPercent = (Math.cos(angle) * (planetSize + 14) / sceneSize) * 100;
            const labelOffsetYPercent = (Math.sin(angle) * (planetSize + 14) / sceneSize) * 100;

            return (
              <div key={planet.id}>
                <div
                  className="orbit"
                  style={{ width: `${orbitPercent}%`, height: `${orbitPercent}%` }}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className={`planet-dot${isSelected ? ' selected' : ''}`}
                  style={{
                    width: planetSize,
                    height: planetSize,
                    backgroundColor: planetColor,
                    left: `${xPercent}%`,
                    top: `${yPercent}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isSelected ? 20 : 10,
                  }}
                  onClick={() => setSelectedId(planet.id)}
                />
                <div
                  className="planet-label"
                  style={{
                    left: `${xPercent + labelOffsetXPercent}%`,
                    top: `${yPercent + labelOffsetYPercent}%`,
                  }}
                >
                  {planet.englishName}
                </div>
              </div>
            );
          })}
        </div>

        <aside className="planet-details">
          <div className="details-card">
            <div className="detail-header">
              <div>
                <p className="detail-type">{selectedPlanet.bodyType}</p>
                <h2>{selectedPlanet.englishName}</h2>
                <p className="detail-subtitle">{selectedPlanet.name}</p>
              </div>
              <span className="detail-badge">{selectedPlanet.distance ?? 'Unknown distance'}</span>
            </div>

            <div className="detail-grid">
              {formatValue('Orbit', selectedPlanet.distance ?? 'Unknown')}
              {formatValue('AU', selectedPlanet.distanceAU ?? 'Unknown', ' AU')}
              {formatValue('Radius', selectedPlanet.meanRadiusKm ?? 'Unknown', ' km')}
              {formatValue('Gravity', selectedPlanet.surfaceGravity ?? 'Unknown', ' m/s²')}
              {formatValue('Orbital period', selectedPlanet.orbitalPeriodDays ?? 'Unknown', ' days')}
              {formatValue('Rotation', selectedPlanet.rotationPeriodHours ?? 'Unknown', ' hrs')}
              {formatValue('Temperature', selectedPlanet.avgTemp ?? 'Unknown', ' K')}
              {formatValue('Moons', selectedPlanet.moons?.length ?? 0)}
            </div>

            {selectedPlanet.moons && selectedPlanet.moons.length > 0 && (
              <div className="moon-list">
                <h3>Moons</h3>
                <ul>
                  {selectedPlanet.moons.map((moon) => (
                    <li key={moon.moon}>{moon.moon}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default SolarSystem;
