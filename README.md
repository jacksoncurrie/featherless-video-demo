# featherless-video-demo

30-second product demo video for [Featherless](https://featherless.ai) — serverless inference for open models — built with [Remotion](https://remotion.dev).

<p align="center">
  <a href="https://remotion.dev">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

## Structure

| Scene | Frames | Content |
|---|---|---|
| Hook | 0–90 | "Inference that keeps up." — words land on 128 BPM beats |
| Problem | 90–210 | GPU cost counter spiraling, provisioning bar stalling |
| Product | 210–450 | Browser mockup tilt-in showing the **real featherless.ai homepage**, then a dive through the screen into a cascading wall of real model names as a counter rolls to 40,000+ |
| Code beat | 450–630 | Real quickstart API call, deliberately slow typewriter + piece-by-piece streaming response, then a hold on the result; latency badge → 87ms |
| Metrics | 630–780 | Cost comparison bars + savings counter |
| Outro | 780–900 | **Real Featherless Lottie logo** drawing in (playbackRate 1), tagline, CTA |

- `src/theme.ts` — brand constants (colors `#FEF47A` / `#141413`, Inter + JetBrains Mono via `@remotion/google-fonts`)
- `src/scenes/` — one component per scene, also registered standalone for per-scene preview
- `src/components/Backdrop.tsx` — drifting gradient + particles background
- `public/featherless-logo.json` — the actual Featherless nav logo Lottie, pulled from their site CDN
- `public/screenshot-homepage.png` — real featherless.ai homepage capture (16:9 crop of the 2672×1428 viewport shot)
- `public/music.mp3` — synthesized 128 BPM track (kick every beat, ~14 frames at 30fps)

## Commands

```bash
npm i
npx remotion studio                          # interactive preview
npx remotion render DemoVideo out/demo.mp4   # final render
```

The code scene uses Featherless's actual quickstart (OpenAI-compatible client,
`https://api.featherless.ai/v1`). Numbers used (40,000+ models, ~10× cost
reduction, 87ms p50) are grounded in their public positioning — swap in
production metrics in the scene files.

## License

Note that for some entities a company license is needed for Remotion. Read the
[terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).