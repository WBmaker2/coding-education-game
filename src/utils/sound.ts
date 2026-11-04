let ctx: AudioContext | null = null;
function getCtx() {
  if (!ctx) {
    try { ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); } catch { ctx = null; }
  }
  return ctx;
}

function tone(freq: number, dur: number, type: OscillatorType = 'sine', gain = 0.15) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  osc.connect(g).connect(c.destination);
  osc.start();
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  osc.stop(c.currentTime + dur);
}

export function playSuccess() {
  tone(523, 0.12); setTimeout(() => tone(659, 0.12), 120); setTimeout(() => tone(784, 0.2), 240);
}
export function playFail() {
  tone(220, 0.18, 'sawtooth'); setTimeout(() => tone(196, 0.22, 'sawtooth'), 180);
}
export function playRun() {
  tone(440, 0.08, 'square', 0.08);
}
