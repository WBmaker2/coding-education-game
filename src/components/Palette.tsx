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
          onClick={() => onAdd(t.type)}
        >
          <BlockView block={{ id: 'tmp', type: t.type, count: t.type === 'repeat' ? 2 : undefined, body: (t.type === 'repeat' || t.type === 'ifObstacle') ? [] : undefined }} />
          <button className="add-btn" onClick={(e) => { e.stopPropagation(); onAdd(t.type); }}>+</button>
        </div>
      ))}
    </div>
  );
}
