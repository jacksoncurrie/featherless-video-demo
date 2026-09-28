// Main demo composition: 6 scenes, 900 frames @ 30fps = 30s.
// Music: 128 BPM synthesized track, volume 0.75, fades out over final 60 frames.
//
// Scene map (abs frames):
//   Hook      0- 90   word-by-word claims land on the beat
//   Problem  90-210   the pain
//   Product 210-450   mockup dives into the model wall; counter locks at ~408 (13.6s)
//   CodeBeat 450-630  slow typewriter quickstart + streaming result + hold
//   Metrics 630-780   cost bars + savings multiplier
//   Outro   780-900   real Lottie logo (playbackRate 1) + tagline + CTA
import React from "react";
import { AbsoluteFill, Sequence, staticFile, interpolate } from "remotion";
import { Audio } from "@remotion/media";
import { Hook } from "./scenes/Hook";
import { Problem } from "./scenes/Problem";
import { Product } from "./scenes/Product";
import { CodeBeat } from "./scenes/CodeBeat";
import { Metrics } from "./scenes/Metrics";
import { Outro } from "./scenes/Outro";

export const TOTAL_FRAMES = 900;

export const DemoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#141413" }}>
      <Audio
        src={staticFile("music.mp3")}
        volume={(f: number) =>
          interpolate(f, [0, 15, TOTAL_FRAMES - 60, TOTAL_FRAMES - 1], [0, 0.75, 0.75, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <Sequence from={0} durationInFrames={90} name="Hook">
        <Hook />
      </Sequence>
      <Sequence from={90} durationInFrames={120} name="Problem">
        <Problem />
      </Sequence>
      <Sequence from={210} durationInFrames={240} name="Product">
        <Product />
      </Sequence>
      <Sequence from={450} durationInFrames={180} name="CodeBeat">
        <CodeBeat />
      </Sequence>
      <Sequence from={630} durationInFrames={150} name="Metrics">
        <Metrics />
      </Sequence>
      <Sequence from={780} durationInFrames={120} name="Outro">
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
