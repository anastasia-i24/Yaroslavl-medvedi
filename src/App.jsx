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
        <p>TBD: Тут какой-то текст про этот путеводитель</p>
        <RoutesSection />
        <BearsSection />
        <SourcesSection />
      </div>
      <ScrollToTop />
    </>
  );
}

export default App