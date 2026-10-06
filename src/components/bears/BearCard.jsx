import "./BearCard.css";

export function BearCard({ bear, visited, onToggleVisited }) {
    return (
        <article className={`bear-card${visited ? " visited" : ""}`}>
            {bear.image && (
                <img
                    src={bear.image}
                    alt={bear.title}
                    className="bear-card-image"
                />
            )}

            <button
                type="button"
                className="bear-card-check"
                aria-label={
                    visited
                        ? "Снять отметку о посещении"
                        : "Отметить как посещённого"
                }
                aria-pressed={visited}
                onClick={() => onToggleVisited(bear.id)}
            >
                {visited && (
                  <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  >
                      <polyline points="4 12 10 18 20 6" />
                  </svg>
              )}
            </button>

            <div className="bear-card-content">
                <h3>{bear.title}</h3>

                {bear.address && (
                    <p className="bear-card-address">{bear.address}</p>
                )}

                <p>{bear.description}</p>
            </div>
        </article>
    );
}