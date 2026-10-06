import "./RoutePresentation.css";
import { useEffect, useRef } from "react";

export function RoutePresentation({
    bears,
    slides,
    nums,
    fullTitle,
    activeBear,
    onSlideChange,
}) {
    const cardsRef = useRef(null);

    useEffect(() => {
        const container = cardsRef.current;
        if (!container) return;

        const cards = Array.from(container.children);

        const observer = new IntersectionObserver(
            (entries) => {
                // находим карточку с максимальным пересечением
                let best = null;
                entries.forEach((entry) => {
                    if (
                        entry.isIntersecting &&
                        (!best || entry.intersectionRatio > best.intersectionRatio)
                    ) {
                        best = entry;
                    }
                });

                if (best) {
                    const bearId = best.target.dataset.bearId;
                    onSlideChange(bearId || null);
                }
            },
            {
                root: container,
                threshold: [0.25, 0.5, 0.75, 1],
            }
        );

        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, [bears, slides, onSlideChange]);

    return (
        <div className="route-presentation" ref={cardsRef}>
            {slides.map((slide, index) => {
                const num = nums?.[index] ?? index;
                const bear = index === 0 ? null : bears[index - 1];

                return (
                    <article
                        key={num}
                        data-bear-id={bear?.id || ""}
                        className={
                            bear && activeBear === bear.id
                                ? "presentation-card active"
                                : "presentation-card"
                        }
                    >
                        {index === 0 ? (
                            <div className="presentation-card-content intro-slide">
                                <h2 className="presentation-full-title">
                                    {fullTitle}
                                </h2>
                                <p className="presentation-text">
                                    {slide}
                                </p>
                            </div>
                        ) : (
                            <div className="presentation-card-content">
                                <div className="slide-number">{num}</div>
                                <p className="presentation-text">
                                    {slide}
                                </p>
                            </div>
                        )}
                    </article>
                );
            })}
        </div>
    );
}