// next/og's ImageResponse renders via Satori, which only supports literal
// inline style values - no Tailwind classes, Radix components, or CSS custom
// properties. Colors are pulled from app/lib/colors.ts and used as plain
// hex values rather than the usual utility classes.
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
