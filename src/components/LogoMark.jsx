import React from "react";

/**
 * Lightweight, static Abramad logo built from three rounded <div> pills
 * instead of SVG paths + filters. Geometry is derived directly from the
 * original 306×306 SVG:
 *
 *   - All three pills share the SAME width (110.4/306 ≈ 36% of the box).
 *   - All three radiate from ONE shared bottom pivot at (49.9%, 81.8%).
 *   - The center (azure) pill is the tallest (tip-to-tip ≈ 100% of box).
 *   - The side pills (blue/green) are the same shorter length (≈81%),
 *     rotated ±45° around the shared pivot.
 *
 * Everything is expressed in % of the square container, so it stays
 * pixel-perfect at any size — just set the box width/height.
 */

// --- measured from the SVG (units out of 306) ---
const DIAMETER = 110.36 / 306; // pill width  ≈ 0.3606
const RADIUS = DIAMETER / 2; // pill cap radius ≈ 0.1803
const AXIS_CENTER = 195.11 / 306; // azure cap-to-cap ≈ 0.6376
const AXIS_SIDE = 137.9 / 306; // blue/green cap-to-cap ≈ 0.4507
const PIVOT_Y = 250.29 / 306; // shared bottom pivot ≈ 0.8179

// Build the absolute-position style for one vertical pill, anchored so its
// bottom cap center sits exactly on the shared pivot, then rotated about it.
function pill(axisLength, rotateDeg, background) {
  const total = axisLength + DIAMETER; // tip-to-tip height
  const top = PIVOT_Y - axisLength - RADIUS; // top edge of the (un-rotated) box
  // rotation origin = the bottom cap center, as a % within this box
  const originY = ((total - RADIUS) / total) * 100;
  return {
    position: "absolute",
    width: `${DIAMETER * 100}%`,
    height: `${total * 100}%`,
    left: `${(0.5 - RADIUS) * 100}%`, // centered on pivot.x (≈ 49.9%)
    top: `${top * 100}%`,
    borderRadius: "9999px",
    transformOrigin: `50% ${originY}%`,
    transform: rotateDeg ? `rotate(${rotateDeg}deg)` : undefined,
    background,
  };
}

export default function LogoMark({
  size = "100%",
  className = "",
  style,
  ...rest
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size, aspectRatio: "1 / 1", ...style }}
      aria-hidden="true"
      {...rest}
    >
      {/* GREEN — up-left */}
      <div
        className="glass-panel"
        style={pill(
          AXIS_SIDE,
          -45,
          "linear-gradient(45deg, #54BA60 0%, #7cd58a 100%)",
        )}
      />
      {/* BLUE — up-right */}
      <div
        className="glass-panel"
        style={pill(
          AXIS_SIDE,
          45,
          "linear-gradient(135deg, #3b6cd1 0%, #264A9F 100%)",
        )}
      />
      {/* AZURE — center, tallest */}
      <div
        className="glass-panel"
        style={pill(
          AXIS_CENTER,
          0,
          "linear-gradient(180deg, #5a8bd8 0%, #4272B8 100%)",
        )}
      />
    </div>
  );
}
