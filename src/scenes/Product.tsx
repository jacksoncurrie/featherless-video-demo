// Scene 3 — Product (240 frames): browser mockup tilts in with the dashboard,
// then we dive THROUGH it into a cascading wall of real model names while a
// counter rolls to 40,000+.
import React from "react";
import { AbsoluteFill, Easing, Interactive, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, font } from "../theme";

// One hero callout on the settled mockup — removed: the model wall that
// follows owns the "40,000+ models" reveal, so saying it twice reads as filler.

const DIVE_FROM = 112; // mockup flies toward / past the camera
const WALL_FROM = 128; // first chips land
const COUNTER_FROM = 138;
const COUNTER_TO = 198; // 40,000+ locks in
const SUBSTATS_AT = 204;

// Real model names from the Featherless catalog (short display forms).
const MODEL_NAMES = [
  "GLM-5.3", "DeepSeek-V4-Pro", "Kimi-K3", "Qwen3.6-27B", "gpt-oss-120b",
  "DeepSeek-V3.2", "gemma-4-26B", "Llama-3.1-8B", "Mistral-Small-3.2", "gpt-oss-20b",
  "Qwen3.5-9B", "Ling-1T", "DeepSeek-R1-0528", "Hermes-4-14B", "Qwen3-Next-80B",
  "Qwen3-VL-8B", "Qwen2.5-7B", "RWKV-7-World", "Qwen2.5-Math-7B", "Qwen3-Coder-30B",
  "Kimi-K2.6", "MiniMax-M3", "GLM-5.2", "DeepSeek-R1", "Qwen3.8-27B",
  "GLM-5.3-Flash", "Qwen3-32B", "Qwen2.5-0.6B", "Hermes-4-70B", "Qwen3.5-27B",
  "Qwen2.5-Math-72B", "Nanbeige4.1-3B", "DeepScaleR-1.5B", "Qwen3.8-Flash-Next", "Llama-3.1-70B",
  "Ministral-8B",
];

// Grid geometry: 7 cols x 6 rows with a 3x2 hole in the middle for the counter.
const COLS = 7;
const ROWS = 6;
const CHIP_W = 240;
const CHIP_H = 54;
const PITCH_X = 254;
const PITCH_Y = 150;
const ORIGIN_X = 71;
const ORIGIN_Y = 120;
const HOLE_COLS = [2, 3, 4];
const HOLE_ROWS = [2, 3];

// Assign names to non-hole cells in row-major order.
const CHIPS: { name: string; row: number; col: number; accent: boolean }[] = [];
{
  let i = 0;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (HOLE_ROWS.includes(row) && HOLE_COLS.includes(col)) continue;
      CHIPS.push({ name: MODEL_NAMES[i] ?? `model-${i}`, row, col, accent: i % 6 === 3 });
      i++;
    }
  }
}

export const Product: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-40): tilt in — spring from small + tilted to on-screen
  const tiltIn = spring({ frame, fps, config: { damping: 16, mass: 1.1, stiffness: 110 } });
  const width = interpolate(tiltIn, [0, 1], [920, 1560]);
  const rotateX = interpolate(tiltIn, [0, 1], [14, 2]);
  const rotateZ = interpolate(tiltIn, [0, 1], [-12, -3.5]);

  // Phase 2 (46-76): settle upright
  const upright = spring({ frame: frame - 46, fps, config: { damping: 18, mass: 1, stiffness: 120 } });
  const rotZ = interpolate(upright, [0, 1], [rotateZ, 0]);
  const rotX = interpolate(upright, [0, 1], [rotateX, 0]);
  const w = interpolate(upright, [0, 1], [width, 1640]);

  // Phase 3 (112+): dive through the screen toward the wall
  const dive = spring({ frame: frame - DIVE_FROM, fps, config: { damping: 26, mass: 1 } });
  const finalW = interpolate(dive, [0, 1], [w, 2800]);
  const mockupOpacity = interpolate(frame, [126, 148], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 1, 1),
  });

  const floating = Math.sin(frame / 26) * 8;
  const shadow = 40 + 18 * Math.sin(frame / 26);

  // Wall: counter value rolls up, locks at 40,000+.
  // Hidden until COUNTER_FROM so no stray "0" shows while the wall cascades in.
  const counterVisible = frame >= COUNTER_FROM;
  const counterValue = Math.round(
    interpolate(frame, [COUNTER_FROM, COUNTER_TO], [1, 40000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.65, 0.2, 1),
    })
  );
  const landed = frame >= COUNTER_TO;
  const landPop = spring({ frame: frame - COUNTER_TO, fps, config: { damping: 12, mass: 0.9, stiffness: 160 } });
  const counterBreathe = landed ? 1 + 0.01 * Math.sin(frame / 18) : 1;

  // Whole-wall slow drift so nothing is ever perfectly still.
  const wallDrift = Math.sin(frame / 38) * 9;

  const exitOpacity = interpolate(frame, [228, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 1, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 34%, rgba(254, 244, 122, 0.05), transparent 58%)",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: exitOpacity,
          alignItems: "center",
          justifyContent: "center",
          perspective: 1600,
        }}
      >
        {/* Browser mockup with the dashboard — tilts in, settles, then dives */}
        <Interactive.Div
          name="Browser mockup"
          style={{
            width: finalW,
            height: (finalW * 1080) / 1920,
            transformOrigin: "center center",
            transform: `perspective(1600px) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`,
            backgroundColor: colors.surface,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: `0 ${shadow}px 90px rgba(0, 0, 0, 0.55), 0 ${shadow / 3}px ${shadow}px rgba(254, 244, 122, 0.05)`,
            translate: `0px ${floating}px`,
            opacity: mockupOpacity,
          }}
        >
          {/* Chrome bar */}
          <div
            style={{
              height: 54,
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingLeft: 22,
              backgroundColor: "#262624",
              borderBottom: `1px solid ${colors.faint}`,
            }}
          >
            <div style={{ width: 13, height: 13, borderRadius: "50%", backgroundColor: "#5a5a57" }} />
            <div style={{ width: 13, height: 13, borderRadius: "50%", backgroundColor: "#5a5a57" }} />
            <div style={{ width: 13, height: 13, borderRadius: "50%", backgroundColor: "#5a5a57" }} />
            <div
              style={{
                flex: 1,
                maxWidth: 620,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#1a1a19",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: font.mono,
                fontSize: 15,
                color: colors.muted,
              }}
            >
              featherless.ai/models
            </div>
            <div style={{ width: 200 }} />
          </div>
          {/* Screenshot */}
          <Img
            name="Dashboard screenshot"
            src={staticFile("screenshot-dashboard.png")}
            style={{
              width: "100%",
              height: "calc(100% - 54px)",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
            }}
          />
        </Interactive.Div>

        </AbsoluteFill>

      {/* The model wall — we have flown through the dashboard into the catalog */}
      <AbsoluteFill
        name="Model wall"
        style={{
          opacity: exitOpacity,
          translate: `0px ${wallDrift}px`,
        }}
      >
        {CHIPS.map((chip) => {
          const pop = spring({
            frame: frame - (WALL_FROM + (chip.row + chip.col) * 2.6),
            fps,
            config: { damping: 14, mass: 0.8, stiffness: 140 },
          });
          return (
            <Interactive.Div
              key={chip.name}
              name={`Model: ${chip.name}`}
              style={{
                position: "absolute",
                left: ORIGIN_X + chip.col * PITCH_X,
                top: ORIGIN_Y + chip.row * PITCH_Y,
                width: CHIP_W,
                height: CHIP_H,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: font.mono,
                fontSize: 16,
                color: chip.accent ? colors.primary : colors.text,
                backgroundColor: "rgba(30, 30, 28, 0.92)",
                border: `1px solid ${chip.accent ? "rgba(254, 244, 122, 0.45)" : colors.faint}`,
                borderRadius: 10,
                opacity: interpolate(pop, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
                scale: `${interpolate(pop, [0, 1], [0.6, 1])}`,
                translate: `0px ${interpolate(pop, [0, 1], [14, 0])}px`,
              }}
            >
              {chip.name}
            </Interactive.Div>
          );
        })}

        {/* Counter in the calm center of the wall */}
        <Interactive.Div
          name="Model counter"
          style={{
            position: "absolute",
            left: ORIGIN_X + HOLE_COLS[0] * PITCH_X,
            top: ORIGIN_Y + HOLE_ROWS[0] * PITCH_Y - 40,
            width: 3 * PITCH_X - (PITCH_X - CHIP_W),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
          }}
        >
          <Interactive.Div
            name="Counter label"
            style={{
              fontFamily: font.mono,
              fontSize: 20,
              letterSpacing: 5,
              color: colors.muted,
              opacity: interpolate(frame, [134, 146], [0, 0.9], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          >
            OPEN MODELS · ONE API KEY
          </Interactive.Div>
          <Interactive.Div
            name="Counter value"
            style={{
              fontFamily: font.mono,
              fontSize: 118,
              fontWeight: 700,
              letterSpacing: "-2px",
              color: landed ? colors.primary : colors.text,
              scale: `${counterBreathe * interpolate(landPop, [0, 1], [0.94, 1])}`,
              opacity: counterVisible ? 1 : 0,
            }}
          >
            {counterValue.toLocaleString("en-US")}
            {landed ? "+" : ""}
          </Interactive.Div>
          <Interactive.Div
            name="Counter substats"
            style={{
              fontFamily: font.family,
              fontSize: 24,
              color: colors.muted,
              opacity: interpolate(frame, [SUBSTATS_AT, SUBSTATS_AT + 12], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
              translate: `0px ${interpolate(frame, [SUBSTATS_AT, SUBSTATS_AT + 12], [10, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              })}px`,
            }}
          >
            Zero cold starts · flat-rate pricing
          </Interactive.Div>
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};