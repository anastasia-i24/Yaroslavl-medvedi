import './App.css'
import { SectionTitle } from './components/SectionTitle';

function App() {
  return (
    <div className="app-container">
      <SectionTitle
        title={"Медведи Ярославля"}
        level={1}
        text={"TBD: Тут какой-то текст про этот путеводитель"}
      />
      <SectionTitle
        title={"Маршруты"}
        level={2}
        text={"TBD: Тут какой-то текст про маршруты"}
      />
      <SectionTitle
        title={"Источники"}
        level={2}
        text={"TBD: Тут список всех источников"}
      />
    </div>
  );
}

export default App