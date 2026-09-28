// Scene 1 — Hook (90 frames): bold claim lands word-by-word on music beats.
import React from "react";
import { AbsoluteFill, Easing, Interactive, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, font, FRAMES_PER_BEAT } from "../theme";
import { Backdrop } from "../components/Backdrop";

const WORDS = ["Inference", "that", "keeps", "up."];
// Beats (128 BPM @ 30fps): every 14 frames — words land on beats 1-4.
const WORD_DELAYS = [0, 1 * FRAMES_PER_BEAT, 2 * FRAMES_PER_BEAT, 3 * FRAMES_PER_BEAT];

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene exit: 78-90
  const exitOpacity = interpolate(frame, [78, 88], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 1, 1),
  });
  const exitScale = interpolate(frame, [78, 90], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 1, 1),
  });

  return (
    <AbsoluteFill>
      <Backdrop />
      <AbsoluteFill
        style={{
          scale: `${exitScale}`,
          opacity: exitOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 34,
        }}
      >
        <Interactive.Div
          name="Hook headline"
          style={{
            display: "flex",
            gap: 26,
            fontSize: 138,
            fontWeight: 700,
            fontFamily: font.family,
            color: colors.text,
            letterSpacing: "-2px",
          }}
        >
          {WORDS.map((word, i) => {
            const s = spring({
              frame: frame - WORD_DELAYS[i],
              fps,
              config: { damping: 14, mass: 0.9, stiffness: 130 },
            });
            return (
              <Interactive.Div
                key={word}
                name={`Word: ${word}`}
                style={{
                  opacity: interpolate(s, [0, 0.6], [0, 1], { extrapolateRight: "clamp" }),
                  scale: `${interpolate(s, [0, 1], [0.72, 1])}`,
                  translate: `0px ${interpolate(s, [0, 1], [46, 0])}px`,
                  color: i === 3 ? colors.primary : colors.text,
                }}
              >
                {word}
              </Interactive.Div>
            );
          })}
        </Interactive.Div>

        <Interactive.Div
          name="Hook subtitle"
          style={{
            fontFamily: font.family,
            fontSize: 34,
            fontWeight: 500,
            color: colors.muted,
            opacity: interpolate(frame, [3 * FRAMES_PER_BEAT, 3 * FRAMES_PER_BEAT + 12, 82, 90], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: `0px ${interpolate(frame, [3 * FRAMES_PER_BEAT, 3 * FRAMES_PER_BEAT + 12], [16, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}px`,
          }}
        >
          Open models. One API key. Zero cold starts.
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};