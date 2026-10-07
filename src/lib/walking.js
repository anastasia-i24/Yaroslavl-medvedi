import polyline from '@mapbox/polyline';

const OSRM_URL = 'https://routing.openstreetmap.de/routed-foot/route/v1/foot';

export async function fetchWalkingRouteSegments(points) {
    if (points.length < 2) {
        throw new Error('Нужно минимум 2 точки для построения маршрута');
    }

    const coordsString = points
        .map(([lon, lat]) => `${lon},${lat}`)
        .join(';');

    const url = `${OSRM_URL}/${coordsString}?geometries=polyline&overview=full`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`OSRM API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
        throw new Error('OSRM не вернул маршрут');
    }

    const route = data.routes[0];

   
    if (typeof route.geometry === 'string') {
        const decoded = polyline.decode(route.geometry);

        

        const coordinates = decoded.map(([lat, lon]) => [lon, lat]);

        return [coordinates];
    }

    if (route.geometry?.coordinates?.length > 1) {
        return [route.geometry.coordinates];
    }

    throw new Error('OSRM вернул маршрут без геометрии');
}