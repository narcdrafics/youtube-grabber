import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/go"], // Não indexar o redirector e APIs
    },
    sitemap: "https://thumbnailsgrabber.web.app/sitemap.xml",
  };
}
