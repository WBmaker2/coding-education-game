import { useState } from 'react';
import { useStore } from '../store';
import updateLogRaw from '../../docs/UPDATELOG.md?raw';

interface UpdateEntry { date: string; items: string[]; }

function parseUpdates(raw: string): UpdateEntry[] {
  const entries: UpdateEntry[] = [];
  let current: UpdateEntry | null = null;
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^##\s+(\d{4}-\d{2}-\d{2})\s*$/);
    if (m) {
      if (current) entries.push(current);
      current = { date: m[1], items: [] };
      continue;
    }
    const im = line.match(/^[-*]\s+(.+)$/);
    if (im && current) current.items.push(im[1]);
  }
  if (current) entries.push(current);
  return entries.reverse();
}

export function Home() {
  const { levels, progress, selectLevel, setView } = useStore();
  const [showUpdates, setShowUpdates] = useState(false);
  const updates = parseUpdates(updateLogRaw);

  return (
    <div className="home">
      <header className="home-header">
        <div className="home-title-block">
          <h1>코딩 교육 게임</h1>
          <p>블록을 조합해 미션을 해결해보세요!</p>
        </div>
        <div className="home-actions">
          <button onClick={() => setShowUpdates(true)}>업데이트 내역</button>
          <button onClick={() => setView('teacher')}>교사 모드</button>
        </div>
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
      {showUpdates && (
        <div className="modal-backdrop" onClick={() => setShowUpdates(false)}>
          <div className="modal update-modal" onClick={(e) => e.stopPropagation()}>
            <h3>업데이트 내역</h3>
            <div className="update-list">
              {updates.map((u) => (
                <section key={u.date} className="update-entry">
                  <h4>{u.date}</h4>
                  <ul>
                    {u.items.map((it, idx) => <li key={idx}>{it}</li>)}
                  </ul>
                </section>
              ))}
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowUpdates(false)}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
