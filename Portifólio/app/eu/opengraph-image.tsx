import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Eu, Gabriel — Marketing + IA em produção";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          color: "#fff",
          fontFamily: "sans-serif",
          padding: 64,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundImage:
            "radial-gradient(circle at 20% 60%, rgba(197,242,62,0.18) 0%, transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#a3a3a3",
          }}
        >
          <span>Marketing + IA em produção</span>
          <span>@madureira0x</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -2,
              textTransform: "uppercase",
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "baseline",
            }}
          >
            <span>Você ou aprende IA</span>
            <span
              style={{
                background: "#C5F23E",
                color: "#000",
                padding: "0 16px",
              }}
            >
              ou fica por fora
            </span>
            <span style={{ color: "#525252" }}>.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#737373",
          }}
        >
          <span>madureira.xyz/eu</span>
          <span style={{ color: "#C5F23E" }}>Mentoria · Consultoria · Newsletter</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
