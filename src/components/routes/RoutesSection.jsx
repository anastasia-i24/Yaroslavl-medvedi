import './RoutesSection.css'

import { SectionTitle } from '../SectionTitle';
import { RouteSelector } from "./RouteSelector";
import { RoutePresentation } from "./RoutePresentation";

import {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapFeature,
} from "../../lib/ymaps3";
import { fetchWalkingRouteThroughPoints } from '../../lib/walking';

import { useState, useRef, useEffect, useMemo } from "react";
import { routes } from "../../data/routes";
import { bears } from "../../data/bears";

const POINT_ZOOM = 17;

export function RoutesSection() {
    const mapRef = useRef(null);
    const routeList = Object.values(routes);

    const [selectedRoute, setSelectedRoute] = useState(routeList[0].id);
    const [activeBear, setActiveBear] = useState(null);
    const [routePath, setRoutePath] = useState([]);

    const currentRoute = routeList.find((r) => r.id === selectedRoute);

    const currentBears = useMemo(
        () =>
            currentRoute.bears
                .map((id) => Object.values(bears).find((b) => b.id === id))
                .filter(Boolean),
        [currentRoute]
    );

    const routeCoordinates = useMemo(
        () => currentBears.map((b) => b.coordinates),
        [currentBears]
    );

    // Показываем весь маршрут ТОЛЬКО при смене маршрута
    useEffect(() => {
        if (routeCoordinates.length === 0) return;

        const lons = routeCoordinates.map((c) => c[0]);
        const lats = routeCoordinates.map((c) => c[1]);

        mapRef.current?.update({
            location: {
                bounds: [
                    [Math.min(...lons), Math.min(...lats)],
                    [Math.max(...lons), Math.max(...lats)],
                ],
                duration: 500,
            },
        });
    }, [routeCoordinates]);

    // Загрузка пешеходного маршрута
    useEffect(() => {
        if (routeCoordinates.length < 2) {
            return;
        }

        let cancelled = false;

        (async () => {
            try {
                const path = await fetchWalkingRouteThroughPoints(routeCoordinates);
                if (!cancelled) {
                    setRoutePath(path);
                }
            } catch (err) {
                console.error('Не удалось построить маршрут:', err);
                if (!cancelled) {
                    setRoutePath(routeCoordinates);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [routeCoordinates]);

    // Перемещение к медведю — просто, без логики «откуда пришли»
    useEffect(() => {
        if (!activeBear) return;

        const bear = Object.values(bears).find((b) => b.id === activeBear);
        if (!bear) return;

        mapRef.current?.update({
            location: {
                center: bear.coordinates,
                zoom: POINT_ZOOM,
                duration: 500,
            },
        });
    }, [activeBear]);

    return (
        <>
            <SectionTitle
                id="routes"
                title={"Маршруты"}
                level={2}
                text={"TBD: Тут какой-то текст про маршруты"}
            />

            <RouteSelector
                routes={routeList}
                selectedRoute={selectedRoute}
                onSelect={(routeId) => {
                    setSelectedRoute(routeId);
                    setActiveBear(null);
                }}
            />

            <div className="map">
                <YMap ref={mapRef} location={{ center: [39.893813, 57.626559], zoom: 13 }}>
                    <YMapDefaultSchemeLayer />
                    <YMapDefaultFeaturesLayer />

                    {routePath.length > 1 && (
                        <YMapFeature
                            geometry={{ type: "LineString", coordinates: routePath }}
                            style={{ stroke: [{ color: "#851D09", width: 5 }] }}
                        />
                    )}

                    {currentBears.map((bear) => (
                        <YMapMarker key={bear.id} coordinates={bear.coordinates}>
                            <img
                                src={bear.image}
                                alt=""
                                className={`bear-marker${activeBear === bear.id ? ' active' : ''}`}
                            />
                        </YMapMarker>
                    ))}
                </YMap>
            </div>

            <RoutePresentation
                bears={currentBears}
                slides={currentRoute.slides}
                nums={currentRoute.nums}
                fullTitle={currentRoute.full_title}
                activeBear={activeBear}
                selectedRoute={selectedRoute}
                onSlideChange={setActiveBear}
            />
        </>
    );
}