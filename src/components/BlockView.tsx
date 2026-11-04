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

const ICON: Record<Block['type'], string> = {
  move: '➡️',
  turnLeft: '↩️',
  turnRight: '↪️',
  repeat: '🔁',
  ifObstacle: '❓',
};

export function BlockView({ block, highlight, onRemove, onMoveUp, onMoveDown, onChangeCount, draggable, onDragStart }: Props) {
  return (
    <div className={'block block-' + block.type + (highlight ? ' highlight' : '')} draggable={draggable} onDragStart={onDragStart}>
      <span className="block-icon">{ICON[block.type]}</span>
      <span className="block-label">{LABEL[block.type]}</span>
      {block.type === 'repeat' && (
        <>
          <input
            type="number"
            min={1}
            max={30}
            value={block.count ?? 2}
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
          {onMoveUp && <button onClick={onMoveUp} aria-label="위로">▲</button>}
          {onMoveDown && <button onClick={onMoveDown} aria-label="아래로">▼</button>}
          {onRemove && <button onClick={onRemove} aria-label="삭제">✕</button>}
        </span>
      )}
    </div>
  );
}
