import type { Block } from '../types';

interface Props {
  block: Block;
  highlight?: boolean;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onChangeCount?: (n: number) => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
}

const LABEL: Record<Block['type'], string> = {
  move: ' 앞으로 1칸',
  turnLeft: ' 왼쪽으로 돌기',
  turnRight: ' 오른쪽으로 돌기',
  repeat: ' 반복',
  ifObstacle: ' 만약 앞에 벽이면',
};

function BlockIcon({ type }: { type: Block['type'] }) {
  const props = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (type) {
    case 'move':
      return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case 'turnLeft':
      return <svg {...props}><path d="M9 14l-4-4 4-4" /><path d="M5 10h9a5 5 0 0 1 5 5v0" /></svg>;
    case 'turnRight':
      return <svg {...props}><path d="M15 14l4-4-4-4" /><path d="M19 10h-9a5 5 0 0 1-5 5v0" /></svg>;
    case 'repeat':
      return <svg {...props}><path d="M17 2l4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></svg>;
    case 'ifObstacle':
      return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M9 9h.01M15 9h.01M9.5 15a3.5 3.5 0 0 0 5 0" /></svg>;
  }
}

export function BlockView({ block, highlight, onRemove, onMoveUp, onMoveDown, onChangeCount, draggable, onDragStart }: Props) {
  return (
    <div className={'block block-' + block.type + (highlight ? ' highlight' : '')} draggable={draggable} onDragStart={onDragStart}>
      <span className="block-icon"><BlockIcon type={block.type} /></span>
      <span className="block-label">{LABEL[block.type]}</span>
      {block.type === 'repeat' && (
        <>
          <input
            type="number"
            min={1}
            max={30}
            value={block.count ?? 2}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onChangeCount?.(Number(e.target.value))}
            className="block-count"
          />
          <span className="block-times">번</span>
          <div className="block-body">
            {(block.body ?? []).length === 0 && <div className="block-empty">여기에 블록을 넣으세요</div>}
            {(block.body ?? []).map((b) => (
              <BlockView key={b.id} block={b} highlight={highlight} />
            ))}
          </div>
        </>
      )}
      {block.type === 'ifObstacle' && (
        <div className="block-body">
          {(block.body ?? []).length === 0 && <div className="block-empty">여기에 블록을 넣으세요</div>}
          {(block.body ?? []).map((b) => (
            <BlockView key={b.id} block={b} highlight={highlight} />
          ))}
        </div>
      )}
      {(onRemove || onMoveUp || onMoveDown) && (
        <span className="block-actions">
          {onMoveUp && <button onClick={onMoveUp} aria-label="위로"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg></button>}
          {onMoveDown && <button onClick={onMoveDown} aria-label="아래로"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg></button>}
          {onRemove && <button onClick={onRemove} aria-label="삭제"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg></button>}
        </span>
      )}
    </div>
  );
}
