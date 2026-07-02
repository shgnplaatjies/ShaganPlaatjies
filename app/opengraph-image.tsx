import { ImageResponse } from "next/og";
import { DarkBackgroundColor, DarkColorValues, DarkGrayColors } from "./lib/colors";

export const runtime = "nodejs";

export const alt = "Shagan Plaatjies";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const BG = DarkBackgroundColor;
const PANEL = DarkGrayColors[1];
const CYAN = DarkColorValues[9];
const TEXT = DarkGrayColors[12];
const SUBTLE = DarkColorValues[10];

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: BG,
          backgroundImage: `linear-gradient(135deg, ${BG} 0%, ${PANEL} 100%)`,
          padding: "80px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "16px",
              height: "16px",
              borderRadius: "999px",
              backgroundColor: CYAN,
              marginRight: "16px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: SUBTLE,
              letterSpacing: "2px",
            }}
          >
            ~/shaganplaatjies
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "76px",
            color: TEXT,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          Shagan Plaatjies
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "32px",
            color: CYAN,
            marginTop: "24px",
          }}
        >
          My slice of the silicone sea
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
