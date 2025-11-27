// Inicializar mapa
const map = L.map('map').setView([-12.0464, -77.0428], 12); // centro por defecto

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Lista de gestores disponibles (nombres en minúscula)
const gestores = ["pedro","katherine","juan"];

// Leer query param ?gestor=nombre
const urlParams = new URLSearchParams(window.location.search);
const gestorParam = urlParams.get('gestor'); 

if (gestorParam && gestores.includes(gestorParam.toLowerCase())) {
    const jsonFile = `data/${gestorParam.toLowerCase()}.json`;
    fetch(jsonFile)
        .then(res => res.json())
        .then(data => {
            data.forEach(pt => {
                L.marker([pt.Lat, pt.Lon])
                 .bindPopup(`<b>${pt.Nombre}</b><br>${pt.Telefono}<br>${pt.Distrito}<br>${pt.Hexagono}<br>${pt.Fecha}`)
                 .addTo(map);
            });
        });
} else {
    alert("Gestor no encontrado o no especificado en la URL");
}
