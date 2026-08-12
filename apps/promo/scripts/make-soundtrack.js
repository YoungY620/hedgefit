import fs from 'node:fs';
import path from 'node:path';

const sampleRate = 48000;
const duration = 28;
const count = sampleRate * duration;
const data = new Float32Array(count);

const fract = (x) => x - Math.floor(x);
const noise = (i) => fract(Math.sin(i * 12.9898) * 43758.5453) * 2 - 1;
const smooth = (t) => t * t * (3 - 2 * t);
const envelope = (t, start, length, attack = 0.008, release = 0.25) => {
  const x = t - start;
  if (x < 0 || x > length) return 0;
  return Math.min(1, x / attack) * Math.min(1, (length - x) / release);
};

const midi = (n) => 440 * 2 ** ((n - 69) / 12);
const chords = [
  [45, 52, 57, 60], // Am7
  [41, 48, 53, 57], // Fmaj7
  [36, 43, 48, 52], // Cmaj7
  [43, 50, 55, 59], // Gmaj7
];
const sceneHits = [0, 3.5, 9, 14.5, 20.5, 24.5];

for (let i = 0; i < count; i++) {
  const t = i / sampleRate;
  const chordIndex = Math.floor(t / 2.5) % chords.length;
  const chord = chords[chordIndex];
  let s = 0;

  // Warm synth bed with slow side-to-side motion.
  for (let v = 0; v < chord.length; v++) {
    const f = midi(chord[v]);
    const drift = 1 + Math.sin(t * 0.16 + v) * 0.0015;
    s += Math.sin(Math.PI * 2 * f * drift * t + v * 0.7) * (0.027 / (1 + v * 0.28));
    s += Math.sin(Math.PI * 2 * f * 2 * t + v) * 0.006;
  }

  // 120 BPM restrained electronic pulse.
  const beat = t % 0.5;
  const beatNo = Math.floor(t / 0.5);
  const kickEnv = Math.exp(-beat * 15);
  const kickFreq = 48 + 70 * Math.exp(-beat * 38);
  s += Math.sin(Math.PI * 2 * kickFreq * beat) * kickEnv * 0.22;
  if (beatNo % 2 === 1) {
    const snare = Math.max(0, beat - 0.002);
    s += noise(i) * Math.exp(-snare * 25) * 0.045;
  }
  const eighth = t % 0.25;
  s += noise(i * 7) * Math.exp(-eighth * 55) * 0.012;

  // UI ticks, matching scene-reveal cadence.
  for (const hit of sceneHits) {
    const e = envelope(t, hit, 0.45, 0.004, 0.38);
    if (e > 0) {
      const x = t - hit;
      s += Math.sin(Math.PI * 2 * (720 - 260 * x) * x) * e * 0.095;
      s += noise(i + Math.floor(hit * 1000)) * e * 0.012;
    }
  }

  // Bright install/analysis confirmation pings.
  for (const ping of [5.6, 6.15, 6.7, 10.5, 11.3, 12.1, 17.1, 17.7, 22.1, 22.7]) {
    const e = envelope(t, ping, 0.19, 0.002, 0.16);
    if (e > 0) {
      const x = t - ping;
      s += Math.sin(Math.PI * 2 * 1180 * x) * e * 0.032;
      s += Math.sin(Math.PI * 2 * 1770 * x) * e * 0.017;
    }
  }

  // Fade in/out and soft limit.
  const fade = smooth(Math.min(1, t / 0.35)) * smooth(Math.min(1, (duration - t) / 0.85));
  data[i] = Math.tanh(s * 1.8) * fade * 0.82;
}

const channels = 1;
const bits = 16;
const bytesPerSample = bits / 8;
const dataSize = count * channels * bytesPerSample;
const buffer = Buffer.alloc(44 + dataSize);
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(channels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * channels * bytesPerSample, 28);
buffer.writeUInt16LE(channels * bytesPerSample, 32);
buffer.writeUInt16LE(bits, 34);
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);
for (let i = 0; i < count; i++) {
  const value = Math.max(-1, Math.min(1, data[i]));
  buffer.writeInt16LE(Math.round(value * 32767), 44 + i * 2);
}

const out = path.resolve('public/soundtrack.wav');
fs.mkdirSync(path.dirname(out), {recursive: true});
fs.writeFileSync(out, buffer);
console.log(out);
