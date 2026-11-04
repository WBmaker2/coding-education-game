import { useStore } from './store';
import { Home } from './components/Home';
import { Game } from './components/Game';
import { TeacherPanel } from './components/TeacherPanel';

export default function App() {
  const view = useStore((s) => s.view);
  return (
    <div className="app">
      {view === 'home' && <Home />}
      {view === 'game' && <Game />}
      {view === 'teacher' && <TeacherPanel />}
    </div>
  );
}
