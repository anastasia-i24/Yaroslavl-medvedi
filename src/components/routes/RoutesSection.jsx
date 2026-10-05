import './RoutesSection.css'

import { SectionTitle } from '../SectionTitle';
import { RouteSelector } from "./RouteSelector";
import { RoutePresentation } from "./RoutePresentation";

import { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } from "../../lib/ymaps3";

import { useState } from "react";
import { routes } from "../../data/routes";
import { bears } from "../../data/bears";

export function RoutesSection() {
    // Превращаем объект маршрутов в массив
    const routeList = Object.values(routes);

    const [selectedRoute, setSelectedRoute] = useState(
        routeList[0].id
    );

    const [activeBear, setActiveBear] = useState(null);


    // Находим выбранный маршрут
    const currentRoute = routeList.find(
        (route) => route.id === selectedRoute
    );


    // Получаем медведей выбранного маршрута
    const currentBears = currentRoute.bears
        .map((bearId) => bears[bearId])
        .filter(Boolean);

    return (
        <>
            <SectionTitle
                id="routes"
                title={"Маршруты"}
                level={3}
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
                <YMap location={{center: [39.893813, 57.626559], zoom: 13}}>
                    <YMapDefaultSchemeLayer />
                    <YMapDefaultFeaturesLayer />
                </YMap>
            </div>

            <RoutePresentation
                bears={currentBears}
                activeBear={activeBear}
                onBearSelect={setActiveBear}
            />
        </>
    );
}