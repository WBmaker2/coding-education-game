import { useStore } from '../store';

export function Home() {
  const { levels, progress, selectLevel, setView } = useStore();
  return (
    <div className="home">
      <header className="home-header">
        <h1>코딩 교육 게임</h1>
        <p>블록을 조합해 미션을 해결해보세요!</p>
        <button onClick={() => setView('teacher')}>교사 모드</button>
      </header>
      <div className="level-map">
        {levels.map((l, i) => {
          const p = progress[l.id];
          return (
            <button key={l.id} className="level-card" onClick={() => selectLevel(l.id)}>
              <div className="level-num">{i + 1}</div>
              <div className="level-title">{l.title}</div>
              <div className="level-stars">{p ? '★'.repeat(p.stars) + '☆'.repeat(3 - p.stars) : '☆☆☆'}</div>
              {p?.completedAt && <div className="level-done">완료</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
