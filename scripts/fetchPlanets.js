import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');
let env = {};

try {
  const envFile = await fs.readFile(envPath, 'utf8');
  for (const line of envFile.split(/\r?\n/)) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (match) {
      env[match[1]] = match[2];
    }
  }
} catch (error) {
  // ignore missing .env
}

const apiKey = process.env.VITE_LSS_API_KEY || env.VITE_LSS_API_KEY;
if (!apiKey) {
  console.error('Missing API key. Set VITE_LSS_API_KEY in .env or in the environment.');
  process.exit(1);
}

if (typeof fetch !== 'function') {
  console.error('Node does not provide fetch. Please run this with Node 18 or newer.');
  process.exit(1);
}

const targetUrl = 'https://api.le-systeme-solaire.net/rest/bodies/';
const response = await fetch(targetUrl, {
  headers: {
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/json',
  },
});

if (!response.ok) {
  throw new Error(`Failed to fetch remote planet data: ${response.status} ${response.statusText}`);
}

const payload = await response.json();
const planets = payload.bodies
  .filter((body) => body.isPlanet === true)
  .sort((a, b) => (a.semimajorAxis || 0) - (b.semimajorAxis || 0))
  .map((body) => ({
    ...body,
    id: body.id ?? body.englishName,
    distance: body.semimajorAxis ? `${(body.semimajorAxis / 149597870).toFixed(2)} AU` : null,
    distanceAU: body.semimajorAxis ? Number((body.semimajorAxis / 149597870).toFixed(6)) : null,
    meanRadiusKm: body.meanRadius ?? null,
    equatorialRadiusKm: body.equaRadius ?? null,
    polarRadiusKm: body.polarRadius ?? null,
    orbitalPeriodDays: body.sideralOrbit ?? null,
    rotationPeriodHours: body.sideralRotation ?? null,
    surfaceGravity: body.gravity ?? null,
  }));

const outputPath = path.resolve(__dirname, '../public/planets.json');
await fs.writeFile(outputPath, JSON.stringify(planets, null, 2), 'utf8');
console.log(`Wrote ${planets.length} planet records to ${outputPath}`);
