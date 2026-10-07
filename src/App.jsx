import './App.css'
import { NavBar } from './components/NavBar';
import { BearsSection } from "./components/bears/BearsSection";
import { RoutesSection } from './components/routes/RoutesSection';
import { SourcesSection } from './components/sources/SourcesSection';
import { ScrollToTop } from "./components/ScrollTop";

function App() {
  return (
    <>
      <NavBar />
      <div className="app-container">
        <p className='start-text'>
          Ярославль - город с тысячелетней историей, и рассказать о нём можно по-разному. 
          Мы решили рассказать об этом через его медведей - скульптуры, установленные по всему городу.
          Прогуливаясь от одного медведя к другому, вы увидите Ярославль как древнюю крепость, центр торговли, 
          губернскую столицу и современный город. Мы собрали несколько маршрутов, 
          чтобы каждый мог выбрать подходящий и познакомиться с городом в удобном для себя темпе.
        </p>
        <RoutesSection />
        <BearsSection />
        <SourcesSection />
      </div>
      <ScrollToTop />
    </>
  );
}

export default App