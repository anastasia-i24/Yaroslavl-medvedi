import "./RouteSelector.css";

export function RouteSelector({ routes, selectedRoute, onSelect }) {
  return (
    <div className="route-selector">
      {routes.map((route) => (
        <button
          key={route.id}
          className={
            selectedRoute === route.id
              ? "route-button active"
              : "route-button"
          }
          onClick={() => onSelect(route.id)}
        >
          {route.short_title}
        </button>
      ))}
    </div>
  );
}