import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import {
  FadeInWords,
  BounceChars,
} from "../../library/components/text/TextAnimation";
import { Counter } from "../../library/components/text/Counter";
import { Glow } from "../../library/components/effects/Glow";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

interface MetricProps {
  value: number;
  suffix: string;
  label: string;
  color: string;
  delay: number;
  index: number;
}

const Metric: React.FC<MetricProps> = ({
  value,
  suffix,
  label,
  color,
  delay,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(entrance, [0, 1], [0.7, 1]);
  const y = interpolate(entrance, [0, 1], [50, 0]);

  // Subtle ambient pulse
  const pulse = Math.sin((frame + index * 30) * 0.05) * 3;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        textAlign: "center",
        padding: "30px 40px",
        borderRadius: 24,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent glow */}
      <div
        style={{
          position: "absolute",
          bottom: -10,
          left: "50%",
          transform: `translateX(-50%) translateY(${pulse}px)`,
          width: 120,
          height: 60,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          filter: "blur(15px)",
        }}
      />

      <Glow color={color} intensity={10} pulsate pulseDuration={3}>
        <Counter
          from={0}
          to={value}
          duration={1.8}
          delay={delay / fps + 0.2}
          suffix={suffix}
          ease="smooth"
          abbreviate
          className="tabular-nums"
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.03em",
          }}
        />
      </Glow>

      <div
        style={{
          marginTop: 8,
          fontSize: 16,
          fontWeight: 500,
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </div>

      {/* Color bar */}
      <div
        style={{
          width: 40,
          height: 3,
          borderRadius: 2,
          background: color,
          margin: "14px auto 0",
          boxShadow: `0 0 10px ${color}50`,
        }}
      />
    </div>
  );
};

const metrics = [
  { value: 10000000, suffix: "+", label: "Videos Created", color: "#4ade80" },
  { value: 50000, suffix: "+", label: "Active Creators", color: "#38bdf8" },
  { value: 150, suffix: "+", label: "Countries", color: "#a855f7" },
];

export const SocialProofScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Floating decorations
  const orbY = Math.sin(frame * 0.03) * 10;
  const orbX = Math.cos(frame * 0.025) * 8;

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#0a0a0f", fontFamily, overflow: "hidden" }}
    >
      {/* Ambient orbs */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: `translate(-50%, ${orbY}px)`,
          width: 700,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(74,222,128,0.06) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "20%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          transform: `translate(${orbX}px, ${-orbY}px)`,
          filter: "blur(30px)",
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 100px",
        }}
      >
        {/* Section label */}
        <BounceChars
          startFrom={5}
          stagger={0.03}
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#4ade80",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Trusted Worldwide
        </BounceChars>

        <FadeInWords
          startFrom={12}
          stagger={0.08}
          style={{
            fontSize: 50,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "-0.03em",
            marginBottom: 60,
            textWrap: "balance",
          }}
        >
          Creators love what we build
        </FadeInWords>

        {/* Metrics row */}
        <div
          style={{
            display: "flex",
            gap: 36,
            alignItems: "stretch",
          }}
        >
          {metrics.map((metric, index) => (
            <Metric
              key={metric.label}
              {...metric}
              index={index}
              delay={20 + index * 10}
            />
          ))}
        </div>

        {/* Avatar row */}
        <AvatarRow delay={55} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const AvatarRow: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(entrance, [0, 1], [20, 0]);

  const avatarColors = [
    "#4ade80",
    "#38bdf8",
    "#a855f7",
    "#f59e0b",
    "#ec4899",
    "#06b6d4",
  ];

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginTop: 48,
      }}
    >
      <div style={{ display: "flex", marginRight: 8 }}>
        {avatarColors.map((color, i) => (
          <div
            key={i}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
              border: "2px solid #0a0a0f",
              marginLeft: i > 0 ? -10 : 0,
              zIndex: 10 - i,
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.5)",
          fontWeight: 500,
        }}
      >
        Join 50,000+ creators
      </span>
    </div>
  );
};
