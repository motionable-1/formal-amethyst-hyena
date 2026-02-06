import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  AbsoluteFill,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import {
  FadeInWords,
  SlideInText,
} from "../../library/components/text/TextAnimation";
import { Glow } from "../../library/components/effects/Glow";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

interface FeatureCardProps {
  illustration: string;
  title: string;
  description: string;
  color: string;
  delay: number;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  illustration,
  title,
  description,
  color,
  delay,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(entrance, [0, 1], [60, 0]);
  const scale = interpolate(entrance, [0, 1], [0.85, 1]);

  // Floating icon
  const iconFloat = Math.sin((frame + index * 20) * 0.06) * 4;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        width: 320,
        padding: 32,
        borderRadius: 20,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Card glow accent */}
      <div
        style={{
          position: "absolute",
          top: -20,
          left: -20,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* 3D Illustration */}
      <Glow color={color} intensity={14} pulsate pulseDuration={3} layers={2}>
        <div
          style={{
            transform: `translateY(${iconFloat}px)`,
            width: 100,
            height: 100,
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 20,
            position: "relative",
          }}
        >
          <Img
            src={illustration}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </Glow>

      {/* Title */}
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: 10,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 15,
          fontWeight: 400,
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.5,
        }}
      >
        {description}
      </div>
    </div>
  );
};

const features = [
  {
    illustration:
      "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/revid-promo/1770410368240_vkx56gyhbs_revid_ai_icon.png",
    title: "AI-Powered",
    description: "Generate scripts, scenes & edits with intelligent AI",
    color: "#4ade80",
  },
  {
    illustration:
      "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/revid-promo/1770410369196_3hlb5qo8nk8_revid_lightning_icon.png",
    title: "Lightning Fast",
    description: "From idea to finished video in under 2 minutes",
    color: "#38bdf8",
  },
  {
    illustration:
      "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/revid-promo/1770410370327_g8a8rv7bg4p_revid_chart_icon.png",
    title: "Viral Optimized",
    description: "Built-in trends analysis for maximum engagement",
    color: "#a855f7",
  },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Floating orbs
  const orbY = Math.sin(frame * 0.03) * 12;
  const orbX = Math.cos(frame * 0.025) * 8;

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#0a0a0f", fontFamily, overflow: "hidden" }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)",
          transform: `translate(${orbX}px, ${orbY}px)`,
          filter: "blur(50px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
          transform: `translateY(${-orbY}px)`,
          filter: "blur(40px)",
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        {/* Section title */}
        <SlideInText
          startFrom={5}
          direction="bottom"
          distance={40}
          stagger={0.04}
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#4ade80",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Why Revid.ai
        </SlideInText>

        <FadeInWords
          startFrom={12}
          stagger={0.08}
          duration={0.5}
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "-0.03em",
            marginBottom: 60,
            textWrap: "balance",
          }}
        >
          Everything you need to go viral
        </FadeInWords>

        {/* Feature cards */}
        <div
          style={{
            display: "flex",
            gap: 28,
            alignItems: "flex-start",
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              index={index}
              delay={22 + index * 8}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
