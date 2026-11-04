import { useEffect, useRef, useState } from 'react';
import type { Block } from '../types';
import { BlockView } from './BlockView';

interface Props {
  onAdd: (type: Block['type']) => void;
}

const TEMPLATES: { type: Block['type']; label: string }[] = [
  { type: 'move', label: '이동' },
  { type: 'turnLeft', label: '왼쪽 회전' },
  { type: 'turnRight', label: '오른쪽 회전' },
  { type: 'repeat', label: '반복' },
  { type: 'ifObstacle', label: '만약' },
];

export function Palette({ onAdd }: Props) {
  const [dragging, setDragging] = useState<Block['type'] | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const draggedRef = useRef(false);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    const up = (e: PointerEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el?.closest('.workspace')) onAdd(dragging);
      setDragging(null);
      draggedRef.current = true;
      setTimeout(() => { draggedRef.current = false; }, 0);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [dragging, onAdd]);

  return (
    <div className="palette">
      <h3>블록</h3>
      {TEMPLATES.map((t) => (
        <div
          key={t.type}
          className="palette-item"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('application/block-type', t.type);
            e.dataTransfer.effectAllowed = 'copy';
          }}
          onPointerDown={(e) => {
            if (e.pointerType === 'touch' || e.pointerType === 'pen') {
              e.preventDefault();
              setDragging(t.type);
              setPos({ x: e.clientX, y: e.clientY });
            }
          }}
          onClick={() => { if (!draggedRef.current) onAdd(t.type); }}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onAdd(t.type); } }}
        >
          <BlockView block={{ id: 'tmp', type: t.type, count: t.type === 'repeat' ? 2 : undefined, body: (t.type === 'repeat' || t.type === 'ifObstacle') ? [] : undefined }} />
          <button className="add-btn" onClick={(e) => { e.stopPropagation(); onAdd(t.type); }}>+</button>
        </div>
      ))}
      {dragging && (
        <div style={{ position: 'fixed', left: pos.x - 20, top: pos.y - 20, pointerEvents: 'none', zIndex: 1000, opacity: 0.8 }}>
          <BlockView block={{ id: 'drag', type: dragging, count: dragging === 'repeat' ? 2 : undefined, body: (dragging === 'repeat' || dragging === 'ifObstacle') ? [] : undefined }} />
        </div>
      )}
    </div>
  );
}
