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
import { fetchWalkingRouteSegments } from '../../lib/walking';

import { useState, useRef, useEffect, useMemo } from "react";
import { routes } from "../../data/routes";
import { bears } from "../../data/bears";

const POINT_ZOOM = 17;

export function RoutesSection() {
    const mapRef = useRef(null);
    const routeList = Object.values(routes);

    const [selectedRoute, setSelectedRoute] = useState(routeList[0].id);
    const [activeBear, setActiveBear] = useState(null);
    const [routeSegments, setRouteSegments] = useState([]);

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

    useEffect(() => {
        if (routeCoordinates.length < 2) return;

        let cancelled = false;

        (async () => {
            try {
                const segments = await fetchWalkingRouteSegments(routeCoordinates);
                if (!cancelled) {
                    setRouteSegments(segments);
                }
            } catch (err) {
                console.error('Не удалось построить маршрут:', err);

                if (!cancelled) {
                    const fallbackSegments = [];
                    for (let i = 0; i < routeCoordinates.length - 1; i++) {
                        fallbackSegments.push([
                            routeCoordinates[i],
                            routeCoordinates[i + 1],
                        ]);
                    }
                    setRouteSegments(fallbackSegments);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [routeCoordinates]);

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
                text={"Выберите маршрут с помощью кнопок над картой. На карте отобразится путь и все остановки. Под картой находится лента слайдов: первый слайд рассказывает о маршруте, а остальные о его остановках. При перелистывании слайдов карта перемещается к соответствующей точке."}
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
                <YMap
                    ref={mapRef}
                    location={{ center: [39.893813, 57.626559], zoom: 13 }}
                >
                    <YMapDefaultSchemeLayer />
                    <YMapDefaultFeaturesLayer />

                    {routeSegments.map((segment, index) => (
                        <YMapFeature
                            key={`${selectedRoute}-${index}`}
                            geometry={{
                                type: "LineString",
                                coordinates: segment,
                            }}
                            style={{
                                stroke: [
                                    {
                                        color: "rgba(170, 45, 20, 0.8)",
                                        width: 4,
                                        dash: [2, 8]
                                    },
                                ],
                            }}
                        />
                    ))}

                    {currentBears.map((bear) => (
                        <YMapMarker
                            key={bear.id}
                            coordinates={bear.coordinates}
                        >
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