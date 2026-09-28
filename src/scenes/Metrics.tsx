// Scene 5 — Metrics (150 frames): cost-per-request comparison bars with
// roll-up counters. Numbers: Featherless ~10x cheaper (grounded in their claims).
import React from "react";
import { AbsoluteFill, Easing, Interactive, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, font } from "../theme";

const BARS = [
  { label: "Featherless", value: 1.0, color: colors.primary, sub: "$0.11 / 1M tokens" },
  { label: "Baseline A (reserved GPU)", value: 6.2, color: "#6f6f6c", sub: "$0.68 / 1M tokens" },
  { label: "Baseline B (on-demand)", value: 9.8, color: "#4a4a47", sub: "$1.08 / 1M tokens" },
];

const SAVINGS_FROM = 78; // savings counter takes over once the bars have settled
const SAVINGS_TO = 120;

export const Metrics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 16, mass: 0.9, stiffness: 120 } });
  const maxW = 1180;

  const exitOpacity = interpolate(frame, [138, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 1, 1),
  });

  // Rolling counter for savings multiplier: 1.0x -> 9.8x
  const savings = interpolate(frame, [SAVINGS_FROM, SAVINGS_TO], [1, 9.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  const footnoteOpacity = interpolate(frame, [124, 134], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(254, 244, 122, 0.05), transparent 55%)",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: exitOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
        }}
      >
        <Interactive.Div
          name="Metrics title"
          style={{
            fontFamily: font.family,
            fontSize: 68,
            fontWeight: 700,
            color: colors.text,
            opacity: interpolate(titleIn, [0, 1], [0, 1]),
            translate: `0px ${interpolate(titleIn, [0, 1], [26, 0])}px`,
          }}
        >
          Same models. <span style={{ color: colors.primary }}>A fraction of the cost.</span>
        </Interactive.Div>

        <div style={{ display: "flex", flexDirection: "column", gap: 34, width: maxW }}>
          {BARS.map((bar, i) => {
            const grow = spring({
              frame: frame - (20 + i * 14),
              fps,
              config: { damping: 200, mass: 1 },
            });
            const w = interpolate(grow, [0, 1], [0, (bar.value / 10) * maxW]);
            return (
              <div key={bar.label} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <Interactive.Div
                    name={`Bar label: ${bar.label}`}
                    style={{
                      fontFamily: font.family,
                      fontSize: 26,
                      fontWeight: 600,
                      color: i === 0 ? colors.text : colors.muted,
                    }}
                  >
                    {bar.label}
                  </Interactive.Div>
                  <span style={{ fontFamily: font.mono, fontSize: 22, color: colors.muted }}>{bar.sub}</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: i === 0 ? 54 : 44,
                    borderRadius: 8,
                    backgroundColor: "#1e1e1c",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: w,
                      height: "100%",
                      backgroundColor: bar.color,
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <Interactive.Div
          name="Savings multiplier"
          style={{
            fontFamily: font.mono,
            fontSize: 56,
            fontWeight: 700,
            color: colors.primary,
            opacity: interpolate(frame, [74, 86], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            scale: `${interpolate(spring({ frame: frame - SAVINGS_TO, fps, config: { damping: 12, mass: 0.8, stiffness: 160 } }), [0, 1], [1, 1.06])}`,
          }}
        >
          {savings.toFixed(1)}× cheaper
        </Interactive.Div>

        <div style={{ fontFamily: font.family, fontSize: 20, color: colors.muted, opacity: footnoteOpacity }}>
          Cost per 1M tokens, chat workloads, list pricing. Multiplier vs. on-demand baseline.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
