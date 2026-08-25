import { ImageResponse } from "next/og";
import { brandMarkWhiteDataUri } from "@/lib/brand-mark";

export const alt = "Discover Mauritius — Tours, Airport Transfers & Holiday Packages";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundImage: "linear-gradient(135deg,#08394b 0%,#006994 55%,#00bfa6 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brandMarkWhiteDataUri} width={60} height={80} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ fontSize: "36px", fontWeight: 700 }}>Discover Mauritius</div>
            <div style={{ fontSize: "20px", color: "rgba(255,255,255,0.75)", letterSpacing: "0.14em" }}>
              BY N.K. TAHER CO LTD
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ display: "flex", fontSize: "68px", fontWeight: 700, lineHeight: 1.05, maxWidth: "980px" }}>
            The real Mauritius, planned without the hassle.
          </div>
          <div style={{ display: "flex", fontSize: "30px", color: "rgba(255,255,255,0.85)" }}>
            Tours · Airport Transfers · Holiday Packages · Air Ticketing
          </div>
        </div>

        <div style={{ display: "flex", gap: "18px", fontSize: "24px", color: "rgba(255,255,255,0.92)" }}>
          <div style={{ display: "flex" }}>Licensed Tour Operator</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>IATA Accredited</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>Since 2019</div>
        </div>
      </div>
    ),
    size,
  );
}
