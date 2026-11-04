import type { Progress } from '../types';

const KEY = 'coding-edu-progress';
const LEVELS_KEY = 'coding-edu-levels';

export function loadProgress(): Record<string, Progress> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProgress(p: Record<string, Progress>) {
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function loadCustomLevels(): any[] {
  try {
    const raw = localStorage.getItem(LEVELS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomLevels(levels: any[]) {
  localStorage.setItem(LEVELS_KEY, JSON.stringify(levels));
}

export function exportJSON(data: any): string {
  return JSON.stringify(data, null, 2);
}

export function importJSON(text: string): any {
  return JSON.parse(text);
}
