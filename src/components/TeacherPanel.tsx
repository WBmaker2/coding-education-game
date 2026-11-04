import { useState } from 'react';
import { useStore } from '../store';
import { saveCustomLevels, saveProgress, exportJSON } from '../utils/progress';
import type { Level, Pos } from '../types';
import { Grid } from './Grid';

type Tool = 'obstacle' | 'goal' | 'start' | 'erase';

export function TeacherPanel() {
  const { levels, progress, setLevels, setProgress, setView, selectLevel } = useStore();
  const [title, setTitle] = useState('새 레벨');
  const [gridSize, setGridSize] = useState(5);
  const [maxBlocks, setMaxBlocks] = useState(10);
  const [hint, setHint] = useState('');
  const [json, setJson] = useState('');
  const [tool, setTool] = useState<Tool>('obstacle');
  const [obstacles, setObstacles] = useState<Pos[]>([]);
  const [goals, setGoals] = useState<Pos[]>([{ x: 4, y: 4 }]);
  const [start, setStart] = useState({ x: 0, y: 0, dir: 0 as 0 | 1 | 2 | 3 });

  const isObs = (x: number, y: number) => obstacles.some((o) => o.x === x && o.y === y);
  const isGoal = (x: number, y: number) => goals.some((g) => g.x === x && g.y === y);
  const isStart = (x: number, y: number) => start.x === x && start.y === y;

  const clickCell = (x: number, y: number) => {
    if (tool === 'erase') {
      setObstacles((o) => o.filter((p) => !(p.x === x && p.y === y)));
      setGoals((g) => g.filter((p) => !(p.x === x && p.y === y)));
      return;
    }
    if (tool === 'obstacle') {
      if (isObs(x, y)) setObstacles((o) => o.filter((p) => !(p.x === x && p.y === y)));
      else setObstacles((o) => [...o, { x, y }]);
    } else if (tool === 'goal') {
      if (isGoal(x, y)) setGoals((g) => g.filter((p) => !(p.x === x && p.y === y)));
      else setGoals((g) => [...g, { x, y }]);
    } else if (tool === 'start') {
      setStart({ x, y, dir: start.dir });
    }
  };

  const addLevel = () => {
    const newLevel: Level = {
      id: 'c_' + Date.now(),
      title,
      gridSize,
      start,
      obstacles,
      goals: goals.length ? goals : [{ x: gridSize - 1, y: gridSize - 1 }],
      maxBlocks,
      hint,
    };
    const next = [...levels, newLevel];
    setLevels(next);
    saveCustomLevels(next.filter((l) => l.id.startsWith('c_')));
    setObstacles([]);
    setGoals([{ x: gridSize - 1, y: gridSize - 1 }]);
    setStart({ x: 0, y: 0, dir: 0 });
  };

  const resetProgress = () => {
    if (!confirm('진행도를 초기화할까요?')) return;
    setProgress({});
    saveProgress({});
  };

  const doExport = () => setJson(exportJSON({ levels, progress }));

  const doImport = () => {
    try {
      const data = JSON.parse(json);
      if (data.levels) {
        setLevels(data.levels);
        saveCustomLevels(data.levels.filter((l: Level) => l.id.startsWith('c_')));
      }
      if (data.progress) {
        setProgress(data.progress);
        saveProgress(data.progress);
      }
      alert('가져오기 완료');
    } catch {
      alert('JSON 오류');
    }
  };

  return (
    <div className="teacher">
      <header className="home-header">
        <h1>교사 패널</h1>
        <button onClick={() => setView('home')}>← 홈</button>
      </header>
      <section className="teacher-section">
        <h3>새 레벨 만들기</h3>
        <div className="form-row">
          <label>제목 <input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          <label>격자 크기 <input type="number" value={gridSize} onChange={(e) => setGridSize(Number(e.target.value))} min={3} max={12} /></label>
          <label>최대 블록 <input type="number" value={maxBlocks} onChange={(e) => setMaxBlocks(Number(e.target.value))} min={1} max={50} /></label>
          <label>힌트 <input value={hint} onChange={(e) => setHint(e.target.value)} /></label>
          <label>시작 방향
            <select value={start.dir} onChange={(e) => setStart({ ...start, dir: Number(e.target.value) as 0 | 1 | 2 | 3 })}>
              <option value={0}>오른쪽</option><option value={1}>아래</option><option value={2}>왼쪽</option><option value={3}>위</option>
            </select>
          </label>
        </div>
        <div className="tool-row">
          {(['obstacle', 'goal', 'start', 'erase'] as Tool[]).map((t) => (
            <button key={t} className={tool === t ? 'tool-active' : ''} onClick={() => setTool(t)}>
              {t === 'obstacle' ? '벽' : t === 'goal' ? '목표' : t === 'start' ? '시작' : '지우기'}
            </button>
          ))}
        </div>
        <div className="editor-grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 28px)` }}>
          {Array.from({ length: gridSize * gridSize }).map((_, i) => {
            const x = i % gridSize;
            const y = Math.floor(i / gridSize);
            return (
              <div
                key={i}
                className={'editor-cell' + (isObs(x, y) ? ' obs' : '') + (isGoal(x, y) ? ' goal' : '') + (isStart(x, y) ? ' start' : '')}
                onClick={() => clickCell(x, y)}
              />
            );
          })}
        </div>
        <div className="preview-section">
          <h4>미리보기</h4>
          <Grid level={{ id: 'preview', title: 'preview', gridSize, start, obstacles, goals: goals.length ? goals : [{ x: gridSize - 1, y: gridSize - 1 }], maxBlocks, hint }} size={24} />
        </div>
        <div className="form-row">
          <button onClick={addLevel}>레벨 추가</button>
          <button onClick={() => {
            const newLevel: Level = { id: 'c_' + Date.now(), title, gridSize, start, obstacles, goals: goals.length ? goals : [{ x: gridSize - 1, y: gridSize - 1 }], maxBlocks, hint };
            const next = [...levels, newLevel];
            setLevels(next);
            saveCustomLevels(next.filter((l) => l.id.startsWith('c_')));
            selectLevel(newLevel.id);
          }}>테스트 실행</button>
        </div>

      </section>
      <section className="teacher-section">
        <h3>학생 진행도</h3>
        <button onClick={resetProgress}>진행도 초기화</button>
        <table className="progress-table">
          <thead><tr><th>레벨</th><th>별</th><th>시도</th><th>완료일</th></tr></thead>
          <tbody>
            {levels.map((l) => {
              const p = progress[l.id];
              return (
                <tr key={l.id}>
                  <td>{l.title}</td>
                  <td>{p ? '★'.repeat(p.stars) : '-'}</td>
                  <td>{p?.attempts ?? 0}</td>
                  <td>{p?.completedAt ? new Date(p.completedAt).toLocaleDateString() : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <section className="teacher-section">
        <h3>JSON 공유</h3>
        <button onClick={doExport}>내보내기</button>
        <textarea value={json} onChange={(e) => setJson(e.target.value)} rows={10} placeholder="JSON 붙여넣기" />
        <button onClick={doImport}>가져오기</button>
      </section>
    </div>
  );
}
