import { describe, it, expect } from 'vitest';
import { runProgram } from '../engine/interpreter';
import type { Level, Block } from '../types';

const level: Level = {
  id: 't', title: 't', gridSize: 5,
  start: { x: 0, y: 0, dir: 0 },
  obstacles: [{ x: 2, y: 0 }],
  goals: [{ x: 4, y: 0 }],
  maxBlocks: 5,
};

describe('interpreter', () => {
  it('moves straight', () => {
    const prog: Block[] = [{ id: '1', type: 'move' }, { id: '2', type: 'move' }, { id: '3', type: 'move' }, { id: '4', type: 'move' }];
    // blocked at (2,0) so should error
    const r = runProgram(level, prog);
    expect(r.success).toBe(false);
  });
  it('repeat works', () => {
    const lvl: Level = { ...level, obstacles: [], goals: [{ x: 4, y: 0 }] };
    const prog: Block[] = [{ id: 'r', type: 'repeat', count: 4, body: [{ id: 'm', type: 'move' }] }];
    const r = runProgram(lvl, prog);
    expect(r.success).toBe(true);
    expect(r.blocksUsed).toBe(2);
  });
  it('turn and move', () => {
    const lvl: Level = { id: 't2', title: 't2', gridSize: 5, start: { x: 0, y: 0, dir: 0 }, obstacles: [], goals: [{ x: 0, y: 2 }], maxBlocks: 5 };
    const prog: Block[] = [{ id: 't', type: 'turnRight' }, { id: 'r', type: 'repeat', count: 2, body: [{ id: 'm', type: 'move' }] }];
    const r = runProgram(lvl, prog);
    expect(r.success).toBe(true);
  });
});
