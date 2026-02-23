/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.ravalement-nettoyage-capello.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    const priorities = {
      "/": 1.0,
      "/contact": 0.9,
      "/services": 0.8,
      "/demoussage-toiture": 0.8,
      "/ravalement-facade": 0.8,
      "/peinture": 0.8,
      "/realisations": 0.7,
      "/avis-clients": 0.7,
      "/a-propos": 0.6,
      "/blog": 0.6,
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
  },
};
