// Brand constants — Featherless AI inference platform
// Palette sampled from featherless.ai (dark + yellow system)
import { loadFont } from "@remotion/google-fonts/Inter";

export const { fontFamily, waitUntilDone } = loadFont("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// Mono font for code / numbers
import { loadFont as loadMonoFont } from "@remotion/google-fonts/JetBrainsMono";
export const monoFontFamily = loadMonoFont("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
}).fontFamily;

export const colors = {
  primary: "#FEF47A", // Featherless yellow
  background: "#141413", // near-black
  accent: "#66BB6A", // green (status ok)
  text: "#FAFAFA", // off-white
  muted: "#8A8A8A",
  faint: "#2D2D2D",
  surface: "#1E1E1C",
  danger: "#E57373",
};

export const font = {
  family: fontFamily,
  mono: monoFontFamily,
};

// Timing constants — music is 128 BPM. Beat = 60/128 s = 0.469s.
// At 30fps: frames per beat = 30 * 60 / 128 = 14.0625
export const BPM = 128;
export const FPS = 30;
export const FRAMES_PER_BEAT = Math.round((FPS * 60) / BPM); // 14
export const BEATS = [1, 2, 3, 4, 5, 6].map((b) => b * FRAMES_PER_BEAT);

export const springConfig = {
  // Crisp entrances: quick settle, slight overshoot
  entrance: { damping: 14, mass: 0.9, stiffness: 130 },
  soft: { damping: 26, mass: 0.9, stiffness: 110 },
  gentle: { damping: 200, mass: 1 },
};

export const TIMING = {
  total: 900,
  hook: { from: 0, duration: 90 },
  problem: { from: 90, duration: 120 },
  product: { from: 210, duration: 240 },
  code: { from: 450, duration: 120 },
  metrics: { from: 570, duration: 210 },
  outro: { from: 780, duration: 120 },
};