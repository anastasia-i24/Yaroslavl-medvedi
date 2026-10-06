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

import { useState, useRef, useEffect } from "react";
import { routes } from "../../data/routes";
import { bears } from "../../data/bears";

const POINT_ZOOM = 17;

export function RoutesSection() {
    const mapRef = useRef(null);
    const routeList = Object.values(routes);

    const [selectedRoute, setSelectedRoute] = useState(routeList[0].id);
    const [activeBear, setActiveBear] = useState(null);

    const currentRoute = routeList.find((r) => r.id === selectedRoute);

    const currentBears = currentRoute.bears
        .map((bearId) => bears[bearId])
        .filter(Boolean);

    const routeCoordinates = currentBears.map((b) => b.coordinates);

    useEffect(() => {
        const expected = currentBears.length + 1;
        if (currentRoute.slides.length !== expected) {
            console.warn(
                `[${selectedRoute}] слайдов ${currentRoute.slides.length}, ` +
                `медведей ${currentBears.length}, ожидалось слайдов ${expected}`
            );
        }
        if (currentRoute.nums && currentRoute.nums.length !== currentRoute.slides.length) {
            console.warn(
                `[${selectedRoute}] nums ${currentRoute.nums.length} ≠ slides ${currentRoute.slides.length}`
            );
        }
    }, [selectedRoute, currentBears.length, currentRoute.slides.length, currentRoute.nums]);

    useEffect(() => {
        if (routeCoordinates.length === 0) return;

        const lons = routeCoordinates.map((c) => c[0]);
        const lats = routeCoordinates.map((c) => c[1]);

        mapRef.current?.setLocation({
            bounds: [
                [Math.min(...lons), Math.min(...lats)],
                [Math.max(...lons), Math.max(...lats)],
            ],
            duration: 500,
        });
    }, [selectedRoute]);

    useEffect(() => {
        if (!activeBear) {
            if (routeCoordinates.length === 0) return;

            const lons = routeCoordinates.map((c) => c[0]);
            const lats = routeCoordinates.map((c) => c[1]);

            mapRef.current?.setLocation({
                bounds: [
                    [Math.min(...lons), Math.min(...lats)],
                    [Math.max(...lons), Math.max(...lats)],
                ],
                duration: 500,
            });
            return;
        }

        const bear = bears[activeBear];
        if (!bear) return;

        mapRef.current?.setLocation({
            center: bear.coordinates,
            zoom: POINT_ZOOM,
            duration: 500,
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
                <YMap
                    ref={mapRef}
                    location={{ center: [39.893813, 57.626559], zoom: 13 }}
                >
                    <YMapDefaultSchemeLayer />
                    <YMapDefaultFeaturesLayer />

                    {routeCoordinates.length > 1 && (
                        <YMapFeature
                            geometry={{
                                type: "LineString",
                                coordinates: routeCoordinates,
                            }}
                            style={{
                                stroke: [{ color: "#851D09", width: 5 }],
                            }}
                        />
                    )}

                    {currentBears.map((bear) => (
                        <YMapMarker
                            key={bear.id}
                            coordinates={bear.coordinates}
                        >
                            <div
                                className={
                                    activeBear === bear.id
                                        ? "bear-marker active"
                                        : "bear-marker"
                                }
                            >
                                <img
                                    src={bear.image}
                                    alt=""
                                    className="bear-paw-marker"
                                />
                            </div>
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
                onSlideChange={(bearId) => setActiveBear(bearId)}
            />
        </>
    );
}