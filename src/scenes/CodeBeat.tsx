// Scene 4 — Code beat (180 frames): typewriter API call typed deliberately
// slowly (~2.8 chars/frame vs the old ~4.4), streaming response revealed piece
// by piece, latency badge counts down to 87ms, then the finished result HOLDS
// so it can be read. Code is the real Featherless quickstart.
import React from "react";
import { AbsoluteFill, Easing, Interactive, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, font } from "../theme";

// Syntax tokens: [text, color] — OpenAI-compatible Featherless call
const CODE: [string, string][] = [
  ["from", "#C792EA"], [" openai ", "#FAFAFA"], ["import", "#C792EA"], [" OpenAI", "#82AAFF"],
  ["\n\nclient", "#FAFAFA"], [" = ", "#89DDFF"], ["OpenAI", "#82AAFF"], ["(\n  base_url", "#FAFAFA"],
  ["=", "#89DDFF"], ["\"https://api.featherless.ai/v1\"", "#C3E88D"],
  [",\n  api_key", "#FAFAFA"], ["=", "#89DDFF"], ["\"fl_sk_…\"", "#C3E88D"], [",\n)\n\n", "#FAFAFA"],
  ["response", "#FAFAFA"], [" = ", "#89DDFF"], ["client", "#FAFAFA"], [".chat.completions.", "#FAFAFA"],
  ["create", "#82AAFF"], ["(\n  model", "#FAFAFA"], ["=", "#89DDFF"],
  ["\"zai-org/GLM-5.3\"", "#C3E88D"],
  [",\n  messages", "#FAFAFA"], ["=", "#89DDFF"], ["[{\"role\": \"user\", \"content\": \"Hello!\"}]", "#C3E88D"],
  [",\n)\n\n", "#FAFAFA"],
  ["print", "#82AAFF"], ["(response.choices[", "#FAFAFA"], ["0", "#F78C6C"], ["].message.content)", "#FAFAFA"],
];

// Response arrives piece by piece — smaller pieces mean the "text output"
// streams visibly rather than landing as one dump.
const RESPONSE_PIECES = [
  "Hello! I'm running on ",
  "Featherless — serverless ",
  "inference across 40,000+ ",
  "open models. No ",
  "clusters to manage, no ",
  "idle GPU spend.",
];

const TYPE_FROM = 8;
const TYPE_TO = 118; // 110 frames (~3.7s) of typing — deliberately slow
const RESP_FROM = 122; // response starts once the call is complete
const PIECE_EVERY = 5; // a new response piece every 5 frames
const BADGE_FROM = 116;
const LATENCY_FROM = 118;
const LATENCY_TO = 148;
const BADGE_LIVE = 144; // badge turns green / shows p50
const EXIT_FROM = 170; // result holds up to here, then fades

export const CodeBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flatten code with cumulative char counts for typewriter
  const totalChars = CODE.reduce((n, [t]) => n + t.length, 0);
  const typedChars = Math.round(
    interpolate(frame, [TYPE_FROM, TYPE_TO], [0, totalChars], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.35, 0.05, 0.4, 1),
    }),
  );

  // Build the visible token list up to typedChars
  let used = 0;
  const visible: [string, string][] = [];
  for (const [text, color] of CODE) {
    if (used >= typedChars) break;
    visible.push([text.slice(0, Math.max(0, typedChars - used)), color]);
    used += text.length;
  }

  // Streaming response: one piece per PIECE_EVERY frames, then the finished
  // result holds (with a gentle settle) until EXIT_FROM.
  const shownChunks = Math.max(
    0,
    Math.min(RESPONSE_PIECES.length, Math.floor((frame - RESP_FROM) / PIECE_EVERY) + 1),
  );
  const cursorOn = Math.floor(frame / 5) % 2 === 0;

  // Latency badge: counts down 412ms -> 87ms
  const latency = Math.round(
    interpolate(frame, [LATENCY_FROM, LATENCY_TO], [412, 87], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.5, 0, 0.2, 1),
    }),
  );
  const badgeIn = spring({ frame: frame - BADGE_FROM, fps, config: { damping: 14, mass: 0.8, stiffness: 150 } });

  const exitOpacity = interpolate(frame, [EXIT_FROM, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 1, 1),
  });

  const drift = Math.sin(frame / 30) * 6;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 62% 40%, rgba(254, 244, 122, 0.045), transparent 55%)",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: exitOpacity,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Interactive.Div
          name="Code window"
          style={{
            width: 1180,
            backgroundColor: "#191918",
            border: `1px solid ${colors.faint}`,
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 40px 110px rgba(0, 0, 0, 0.55)",
            translate: `0px ${drift}px`,
            opacity: spring({ frame, fps, config: { damping: 200 } }),
          }}
        >
          {/* Title bar */}
          <div
            style={{
              height: 50,
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingLeft: 20,
              borderBottom: `1px solid ${colors.faint}`,
              backgroundColor: "#222221",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#5a5a57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#5a5a57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#5a5a57" }} />
            <span style={{ fontFamily: font.mono, fontSize: 15, color: colors.muted, marginLeft: 14 }}>
              quickstart.py
            </span>
          </div>

          {/* Code area */}
          <div style={{ padding: "30px 36px", fontFamily: font.mono, fontSize: 22, lineHeight: 1.75, whiteSpace: "pre" }}>
            {visible.map(([text, color], i) => (
              <span key={i} style={{ color }}>
                {text}
              </span>
            ))}
            {frame < TYPE_TO + 4 && (
              <span
                style={{
                  display: "inline-block",
                  width: 11,
                  height: 24,
                  backgroundColor: colors.primary,
                  opacity: cursorOn ? 1 : 0,
                  translate: "2px 4px",
                }}
              />
            )}
          </div>

          {/* Streaming response */}
          {frame >= RESP_FROM && (
            <div
              style={{
                margin: "0 36px 32px 36px",
                padding: "20px 26px",
                backgroundColor: "#141413",
                border: `1px solid ${colors.faint}`,
                borderRadius: 12,
                fontFamily: font.family,
                fontSize: 23,
                lineHeight: 1.6,
                color: colors.text,
              }}
            >
              {RESPONSE_PIECES.slice(0, shownChunks).map((chunk, i) => (
                <span key={i}>{chunk}</span>
              ))}
              {shownChunks < RESPONSE_PIECES.length && (
                <span
                  style={{
                    display: "inline-block",
                    width: 10,
                    height: 21,
                    backgroundColor: colors.accent,
                    opacity: cursorOn ? 1 : 0,
                    translate: "2px 3px",
                  }}
                />
              )}
              {shownChunks === RESPONSE_PIECES.length && (
                <span style={{ color: colors.accent }}> ✓</span>
              )}
            </div>
          )}
        </Interactive.Div>

        {/* Latency badge — docked to the code window's top-right corner */}
        <Interactive.Div
          name="Latency badge"
          style={{
            position: "absolute",
            // window right edge (1920-1180)/2 + 370+1180=1550; 1550-180 badge width margin
            right: 1920 / 2 - 1180 / 2 + 28,
            top: 240 - 78,
            fontFamily: font.mono,
            fontSize: 30,
            fontWeight: 700,
            color: frame >= BADGE_LIVE ? colors.background : colors.text,
            backgroundColor: frame >= BADGE_LIVE ? colors.accent : colors.surface,
            border: `1px solid ${frame >= BADGE_LIVE ? colors.accent : colors.faint}`,
            borderRadius: 14,
            padding: "14px 26px",
            opacity: interpolate(badgeIn, [0, 0.6], [0, 1], { extrapolateRight: "clamp" }),
            scale: `${interpolate(badgeIn, [0, 1], [0.6, 1])}`,
          }}
        >
          {frame >= BADGE_LIVE ? `p50 ${latency}ms` : `${latency}ms…`}
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
