// Inicializar mapa
const map = L.map('map').setView([-12.0464, -77.0428], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Leer query param ?gestor=nombre
let gestorParam = new URLSearchParams(window.location.search).get('gestor');
if (gestorParam) gestorParam = decodeURIComponent(gestorParam).toLowerCase();

// Función para cargar todos los JSON disponibles desde /data
async function loadGestorData(gestor) {
    const jsonFile = `data/${gestor}.json`;
    try {
        const res = await fetch(jsonFile);
        if (!res.ok) throw new Error("JSON no encontrado");
        const data = await res.json();
        data.forEach(pt => {
            L.marker([pt.Lat, pt.Lon])
             .bindPopup(`<b>${pt.Nombre}</b><br>${pt.Telefono}<br>${pt.Distrito}<br>${pt.Hexagono}<br>${pt.Fecha}`)
             .addTo(map);
        });
    } catch (err) {
        alert("Gestor no encontrado o JSON faltante");
        console.error(err);
    }
}

if (gestorParam) {
    loadGestorData(gestorParam);
} else {
    alert("No se especificó gestor en la URL");
}
