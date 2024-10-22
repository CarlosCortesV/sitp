document.addEventListener("DOMContentLoaded", function () {
    const busList = document.getElementById("bus-list");
    const alertList = document.getElementById("alert-list");

    const map = L.map('map-container').setView([4.60971, -74.08175], 12);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);


    let busMarkers = [];

    function updateBusPositions(buses) {

        busMarkers.forEach(marker => map.removeLayer(marker));
        busMarkers = [];

        buses.forEach(bus => {
            const { route, location, nextStop } = bus;
            const lat = 4.60971 + (Math.random() - 0.5) / 100;
            const lng = -74.08175 + (Math.random() - 0.5) / 100;

            // Crear un marcador para el bus
            const marker = L.marker([lat, lng])
                .bindPopup(`<b>Ruta: ${route}</b><br>Ubicación: ${location}<br>Próxima parada: ${nextStop}`)
                .addTo(map);
            
            busMarkers.push(marker);
        });
    }


    function generateRandomBusData() {
        const routes = ["A12", "B24", "C18", "D34", "E27"];
        const locations = ["Calle 45", "Avenida Caracas", "Carrera 30", "Calle 72", "Calle 100"];
        const stops = ["Estación Museo del Oro", "Portal 80", "Estación Calle 76", "Portal Usme", "Estación Universidades"];

        const buses = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
            route: routes[Math.floor(Math.random() * routes.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            nextStop: stops[Math.floor(Math.random() * stops.length)]
        }));

        return buses;
    }

    // Función para mostrar la información generada de buses
    function displayBusInfo(buses) {
        if (buses.length === 0) {
            busList.innerHTML = "<p>No hay buses en servicio.</p>";
            return;
        }
        busList.innerHTML = buses.map(bus => `
            <div class="bus-item">
                <br><p>Ruta: ${bus.route}</p>
                <p>Ubicación: ${bus.location}</p>
                <p>Próxima parada: ${bus.nextStop}</p>
            </div>
        `).join("");
    }


    function generateRandomAlerts() {
        const messages = [
            "Retraso en la ruta A12 debido a tráfico pesado.",
            "Desvío en la ruta B24 por manifestaciones.",
            "Servicio normal en todas las rutas.",
            "Falla mecánica en la ruta C18, espere demoras.",
            "Desvíos por trabajos de mantenimiento en la Avenida Caracas."
        ];

        const alerts = Array.from({ length: Math.floor(Math.random() * 3) }, () => ({
            message: messages[Math.floor(Math.random() * messages.length)]
        }));

        return alerts;
    }


    function displayAlerts(alerts) {
        if (alerts.length === 0) {
            alertList.innerHTML = "<p>Sin alertas actuales.</p>";
            return;
        }
        alertList.innerHTML = alerts.map(alert => `
            <div class="alert-item">
                <p>${alert.message}</p>
            </div>
        `).join("");
    }

    function updateFakeData() {
        const buses = generateRandomBusData();
        const alerts = generateRandomAlerts();

        displayBusInfo(buses);
        displayAlerts(alerts);
        updateBusPositions(buses); 
    }


    setInterval(updateFakeData, 30000);


    updateFakeData();
});
