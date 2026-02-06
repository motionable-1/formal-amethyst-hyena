import { Artifact, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";
import { HeroScene } from "./scenes/HeroScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { PhoneShowcaseScene } from "./scenes/PhoneShowcaseScene";
import { SocialProofScene } from "./scenes/SocialProofScene";
import { ClosingScene } from "./scenes/ClosingScene";

// Scene durations (in frames at 30fps)
const HERO_DURATION = 120; // 4s
const FEATURES_DURATION = 120; // 4s
const PHONE_DURATION = 120; // 4s
const SOCIAL_DURATION = 120; // 4s
const CLOSING_DURATION = 150; // 5s (extra hold at end)

// Transition duration
const TRANSITION_DURATION = 20; // ~0.67s

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {/* Thumbnail */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      <TransitionSeries>
        {/* Scene 1: Hero */}
        <TransitionSeries.Sequence durationInFrames={HERO_DURATION}>
          <HeroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2: Features */}
        <TransitionSeries.Sequence durationInFrames={FEATURES_DURATION}>
          <FeaturesScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 3: Phone Showcase */}
        <TransitionSeries.Sequence durationInFrames={PHONE_DURATION}>
          <PhoneShowcaseScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 4: Social Proof */}
        <TransitionSeries.Sequence durationInFrames={SOCIAL_DURATION}>
          <SocialProofScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 5: Closing CTA */}
        <TransitionSeries.Sequence durationInFrames={CLOSING_DURATION}>
          <ClosingScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
