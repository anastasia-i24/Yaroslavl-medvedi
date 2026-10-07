import './BearsSection.css'
import { SectionTitle } from "../SectionTitle";
import { bears } from "../../data/bears";
import { BearCard } from "./BearCard";
import { useVisitedBears } from "./visitedBears";

export function BearsSection() {
  const { visited, toggle, isVisited, reset } = useVisitedBears();
  const bearList = Object.values(bears);
  const total = bearList.length;
  const progress = total === 0 ? 0 : (visited.length / total) * 100;

  return (
    <section id="bears">
      <SectionTitle
        id="bears"
        title={"Медведи"}
        level={2}
        text={
          "Не все скульптуры вошли в маршруты, поэтому ниже представлен полный список всех медведей. Вы можете использовать этот список как чек-лист и отмечать уже посещённых медведей."
        }
      />

      <div className="bears-progress">
        <div className="bears-progress-header">
          <span className="bears-progress-label">
            Посещено: {visited.length} из {total}
          </span>
          {visited.length > 0 && (
            <button
              type="button"
              className="bears-reset-button"
              onClick={reset}
            >
              Сбросить
            </button>
          )}
        </div>

        <div className="bears-progress-track">
          <div
            className="bears-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bears-grid">
        {bearList.map((bear) => (
          <BearCard
            key={bear.id}
            bear={bear}
            visited={isVisited(bear.id)}
            onToggleVisited={toggle}
          />
        ))}
      </div>
    </section>
  );
}