

function PlanetNode({ name, color, distance }) {
    return (
        <li style={{color: color, margin: '10px 0', fontSize: '1.2rem', listStyleType: "none"}}>
            <strong>{name}</strong> - Orbit Distance: {distance}
        </li>
    );
}

export default PlanetNode;