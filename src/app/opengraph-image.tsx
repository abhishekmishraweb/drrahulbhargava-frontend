import { ImageResponse } from "next/og";

export const alt = "Dr. Rahul Bhargava — Hematologist & BMT at Fortis Gurugram";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0e4560 0%, #156f9f 55%, #1a8bb8 100%)",
          padding: "56px 64px",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#8bc34a",
          }}
        >
          Hematology · Hemato-Oncology · BMT
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            Dr. Rahul Bhargava
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 600,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.9)",
              maxWidth: 900,
            }}
          >
            Principal Director & Chief Hematology at Fortis Memorial Research Institute, Gurugram
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", gap: 28, fontSize: 22, fontWeight: 700 }}>
            <span>1,500+ transplants</span>
            <span>23+ years</span>
            <span>CAR-T · Leukemia · Thalassemia</span>
          </div>
          <div
            style={{
              display: "flex",
              background: "#8bc34a",
              color: "#0e4560",
              borderRadius: 999,
              padding: "12px 22px",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            Free consult
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
