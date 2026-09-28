import "./index.css";
import { Composition, Folder } from "remotion";
import { DemoVideo, TOTAL_FRAMES } from "./DemoVideo";
import { Hook } from "./scenes/Hook";
import { Problem } from "./scenes/Problem";
import { Product } from "./scenes/Product";
import { CodeBeat } from "./scenes/CodeBeat";
import { Metrics } from "./scenes/Metrics";
import { Outro } from "./scenes/Outro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DemoVideo"
        component={DemoVideo}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={TOTAL_FRAMES}
      />
      <Folder name="Scenes">
        <Composition id="Hook" component={Hook} width={1920} height={1080} fps={30} durationInFrames={90} />
        <Composition id="Problem" component={Problem} width={1920} height={1080} fps={30} durationInFrames={120} />
        <Composition id="Product" component={Product} width={1920} height={1080} fps={30} durationInFrames={180} />
        <Composition id="CodeBeat" component={CodeBeat} width={1920} height={1080} fps={30} durationInFrames={210} />
        <Composition id="Metrics" component={Metrics} width={1920} height={1080} fps={30} durationInFrames={180} />
        <Composition id="Outro" component={Outro} width={1920} height={1080} fps={30} durationInFrames={120} />
      </Folder>
    </>
  );
};