import "./RoutePresentation.css";

export function RoutePresentation({
  bears,
  activeBear,
  onBearSelect,
}) {
  return (
    <div className="route-presentation">
      {bears.map((bear) => (
        <article
          key={bear.id}
          className={
            activeBear === bear.id
              ? "presentation-card active"
              : "presentation-card"
          }
          onClick={() => onBearSelect(bear.id)}
        >
          {bear.image && (
            <img
              src={bear.image}
              alt={bear.title}
            />
          )}

          <div className="presentation-card-content">
            <h3>{bear.title}</h3>

            {bear.address && (
              <p className="presentation-address">
                {bear.address}
              </p>
            )}

            <p>{bear.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}