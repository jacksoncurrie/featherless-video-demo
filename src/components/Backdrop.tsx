// Shared ambient background: drifting gradient blobs + rising particles.
// Deterministic (seeded) so renders are reproducible.
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

const PARTICLES = (() => {
  let seed = 42;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: 36 }, () => ({
    x: rnd(),
    y: rnd(),
    r: 1 + rnd() * 2.5,
    speed: 0.02 + rnd() * 0.05,
    drift: rnd() * 2 - 1,
    op: 0.08 + rnd() * 0.2,
  }));
})();

export const Backdrop: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background, overflow: "hidden" }}>
      {/* Drifting gradient blobs */}
      <AbsoluteFill
        name="Gradient drift A"
        style={{
          background: `radial-gradient(circle at ${30 + 8 * Math.sin(frame / 55)}% ${
            28 + 6 * Math.cos(frame / 47)
          }%, rgba(254, 244, 122, ${0.07 * intensity}), transparent 55%)`,
        }}
      />
      <AbsoluteFill
        name="Gradient drift B"
        style={{
          background: `radial-gradient(circle at ${74 + 7 * Math.cos(frame / 61)}% ${
            72 + 8 * Math.sin(frame / 53)
          }%, rgba(102, 187, 106, ${0.05 * intensity}), transparent 55%)`,
        }}
      />
      {/* Rising particles */}
      {PARTICLES.map((p, i) => {
        const y = (p.y - (frame / durationInFrames) * p.speed * durationInFrames * 0.12) % 1;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x * 100}%`,
              top: `${(y < 0 ? y + 1 : y) * 100}%`,
              width: p.r,
              height: p.r,
              borderRadius: "50%",
              backgroundColor: colors.primary,
              opacity:
                p.op *
                interpolate(
                  frame,
                  [0, 20],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) },
                ),
              translate: `${p.drift * 30 * Math.sin(frame / 40 + i)}px 0px`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};