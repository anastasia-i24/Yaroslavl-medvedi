import { useState, useEffect } from "react";

const STORAGE_KEY = "visited-bears";

export function useVisitedBears() {
    const [visited, setVisited] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
    }, [visited]);

    const toggle = (bearId) => {
        setVisited((prev) =>
            prev.includes(bearId)
                ? prev.filter((id) => id !== bearId)
                : [...prev, bearId]
        );
    };

    const isVisited = (bearId) => visited.includes(bearId);

    return { visited, toggle, isVisited };
}