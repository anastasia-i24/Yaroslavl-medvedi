import './BearsSection.css'
import { SectionTitle } from "../SectionTitle";
import { bears } from "../../data/bears";
import { BearCard } from "./BearCard";

export function BearsSection() {
  return (
    <section id="bears">
        <SectionTitle
            id="bears"
            title={"Медведи"}
            level={3}
            text={"Список всех медведей"}
        />

      <div className="bears-grid">
        {Object.values(bears).map((bear) => (
          <BearCard key={bear.id} bear={bear} />
        ))}
      </div>
    </section>
  );
}