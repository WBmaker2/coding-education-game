import type { Level, Frame } from '../types';

interface Props {
  level: Level;
  frame?: Frame;
  size?: number;
}

const DIR_ROT = [0, 90, 180, 270];

export function Grid({ level, frame, size = 40 }: Props) {
  const n = level.gridSize;
  const robot = frame?.robot ?? level.start;
  const collected = new Set(frame?.collected ?? []);
  const obs = new Set(level.obstacles.map((o) => o.x + ',' + o.y));
  const goals = new Set(level.goals.map((g) => g.x + ',' + g.y));

  const cells = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const k = x + ',' + y;
      const isObs = obs.has(k);
      const isGoal = goals.has(k);
      const isCollected = collected.has(k);
      const isRobot = robot.x === x && robot.y === y;
      cells.push(
        <div
          key={k}
          className={'cell' + (isObs ? ' obs' : '') + (isGoal ? ' goal' : '') + (isCollected ? ' collected' : '')}
          style={{ width: size, height: size }}
        >
          {isGoal && !isCollected && <span className="star">★</span>}
          {isCollected && <span className="star done">★</span>}
          {isRobot && (
            <svg className="robot" viewBox="0 0 24 24" width="75%" height="75%" aria-label="로봇" style={{ transform: `rotate(${DIR_ROT[robot.dir]}deg)` }}>
              <path d="M4 12h14M12 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      );
    }
  }
  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, ${size}px)` }}>
      {cells}
    </div>
  );
}
