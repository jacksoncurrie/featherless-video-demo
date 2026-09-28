// Scene 6 — Outro (120 frames): the real Featherless Lottie logo draws in,
// tagline, CTA as plain text, 20-frame hold.
import React from "react";
import { AbsoluteFill, Interactive, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import animationData from "../../public/featherless-logo.json";
import { colors, font } from "../theme";
import { Backdrop } from "../components/Backdrop";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 13, mass: 1, stiffness: 120 } });
  const taglineIn = spring({ frame: frame - 22, fps, config: { damping: 18, mass: 0.9, stiffness: 130 } });
  const ctaIn = spring({ frame: frame - 40, fps, config: { damping: 18, mass: 0.9, stiffness: 130 } });

  const breathe = 1 + 0.015 * Math.sin(frame / 22);

  return (
    <AbsoluteFill>
      <Backdrop intensity={0.8} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 44,
        }}
      >
        <Interactive.Div
          name="Logo"
          style={{
            opacity: interpolate(logoSpring, [0, 0.7], [0, 1], { extrapolateRight: "clamp" }),
            scale: `${interpolate(logoSpring, [0, 1], [0.6, 1]) * breathe}`,
            translate: `0px ${interpolate(logoSpring, [0, 1], [40, 0])}px`,
          }}
        >
          <Lottie
            animationData={animationData as never}
            playbackRate={1}
            style={{ width: 960 }}
          />
        </Interactive.Div>

        <Interactive.Div
          name="Tagline"
          style={{
            fontFamily: font.family,
            fontSize: 38,
            fontWeight: 500,
            color: colors.muted,
            opacity: interpolate(taglineIn, [0, 1], [0, 1]),
            translate: `0px ${interpolate(taglineIn, [0, 1], [20, 0])}px`,
          }}
        >
          Inference that keeps up.
        </Interactive.Div>

        <Interactive.Div
          name="CTA"
          style={{
            fontFamily: font.mono,
            fontSize: 30,
            fontWeight: 500,
            color: colors.primary,
            opacity: interpolate(ctaIn, [0, 1], [0, 1]),
            translate: `0px ${interpolate(ctaIn, [0, 1], [16, 0])}px`,
          }}
        >
          featherless.ai — get your API key
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};