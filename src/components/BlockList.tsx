import { useState } from 'react';
import type { Block } from '../types';
import { BlockView } from './BlockView';

let uid = 0;
function newId() { return 'b' + (++uid) + '_' + Date.now().toString(36); }

function makeBlock(type: Block['type']): Block {
  return {
    id: newId(),
    type,
    count: type === 'repeat' ? 2 : undefined,
    body: (type === 'repeat' || type === 'ifObstacle') ? [] : undefined,
  };
}

interface Props {
  blocks: Block[];
  onChange: (b: Block[]) => void;
  highlightId: string | null;
  depth?: number;
}

export function BlockList({ blocks, onChange, highlightId, depth = 0 }: Props) {
  const [, setDragIndex] = useState<number | null>(null);

  const updateBlock = (i: number, nb: Block) => {
    const next = [...blocks];
    next[i] = nb;
    onChange(next);
  };
  const remove = (i: number) => onChange(blocks.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = (type: Block['type'], targetIndex?: number) => {
    const nb = makeBlock(type);
    const next = [...blocks];
    if (targetIndex === undefined) next.push(nb);
    else next.splice(targetIndex, 0, nb);
    onChange(next);
  };

  const handleDragStart = (i: number) => (e: React.DragEvent) => {
    e.dataTransfer.setData('application/block-index', String(i));
    e.dataTransfer.effectAllowed = 'move';
    setDragIndex(i);
  };
  const handleDrop = (i: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('application/block-type');
    if (type) {
      add(type as Block['type'], i);
      return;
    }
    const from = e.dataTransfer.getData('application/block-index');
    if (from !== '') {
      const fi = Number(from);
      if (fi !== i && fi >= 0 && fi < blocks.length) {
        const next = [...blocks];
        const [moved] = next.splice(fi, 1);
        next.splice(i, 0, moved);
        onChange(next);
      }
    }
    setDragIndex(null);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className={'block-list depth-' + depth} onDragOver={handleDragOver} onDrop={(e) => { if (e.target === e.currentTarget) { /* container drop append */ } }}>
      {blocks.map((b, i) => (
        <div
          key={b.id}
          className="block-row"
          draggable
          onDragStart={handleDragStart(i)}
          onDragOver={handleDragOver}
          onDrop={handleDrop(i)}
        >
          <BlockView
            block={b}
            highlight={highlightId === b.id}
            onRemove={() => remove(i)}
            onMoveUp={() => move(i, -1)}
            onMoveDown={() => move(i, 1)}
            onChangeCount={(n) => updateBlock(i, { ...b, count: n })}
            draggable
            onDragStart={handleDragStart(i)}
          />
          {(b.type === 'repeat' || b.type === 'ifObstacle') && (
            <div className="nested">
              <BlockList
                blocks={b.body ?? []}
                onChange={(nb) => updateBlock(i, { ...b, body: nb })}
                highlightId={highlightId}
                depth={depth + 1}
              />
              <div className="add-row">
                {(['move', 'turnLeft', 'turnRight', 'repeat', 'ifObstacle'] as Block['type'][]).map((t) => (
                  <button key={t} className="mini-add" onClick={() => {
                    const nb = makeBlock(t);
                    updateBlock(i, { ...b, body: [...(b.body ?? []), nb] });
                  }}>+{t === 'move' ? '이동' : t === 'turnLeft' ? '좌' : t === 'turnRight' ? '우' : t === 'repeat' ? '반복' : '만약'}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      <div
        className="drop-zone"
        onDragOver={handleDragOver}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const type = e.dataTransfer.getData('application/block-type');
          if (type) add(type as Block['type']);
          const from = e.dataTransfer.getData('application/block-index');
          // ignore reorder to end handled by last item; append if from empty
          void from;
        }}
      >
        {blocks.length === 0 && <span className="empty-hint">여기에 블록을 끌어다 놓거나 아래 버튼으로 추가</span>}
      </div>
      <div className="add-row">
        {(['move', 'turnLeft', 'turnRight', 'repeat', 'ifObstacle'] as Block['type'][]).map((t) => (
          <button key={t} className="mini-add" onClick={() => add(t)}>
            +{t === 'move' ? '이동' : t === 'turnLeft' ? '좌회전' : t === 'turnRight' ? '우회전' : t === 'repeat' ? '반복' : '만약'}
          </button>
        ))}
      </div>
    </div>
  );
}
