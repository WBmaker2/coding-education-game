import type { Level, Block, Frame, RunResult, Dir, Pos } from '../types';

const DX = [1, 0, -1, 0];
const DY = [0, 1, 0, -1];

function key(p: Pos) { return p.x + ',' + p.y; }

function cloneRobot(r: { x: number; y: number; dir: Dir }) {
  return { x: r.x, y: r.y, dir: r.dir };
}

export function countBlocks(blocks: Block[]): number {
  let n = 0;
  for (const b of blocks) {
    n += 1;
    if (b.body) n += countBlocks(b.body);
  }
  return n;
}

export function runProgram(level: Level, program: Block[]): RunResult {
  const goalSet = new Set(level.goals.map(key));
  const collected = new Set<string>();
  const robot = { x: level.start.x, y: level.start.y, dir: level.start.dir as Dir };
  const frames: Frame[] = [{ robot: cloneRobot(robot), collected: [], highlightId: null }];
  let error: string | undefined;
  let steps = 0;
  const MAX = 3000;

  const inBounds = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < level.gridSize && y < level.gridSize;
  const isObstacle = (x: number, y: number) =>
    level.obstacles.some((o) => o.x === x && o.y === y);

  const frontBlocked = () => {
    const nx = robot.x + DX[robot.dir];
    const ny = robot.y + DY[robot.dir];
    if (!inBounds(nx, ny)) return true;
    if (isObstacle(nx, ny)) return true;
    return false;
  };

  let stop = false;

  function executeBlocks(blocks: Block[]): boolean {
    for (const block of blocks) {
      if (stop) return false;
      if (error) { stop = true; return false; }
      if (steps > MAX) { error = '너무 많이 실행했어요 (무한 루프?)'; stop = true; return false; }
      switch (block.type) {
        case 'move': {
          steps++;
          const nx = robot.x + DX[robot.dir];
          const ny = robot.y + DY[robot.dir];
          if (!inBounds(nx, ny)) { error = '격자 밖으로 나갔어요'; stop = true; return false; }
          if (isObstacle(nx, ny)) { error = '벽에 부딪혔어요'; stop = true; return false; }
          robot.x = nx; robot.y = ny;
          const k = key(robot);
          if (goalSet.has(k) && !collected.has(k)) collected.add(k);
          frames.push({ robot: cloneRobot(robot), collected: [...collected], highlightId: block.id });
          break;
        }
        case 'turnLeft': {
          steps++;
          robot.dir = ((robot.dir + 3) % 4) as Dir;
          frames.push({ robot: cloneRobot(robot), collected: [...collected], highlightId: block.id });
          break;
        }
        case 'turnRight': {
          steps++;
          robot.dir = ((robot.dir + 1) % 4) as Dir;
          frames.push({ robot: cloneRobot(robot), collected: [...collected], highlightId: block.id });
          break;
        }
        case 'repeat': {
          const n = Math.max(0, Math.min(30, block.count ?? 0));
          for (let i = 0; i < n; i++) {
            if (!executeBlocks(block.body ?? [])) return false;
            if (error || stop) return false;
          }
          break;
        }
        case 'ifObstacle': {
          if (frontBlocked()) {
            if (!executeBlocks(block.body ?? [])) return false;
            if (error || stop) return false;
          }
          break;
        }
      }
    }
    return !error && !stop;
  }

  executeBlocks(program);

  const success = !error && (goalSet.size === 0 || collected.size === goalSet.size);
  return { frames, success, error, blocksUsed: countBlocks(program) };
}
