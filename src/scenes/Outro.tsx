// Scene 6 — Outro (120 frames): logo springs in, tagline, CTA, 20-frame hold.
import React from "react";
import { AbsoluteFill, Interactive, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
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
          <svg width="220" height="220" viewBox="0 0 240 240">
            <g fill="none" stroke={colors.primary} strokeWidth="10" strokeLinecap="round">
              <path d="M 40 200 C 40 110, 100 50, 210 30" />
              <path d="M 40 200 C 75 145, 130 110, 210 100" />
            </g>
            <g stroke={colors.primary} strokeWidth="7" strokeLinecap="round">
              <path d="M 100 85 C 135 100, 165 110, 195 115" opacity="0.85" />
              <path d="M 120 130 C 155 145, 185 150, 215 155" opacity="0.65" />
              <path d="M 145 175 C 175 185, 200 190, 225 195" opacity="0.45" />
            </g>
          </svg>
        </Interactive.Div>

        <Interactive.Div
          name="Wordmark"
          style={{
            fontFamily: font.family,
            fontSize: 84,
            fontWeight: 700,
            color: colors.text,
            letterSpacing: "-1px",
            opacity: interpolate(logoSpring, [0.3, 1], [0, 1], { extrapolateRight: "clamp" }),
            translate: `0px ${interpolate(logoSpring, [0.3, 1], [24, 0])}px`,
          }}
        >
          featherless
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
            fontFamily: font.family,
            fontSize: 30,
            fontWeight: 600,
            color: colors.background,
            backgroundColor: colors.primary,
            padding: "18px 44px",
            borderRadius: 14,
            opacity: interpolate(ctaIn, [0, 1], [0, 1]),
            scale: `${interpolate(ctaIn, [0, 1], [0.8, 1])}`,
            translate: `0px ${interpolate(ctaIn, [0, 1], [16, 0])}px`,
          }}
        >
          Get your API key → featherless.ai
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};