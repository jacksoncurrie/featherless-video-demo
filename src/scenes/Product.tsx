// Scene 3 — Product (240 frames): browser mockup tilts in, reveals dashboard,
// un-tilts toward fullscreen, three callouts pop in sequence.
import React from "react";
import { AbsoluteFill, Easing, Interactive, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, font } from "../theme";

const CALLOUTS = [
  { text: "40,000+ models, one key", at: 96, top: "18%", left: "8%" },
  { text: "Zero cold starts", at: 128, top: "46%", left: "70%" },
  { text: "Flat-rate pricing", at: 160, top: "72%", left: "14%" },
];

export const Product: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-40): tilt in — spring from small + tilted 12deg to on-screen
  const tiltIn = spring({ frame, fps, config: { damping: 16, mass: 1.1, stiffness: 110 } });
  const width = interpolate(tiltIn, [0, 1], [920, 1560]);
  const rotateX = interpolate(tiltIn, [0, 1], [14, 2]); // degrees
  const rotateZ = interpolate(tiltIn, [0, 1], [-12, -3.5]);

  // Phase 2 (46-76): settle upright
  const upright = spring({ frame: frame - 46, fps, config: { damping: 18, mass: 1, stiffness: 120 } });
  const rotZ = interpolate(upright, [0, 1], [rotateZ, 0]);
  const rotX = interpolate(upright, [0, 1], [rotateX, 0]);
  const w = interpolate(upright, [0, 1], [width, 1640]);

  // Phase 3 (170-210): push to near-fullscreen (un-tilt to fullscreen reveal)
  const reveal = spring({ frame: frame - 170, fps, config: { damping: 200, mass: 1 } });
  const finalW = interpolate(reveal, [0, 1], [w, 1888]);

  const floating = Math.sin(frame / 26) * 8; // continuous float — nothing static
  const shadow = 40 + 18 * Math.sin(frame / 26);

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

        {/* Callouts pop in sequence on top of the mockup */}
        {CALLOUTS.map((c) => {
          const pop = spring({
            frame: frame - c.at,
            fps,
            config: { damping: 13, mass: 0.8, stiffness: 150 },
          });
          return (
            <Interactive.Div
              key={c.text}
              name={`Callout: ${c.text}`}
              style={{
                position: "absolute",
                top: c.top,
                left: c.left,
                fontFamily: font.family,
                fontSize: 27,
                fontWeight: 600,
                color: colors.background,
                backgroundColor: colors.primary,
                padding: "12px 24px",
                borderRadius: 12,
                opacity: interpolate(pop, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
                scale: `${interpolate(pop, [0, 1], [0.6, 1])}`,
                translate: `0px ${interpolate(pop, [0, 1], [18, 0])}px`,
                boxShadow: "0 12px 34px rgba(0, 0, 0, 0.4)",
              }}
            >
              {c.text}
            </Interactive.Div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};