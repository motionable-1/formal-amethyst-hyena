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
  BlurReveal,
} from "../../library/components/text/TextAnimation";
import { Glow } from "../../library/components/effects/Glow";
import { GridBackground } from "../../library/components/effects/GridBackground";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Headline entrance delay
  const headlineDelay = 18;

  // Tagline entrance delay
  const taglineDelay = 38;

  // CTA button entrance
  const ctaDelay = 55;
  const ctaProgress = spring({
    frame: frame - ctaDelay,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const ctaOpacity = interpolate(frame - ctaDelay, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(ctaProgress, [0, 1], [30, 0]);

  // Floating orbs
  const orb1Y = Math.sin(frame * 0.04) * 15;
  const orb1X = Math.cos(frame * 0.03) * 10;
  const orb2Y = Math.cos(frame * 0.035) * 20;
  const orb2X = Math.sin(frame * 0.025) * 12;
  const orb3Y = Math.sin(frame * 0.05) * 10;

  // Background pulse
  const bgPulse = Math.sin(frame * 0.02) * 0.03 + 1;

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#0a0a0f", fontFamily, overflow: "hidden" }}
    >
      {/* Generated hero background image */}
      <Img
        src="https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/revid-promo/1770410367124_3zghsod7yyd_revid_hero_bg.png"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.4,
          transform: `scale(${bgPulse + 0.05})`,
        }}
      />

      {/* Animated grid on top of image */}
      <GridBackground
        cellSize={60}
        color="rgba(74, 222, 128, 0.04)"
        backgroundColor="transparent"
        animate
        velocity={20}
        direction="up"
        fadeEdges
      />

      {/* Floating ambient glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "20%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)",
          transform: `translate(${orb1X}px, ${orb1Y}px) scale(${bgPulse})`,
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)",
          transform: `translate(${orb2X}px, ${orb2Y}px)`,
          filter: "blur(50px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "60%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          transform: `translateY(${orb3Y}px)`,
          filter: "blur(35px)",
        }}
      />

      {/* Content container */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 120px",
        }}
      >
        {/* Logo */}
        <Glow
          color="#4ade80"
          intensity={15}
          pulsate
          pulseDuration={3}
          layers={2}
        >
          <div
            style={{
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 40,
            }}
          >
            <Img
              src="https://api.iconify.design/heroicons/play-solid.svg?color=%234ade80&width=44"
              style={{ width: 44, height: 44 }}
            />
            <span
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              revid
              <span style={{ color: "#4ade80" }}>.ai</span>
            </span>
          </div>
        </Glow>

        {/* Headline */}
        <FadeInChars
          startFrom={headlineDelay}
          stagger={0.02}
          duration={0.6}
          ease="back.out(1.4)"
          className="text-center"
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            textWrap: "balance",
          }}
        >
          Create Viral Videos in{" "}
          <span style={{ color: "#4ade80" }}>Minutes</span>
        </FadeInChars>

        {/* Tagline */}
        <BlurReveal
          startFrom={taglineDelay}
          stagger={0.03}
          duration={0.7}
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: "rgba(255,255,255,0.6)",
            marginTop: 24,
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
            textWrap: "balance",
          }}
        >
          Turn ideas into attention-grabbing TikTok, Instagram & YouTube content
          with AI
        </BlurReveal>

        {/* CTA Button */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
            marginTop: 48,
          }}
        >
          <Glow
            color="#4ade80"
            intensity={20}
            pulsate
            pulseDuration={2.5}
            layers={2}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                color: "#0a0a0f",
                fontSize: 20,
                fontWeight: 700,
                padding: "16px 40px",
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 8px 32px rgba(74,222,128,0.3)",
              }}
            >
              <span>Create videos now</span>
              <Img
                src="https://api.iconify.design/heroicons/arrow-right.svg?color=%230a0a0f&width=22"
                style={{ width: 22, height: 22 }}
              />
            </div>
          </Glow>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
