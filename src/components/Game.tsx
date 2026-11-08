import { useEffect, useRef, useState } from 'react';
import { useStore } from '../store';
import { runProgram } from '../engine/interpreter';
import type { Block, Frame } from '../types';
import { BlockList } from './BlockList';
import { Grid } from './Grid';
import { Palette } from './Palette';
import { saveProgress } from '../utils/progress';
import { playRun, playSuccess, playFail, isSoundEnabled, setSoundEnabled } from '../utils/sound';

export function Game() {
  const { levels, selectedLevelId, progress, updateProgress, setView } = useStore();
  const level = levels.find((l) => l.id === selectedLevelId)!;
  const [program, setProgram] = useState<Block[]>([]);
  const [frames, setFrames] = useState<Frame[]>([]);
  const [idx, setIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ success: boolean; error?: string; stars: number; blocksUsed: number } | null>(null);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    setProgram([]);
    setFrames([]);
    setIdx(0);
    setRunning(false);
    setResult(null);
  }, [selectedLevelId]);

  useEffect(() => {
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, []);

  const currentFrame = frames.length ? frames[Math.min(idx, frames.length - 1)] : undefined;
  const highlightId = currentFrame?.highlightId ?? null;

  const handleRun = () => {
    if (running) return;
    playRun();
    const r = runProgram(level, program);
    setFrames(r.frames);
    setIdx(0);
    setRunning(true);
    setResult(null);
    let i = 0;
    timerRef.current = window.setInterval(() => {
      i++;
      if (i >= r.frames.length) {
        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = null;
        setRunning(false);
        const blocksUsed = r.blocksUsed;
        let stars = r.success ? 1 : 0;
        if (r.success) {
          const max = level.maxBlocks ?? blocksUsed;
          if (blocksUsed <= max) stars = 3;
          else if (blocksUsed <= max * 1.5) stars = 2;
          else stars = 1;
        }
        const prev = progress[level.id];
        const attempts = (prev?.attempts ?? 0) + 1;
        const bestStars = Math.max(prev?.stars ?? 0, stars);
        const completedAt = r.success ? Date.now() : (prev?.completedAt ?? null);
        updateProgress(level.id, { levelId: level.id, stars: bestStars, attempts, completedAt });
        saveProgress(useStore.getState().progress);
        setResult({ success: r.success, error: r.error, stars: bestStars, blocksUsed });
        if (r.success) playSuccess(); else playFail();
      } else {
        setIdx(i);
      }
    }, 450);
  };

  const handleStop = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false);
    setIdx(0);
  };

  const handleReset = () => {
    setProgram([]);
    setFrames([]);
    setIdx(0);
    setResult(null);
  };

  return (
    <div className="game">
      <header className="game-header">
        <button onClick={() => setView('home')}>← 홈</button>
        <h2>{level.title}</h2>
        <span className="hint">{level.hint}</span>
        <button onClick={() => { const next = !soundOn; setSoundOn(next); setSoundEnabled(next); }} aria-label="사운드 토글">{soundOn ? '🔊' : '🔇'}</button>
      </header>
      <div className="game-body">
        <Palette onAdd={(t) => setProgram((p) => [...p, { id: 'b' + Date.now(), type: t, count: t === 'repeat' ? 2 : undefined, body: (t === 'repeat' || t === 'ifObstacle') ? [] : undefined }])} />
        <div className="workspace-col">
          <div className="workspace" onDragOver={(e) => e.preventDefault()} onDrop={(e) => {
            e.preventDefault();
            const type = e.dataTransfer.getData('application/block-type');
            if (type) setProgram((p) => [...p, { id: 'b' + Date.now(), type: type as any, count: type === 'repeat' ? 2 : undefined, body: (type === 'repeat' || type === 'ifObstacle') ? [] : undefined }]);
          }}>
            <h3>프로그램 {program.length > 0 && <span>({program.length}블록)</span>}</h3>
            <BlockList blocks={program} onChange={setProgram} highlightId={highlightId} />
          </div>
          <div className="controls">
            <button className="run-btn btn-pulse" onClick={handleRun} disabled={running}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5l12 7-12 7V5z" /></svg>
              실행
            </button>
            <button onClick={handleStop} disabled={!running}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="1" /></svg>
              정지
            </button>
            <button onClick={handleReset}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></svg>
              초기화
            </button>
          </div>
        </div>
        <div className="canvas-col">
          <Grid level={level} frame={currentFrame} size={Math.max(28, Math.floor(360 / level.gridSize))} />
          <div className="progress-info">
            <p>수집: {currentFrame?.collected.length ?? 0} / {level.goals.length}</p>
          </div>
        </div>
      </div>
      {result && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{result.success ? '성공! 🎉' : '다시 시도해보세요'}</h3>
            {result.error && <p className="error">{result.error}</p>}
            {result.success && <p>별점: {'★'.repeat(result.stars)}{'☆'.repeat(3 - result.stars)}</p>}
            <p>사용 블록: {result.blocksUsed}</p>
            <div className="modal-actions">
              <button onClick={() => setResult(null)}>닫기</button>
              {result.success && <button className="btn-pulse" onClick={() => { const idx = levels.findIndex(l => l.id === level.id); const next = levels[idx + 1]; if (next) useStore.getState().selectLevel(next.id); else setView('home'); setResult(null); }}>다음 레벨</button>}
              <button onClick={() => { setResult(null); handleReset(); }}>재도전</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
