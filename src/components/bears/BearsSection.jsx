import './BearsSection.css'
import { SectionTitle } from "../SectionTitle";
import { bears } from "../../data/bears";
import { BearCard } from "./BearCard";
import { useVisitedBears } from "./visitedBears";

export function BearsSection() {
  const { visited, toggle, isVisited } = useVisitedBears();
  const bearList = Object.values(bears);
  const total = bearList.length;

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

      <p className="bears-progress">
        Посещено: {visited.length} из {total}
      </p>

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