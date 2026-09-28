// Scene 2 — Problem (120 frames): GPU cost counter spiraling, slow provisioning.
import React from "react";
import { AbsoluteFill, Easing, Interactive, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, font } from "../theme";

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 16, mass: 0.9, stiffness: 120 } });

  // Cost counter: $1,204 -> $8,947, accelerating (ease-in). "Spiraling" spend.
  const cost = interpolate(frame, [12, 104], [1204, 8947], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.55, 0, 0.85, 0.36),
  });

  // Counter turns danger-red as it climbs past ~$5k (frame ~70)
  // Interpolate RGB numerically: #FAFAFA (250,250,250) -> #E57373 (229,115,115)
  const redness = interpolate(frame, [66, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.6, 1),
  });
  const counterColor = `rgb(${Math.round(250 + (229 - 250) * redness)}, ${Math.round(
    250 + (115 - 250) * redness
  )}, ${Math.round(250 + (115 - 250) * redness)})`;

  // Progress bar crawls, then stalls at 64%
  const progress = interpolate(frame, [14, 100], [9, 64], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Subtle shake as costs accelerate
  const shake = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 1, 1),
  });
  const shakeX = shake * 3 * Math.sin(frame * 2.1);
  const shakeY = shake * 2 * Math.cos(frame * 2.7);

  const exitOpacity = interpolate(frame, [110, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 1, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 62%, rgba(229, 115, 115, 0.06), transparent 60%)",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: exitOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 58,
          translate: `${shakeX}px ${shakeY}px`,
        }}
      >
        <Interactive.Div
          name="Problem title"
          style={{
            fontFamily: font.family,
            fontSize: 74,
            fontWeight: 700,
            color: colors.muted,
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            translate: `0px ${interpolate(titleSpring, [0, 1], [30, 0])}px`,
          }}
        >
          The GPU bill doesn&apos;t.
        </Interactive.Div>

        <Interactive.Div
          name="Cost counter"
          style={{
            fontFamily: font.mono,
            fontSize: 150,
            fontWeight: 700,
            color: counterColor,
            letterSpacing: "-3px",
          }}
        >
          ${Math.round(cost).toLocaleString("en-US")}/mo
        </Interactive.Div>

        <Interactive.Div
          name="Provisioning bar"
          style={{ width: 760, display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div
            style={{
              width: "100%",
              height: 12,
              borderRadius: 6,
              backgroundColor: colors.faint,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                backgroundColor: colors.muted,
                borderRadius: 6,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: font.mono,
              fontSize: 22,
              color: colors.muted,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>provisioning dedicated GPUs…</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </Interactive.Div>

        <Interactive.Div
          name="Problem caption"
          style={{
            fontFamily: font.family,
            fontSize: 30,
            color: colors.muted,
            opacity: interpolate(frame, [64, 76], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          Idle capacity. Runaway spend. Ops load.
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};