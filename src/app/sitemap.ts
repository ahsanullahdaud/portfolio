import type { MetadataRoute } from "next";
import { identity } from "@/content/identity";
import { screens } from "@/content/screens";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return screens.map((s) => ({
    url: `${identity.siteUrl}${s.route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: s.id === "index" ? 1 : 0.8,
  }));
}
