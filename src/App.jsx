import './App.css'
import { NavBar } from './components/NavBar';
import { BearsSection } from "./components/bears/BearsSection";
import { RoutesSection } from './components/routes/RoutesSection';
import { SourcesSection } from './components/sources/SourcesSection';
import { ScrollToTop } from "./components/ScrollTop";

const FACTS = [
  {
    year: "1010",
    title: "Город и медведь",
    text: "По преданию, князь Ярослав Мудрый основал город на месте языческого святилища и победил в схватке медведя. С тех пор зверь стал символом Ярославля.",
  },
  {
    year: "1778",
    title: "Герб с алебардой",
    text: "На гербе города медведь держит на плече золотую алебарду. Эта легенда до сих пор оживает в скульптурах на улицах.",
  },
  {
    year: "1612",
    title: "Столица на три месяца",
    text: "Во время Смуты в Ярославле стояло Второе ополчение Минина и Пожарского, и город фактически стал центром страны.",
  },
  {
    year: "2005",
    title: "Наследие ЮНЕСКО",
    text: "Исторический центр Ярославля внесён в список Всемирного наследия ЮНЕСКО.",
  },
];

function App() {
  return (
    <>
      <NavBar />

      <header className="hero">
        <h1 className="hero-title">Ярославль по медвежьим следам</h1>
        <p className="hero-subtitle">
          Тысячелетняя история города, рассказанная через его скульптуры
        </p>
        <a href="#routes" className="hero-button">Выбрать маршрут</a>
      </header>

      <div className="app-container">
        <p className="start-text">
          Говорят, что Ярославль начался со встречи с медведем: на месте будущего города
          князь Ярослав Мудрый победил зверя, которого почитали местные жители.
          Тысячу лет спустя медведь смотрит на нас с герба, а ещё из бронзы и камня
          на улицах и площадях. Мы предлагаем пройти от одной скульптуры к другой
          и увидеть город разным: крепостью, торговым центром, губернской столицей
          и современным городом. Выбирайте маршрут и гуляйте в своём темпе.
        </p>

        <section className="facts">
          {FACTS.map((f) => (
            <article className="fact-card" key={f.year}>
              <span className="fact-year">{f.year}</span>
              <h3 className="fact-title">{f.title}</h3>
              <p className="fact-text">{f.text}</p>
            </article>
          ))}
        </section>

        <div id="routes">
          <RoutesSection />
        </div>
        <BearsSection />
        <SourcesSection />
      </div>

      <ScrollToTop />
    </>
  );
}

export default App