import "./BearCard.css"

export function BearCard({ bear }) {
  return (
    <article className="bear-card">
      {bear.image && (
        <img
          src={bear.image}
          alt={bear.title}
          className="bear-card-image"
        />
      )}

      <div className="bear-card-content">
        <h3>{bear.title}</h3>

        {bear.address && (
          <p className="bear-card-address">
            {bear.address}
          </p>
        )}

        <p>{bear.description}</p>
      </div>
    </article>
  );
}