import { useEffect, useMemo, useRef, useState } from "react";
import "./RoutesSection.css";
import { routes } from "../../data/routes";
import { bears } from "../../data/bears";
import { places } from "../../data/places";
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  YMapFeature,
} from "../../lib/ymaps3";
import { fetchWalkingRouteSegments } from "../../lib/walking";

const bearsById = Object.fromEntries(Object.values(bears).map((b) => [b.id, b]));


const fallbackTo = (src) => (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = src;
};

export function RoutesSection() {
  const routeIds = Object.keys(routes);
  const [routeId, setRouteId] = useState(routeIds[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [walkLine, setWalkLine] = useState(null);
  const trackRef = useRef(null);

  const route = routes[routeId];

  const routeBears = useMemo(
    () => route.bears.map((id) => bearsById[id]).filter(Boolean),
    [route]
  );

  const routeStops = useMemo(
    () =>
      routeBears.map((b) => {
        const p = places[b.id] || {};
        return {
          id: b.id,
          title: p.title ?? b.title,
          address: p.address ?? b.address,
          image: p.image ?? b.image,
          fallback: b.image,
          coordinates: p.coordinates ?? b.coordinates,
        };
      }),
    [routeBears]
  );

  useEffect(() => {
    setActiveIndex(0);
    if (trackRef.current) trackRef.current.scrollTo({ left: 0 });
  }, [routeId]);

  useEffect(() => {
    let cancelled = false;
    const points = routeStops.map((s) => s.coordinates);
    setWalkLine(null);
    fetchWalkingRouteSegments(points)
      .then((segments) => !cancelled && setWalkLine(segments[0]))
      .catch(() => !cancelled && setWalkLine(points));
    return () => {
      cancelled = true;
    };
  }, [routeStops]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveIndex(Number(e.target.dataset.index));
        });
      },
      { root: track, threshold: 0.6 }
    );
    track.querySelectorAll(".rt-slide").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [routeId]);

  const scrollToSlide = (i) => {
    const el = trackRef.current?.querySelector(`[data-index="${i}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const go = (dir) => {
    const next = Math.max(0, Math.min(route.slides.length - 1, activeIndex + dir));
    scrollToSlide(next);
  };

  const activeStop = activeIndex > 0 ? routeStops[activeIndex - 1] : null;
  const location = useMemo(() => {
    if (activeStop) {
      return { center: activeStop.coordinates, zoom: 17, duration: 1200, easing: "ease-in-out" };
    }
    const lons = routeStops.map((s) => s.coordinates[0]);
    const lats = routeStops.map((s) => s.coordinates[1]);
    const pad = 0.004;
    return {
      bounds: [
        [Math.min(...lons) - pad, Math.min(...lats) - pad],
        [Math.max(...lons) + pad, Math.max(...lats) + pad],
      ],
      duration: 1200,
      easing: "ease-in-out",
    };
  }, [activeStop, routeStops]);

  return (
    <section className="rt">
      <div className="rt-tabs">
        {routeIds.map((id) => (
          <button
            key={id}
            className={"rt-tab" + (id === routeId ? " rt-tab--active" : "")}
            onClick={() => setRouteId(id)}
          >
            {routes[id].short_title}
          </button>
        ))}
      </div>

      <div className="rt-map">
        <YMap location={location}>
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />

          {walkLine && (
            <YMapFeature
              geometry={{ type: "LineString", coordinates: walkLine }}
              style={{
                stroke: [
                  {
                    color: "#b3261e",
                    width: 4,
                    opacity: 0.9,
                    dash: [2, 8],
                    cap: "round",
                  },
                ],
              }}
            />
          )}

          {routeStops.map((s, i) => (
            <YMapMarker
              key={s.id}
              coordinates={s.coordinates}
              zIndex={activeIndex === i + 1 ? 1000 : 1}
            >
              <div
                className={"rt-pin" + (activeIndex === i + 1 ? " rt-pin--active" : "")}
                onClick={() => scrollToSlide(i + 1)}
                title={s.title}
              >
                <img src={s.fallback} alt={s.title} />
                <span className="rt-pin-num">{i + 1}</span>
              </div>
            </YMapMarker>
          ))}
        </YMap>
      </div>

      <div className="rt-slides" ref={trackRef}>
        {route.slides.map((text, i) => {
          const stop = i > 0 ? routeStops[i - 1] : null;
          const bear = i > 0 ? routeBears[i - 1] : null;
          return (
            <article className="rt-slide" data-index={i} key={routeId + i}>
              {stop && (
                <img
                  className="rt-slide-img"
                  src={stop.image}
                  alt={stop.title}
                  onError={fallbackTo(stop.fallback)}
                />
              )}
              <div className="rt-slide-body">
                <h3 className="rt-slide-title">{stop ? stop.title : route.full_title}</h3>
                {stop && <p className="rt-address">{stop.address}</p>}
                <p className="rt-slide-text">{text}</p>
                {bear && (
                  <div className="rt-bear-chip">
                    <img src={bear.image} alt="" />
                    <span>Рядом: {bear.title}</span>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="rt-controls">
        <button onClick={() => go(-1)} disabled={activeIndex === 0}>‹</button>
        <span>{activeIndex + 1} / {route.slides.length}</span>
        <button onClick={() => go(1)} disabled={activeIndex === route.slides.length - 1}>›</button>
      </div>
    </section>
  );
}