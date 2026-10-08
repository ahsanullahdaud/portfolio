import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { identity } from "@/content/identity";
import { screen } from "@/content/screens";
import { ui } from "@/content/ui";
import { ogColors as c } from "@/lib/tokens";

// Open Graph image (PLAN.md step 13): generated once at build time as a static PNG.
// Dark background, the prompt line, the name in the display font, the title and the site URL.
export const alt = `${identity.name}${ui.meta.separator}${identity.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontsDir = path.join(process.cwd(), "src", "assets", "og");

export default async function OpenGraphImage() {
  const [display, mono] = await Promise.all([
    readFile(path.join(fontsDir, "SpaceGrotesk-Bold.ttf")),
    readFile(path.join(fontsDir, "IBMPlexMono-Regular.ttf")),
  ]);
  const words = identity.name.split(" ");
  const nameLines = [words.slice(0, -1).join(" "), words[words.length - 1]];
  const host = new URL(identity.siteUrl).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: c.bg,
          color: c.fg,
          fontFamily: "IBM Plex Mono",
        }}
      >
        <div style={{ display: "flex", fontSize: 30 }}>
          <span style={{ color: c.ok }}>{ui.prompt.path}</span>
          <span style={{ color: c.accent, marginLeft: 14 }}>{ui.prompt.symbol}</span>
          <span style={{ marginLeft: 14 }}>{screen.index.command}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Space Grotesk",
              fontSize: 118,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            <span>{nameLines[0]}</span>
            <span style={{ display: "flex", alignItems: "center" }}>
              {nameLines[1]}
              <span style={{ width: 34, height: 94, background: c.accent, marginLeft: 18 }} />
            </span>
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 34, color: c.accent }}>{identity.title}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: c.muted }}>
          <span>{host}</span>
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ width: 14, height: 14, borderRadius: 7, background: c.ok, marginRight: 12 }} />
            {identity.statusShort}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: display, weight: 700, style: "normal" },
        { name: "IBM Plex Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
