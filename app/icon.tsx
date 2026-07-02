import { ImageResponse } from "next/og";
import { DarkBackgroundColor, DarkColorValues } from "./lib/colors";

export const runtime = "nodejs";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

const BG = DarkBackgroundColor;
const CYAN = DarkColorValues[9];

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BG,
          borderRadius: "6px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: "20px",
            fontWeight: 700,
            color: CYAN,
          }}
        >
          {"</>"}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
