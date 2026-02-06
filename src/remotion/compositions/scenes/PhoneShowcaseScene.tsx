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
  FadeInChars,
  WaveText,
} from "../../library/components/text/TextAnimation";
import { PhoneMockup } from "../../library/components/mockups/PhoneMockup";
import { AnimatedGlow } from "../../library/components/effects/Glow";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

export const PhoneShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone entrance - slides up with spring
  const phoneEntrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const phoneY = interpolate(phoneEntrance, [0, 1], [120, 0]);
  const phoneOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Gentle phone float
  const phoneFloat = Math.sin(frame * 0.04) * 6;
  const phoneRotate = Math.sin(frame * 0.025) * 1.5;

  // Stats entrance
  const stat1Delay = 20;
  const stat2Delay = 28;
  const stat3Delay = 36;

  // Ambient orbs
  const orbY = Math.sin(frame * 0.035) * 15;

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#0a0a0f", fontFamily, overflow: "hidden" }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: `translate(-50%, ${orbY}px)`,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,222,128,0.1) 0%, rgba(56,189,248,0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Layout: text left, phone right */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 100px",
          gap: 80,
        }}
      >
        {/* Left: Text content */}
        <div style={{ flex: 1, maxWidth: 520 }}>
          <WaveText
            startFrom={8}
            stagger={0.03}
            amplitude={25}
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#4ade80",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Mobile First
          </WaveText>

          <FadeInChars
            startFrom={14}
            stagger={0.02}
            duration={0.5}
            ease="power3.out"
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              textWrap: "balance",
            }}
          >
            Designed for the platforms you love
          </FadeInChars>

          {/* Stats */}
          <div
            style={{
              marginTop: 48,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <StatItem
              value="10M+"
              label="Videos created"
              delay={stat1Delay}
              color="#4ade80"
            />
            <StatItem
              value="50K+"
              label="Active creators"
              delay={stat2Delay}
              color="#38bdf8"
            />
            <StatItem
              value="98%"
              label="Time saved"
              delay={stat3Delay}
              color="#a855f7"
            />
          </div>
        </div>

        {/* Right: Phone mockup */}
        <div
          style={{
            opacity: phoneOpacity,
            transform: `translateY(${phoneY + phoneFloat}px) rotate(${phoneRotate}deg)`,
          }}
        >
          <AnimatedGlow
            color="#4ade80"
            intensity={25}
            duration={0.8}
            pulsateAfter
            pulseDuration={3}
            layers={2}
          >
            <PhoneMockup
              device="iphone-15"
              color="black"
              shadow
              reflection={0.1}
              scale={0.55}
            >
              {/* Generated app screen UI */}
              <Img
                src="https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/revid-promo/1770410371650_ivirv0id2u_revid_phone_screen.png"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </PhoneMockup>
          </AnimatedGlow>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

interface StatItemProps {
  value: string;
  label: string;
  delay: number;
  color: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(entrance, [0, 1], [-40, 0]);

  // Subtle pulse on the value
  const pulse = Math.sin((frame - delay) * 0.08) * 0.02 + 1;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 4,
          height: 36,
          borderRadius: 2,
          background: color,
          boxShadow: `0 0 12px ${color}60`,
        }}
      />
      <div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            transform: `scale(${pulse})`,
            transformOrigin: "left center",
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};
