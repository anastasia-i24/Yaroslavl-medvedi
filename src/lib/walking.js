const ROUTING_API_KEY = 'aeed9ec9-94e9-411d-bc16-c43d3d91ebe6';

const ROUTING_URL = 'https://api.routing.yandex.net/v2/route';

export async function fetchWalkingRouteThroughPoints(points) {
    if (points.length < 2) {
        throw new Error('Нужно минимум 2 точки для построения маршрута');
    }

    if (points.length > 25) {
        throw new Error('Routing API принимает не более 25 точек в одном запросе');
    }

    const waypoints = points
        .map(([lon, lat]) => `${lat},${lon}`)
        .join('|');

    const url = `${ROUTING_URL}?apikey=${ROUTING_API_KEY}&waypoints=${waypoints}&mode=walking`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Routing API error: ${response.status}`);
    }

    const data = await response.json();

    return extractCoordinates(data);
}

function extractCoordinates(data) {
    const coords = [];

    if (!data?.route?.legs) {
        return coords;
    }

    data.route.legs.forEach((leg) => {
        leg.steps.forEach((step) => {
            step.geometry.coordinates.forEach((coord) => {
                coords.push(coord);
            });
        });
    });

    return coords;
}