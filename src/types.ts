export type Dir = 0 | 1 | 2 | 3; // 0 right,1 down,2 left,3 up

export interface Pos { x: number; y: number; }

export interface Block {
  id: string;
  type: 'move' | 'turnLeft' | 'turnRight' | 'repeat' | 'ifObstacle';
  count?: number;
  body?: Block[];
}

export interface Level {
  id: string;
  title: string;
  gridSize: number;
  start: { x: number; y: number; dir: Dir };
  obstacles: Pos[];
  goals: Pos[];
  maxBlocks?: number;
  hint?: string;
}

export interface Progress {
  levelId: string;
  stars: number;
  attempts: number;
  completedAt: number | null;
}

export interface Frame {
  robot: { x: number; y: number; dir: Dir };
  collected: string[];
  highlightId: string | null;
  message?: string;
}

export interface RunResult {
  frames: Frame[];
  success: boolean;
  error?: string;
  blocksUsed: number;
}
