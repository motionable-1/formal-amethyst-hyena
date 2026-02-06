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
  HackerText,
} from "../../library/components/text/TextAnimation";
import { Glow, AnimatedGlow } from "../../library/components/effects/Glow";
import { GridBackground } from "../../library/components/effects/GridBackground";
import { ShimmerText } from "../../library/components/effects/Shimmer";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoEntrance = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 90 },
  });
  const logoOpacity = interpolate(frame - 5, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(logoEntrance, [0, 1], [0.6, 1]);

  // CTA entrance
  const ctaDelay = 45;
  const ctaEntrance = spring({
    frame: frame - ctaDelay,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const ctaOpacity = interpolate(frame - ctaDelay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(ctaEntrance, [0, 1], [30, 0]);

  // URL entrance
  const urlDelay = 58;
  const urlOpacity = interpolate(frame - urlDelay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ambient floating orbs
  const orb1Y = Math.sin(frame * 0.04) * 15;
  const orb2Y = Math.cos(frame * 0.035) * 18;
  const orb2X = Math.sin(frame * 0.028) * 12;
  const orb3Y = Math.sin(frame * 0.045) * 8;

  // Background pulse
  const bgPulse = Math.sin(frame * 0.025) * 0.04 + 1;

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#0a0a0f", fontFamily, overflow: "hidden" }}
    >
      {/* Generated aurora background */}
      <Img
        src="https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/revid-promo/1770410372556_h75s5mrwiuj_revid_closing_bg.png"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.35,
          transform: `scale(${bgPulse + 0.05})`,
        }}
      />

      {/* Grid background on top */}
      <GridBackground
        cellSize={55}
        color="rgba(74, 222, 128, 0.03)"
        backgroundColor="transparent"
        animate
        velocity={15}
        direction="up"
        fadeEdges
      />

      {/* Large ambient glows */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: `translate(-50%, ${orb1Y}px) scale(${bgPulse})`,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,222,128,0.12) 0%, rgba(56,189,248,0.04) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          transform: `translate(${orb2X}px, ${orb2Y}px)`,
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "20%",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
          transform: `translateY(${orb3Y}px)`,
          filter: "blur(35px)",
        }}
      />

      {/* Content */}
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
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            marginBottom: 36,
          }}
        >
          <AnimatedGlow
            color="#4ade80"
            intensity={30}
            duration={0.8}
            pulsateAfter
            pulseDuration={2.5}
            layers={3}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Img
                src="https://api.iconify.design/heroicons/play-solid.svg?color=%234ade80&width=56"
                style={{ width: 56, height: 56 }}
              />
              <span
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                revid
                <span style={{ color: "#4ade80" }}>.ai</span>
              </span>
            </div>
          </AnimatedGlow>
        </div>

        {/* Main CTA text */}
        <FadeInChars
          startFrom={15}
          stagger={0.02}
          duration={0.6}
          ease="back.out(1.4)"
          style={{
            fontSize: 62,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            textWrap: "balance",
          }}
        >
          Start creating{" "}
          <ShimmerText
            baseColor="#4ade80"
            highlightColor="#ffffff"
            duration={2.5}
          >
            viral content
          </ShimmerText>{" "}
          today
        </FadeInChars>

        {/* Subtitle */}
        <BlurReveal
          startFrom={32}
          stagger={0.03}
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: "rgba(255,255,255,0.55)",
            marginTop: 20,
            textAlign: "center",
            textWrap: "balance",
          }}
        >
          No editing skills required. Free to start.
        </BlurReveal>

        {/* CTA Button */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
            marginTop: 44,
          }}
        >
          <Glow
            color="#4ade80"
            intensity={25}
            pulsate
            pulseDuration={2}
            layers={3}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                color: "#0a0a0f",
                fontSize: 22,
                fontWeight: 700,
                padding: "18px 48px",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 8px 40px rgba(74,222,128,0.35)",
              }}
            >
              <span>Get Started Free</span>
              <Img
                src="https://api.iconify.design/heroicons/arrow-right.svg?color=%230a0a0f&width=24"
                style={{ width: 24, height: 24 }}
              />
            </div>
          </Glow>
        </div>

        {/* URL */}
        <div
          style={{
            opacity: urlOpacity,
            marginTop: 32,
          }}
        >
          <HackerText
            startFrom={urlDelay}
            stagger={0.03}
            duration={1.2}
            chars="abcdefghijklmnopqrstuvwxyz./"
            initialColor="#4ade80"
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.05em",
            }}
          >
            revid.ai
          </HackerText>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
