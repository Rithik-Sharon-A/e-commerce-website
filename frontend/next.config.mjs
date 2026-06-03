/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    const imageRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".png"),
    );
    if (imageRule) {
      imageRule.exclude = /src\/assets/;
    }
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp)$/i,
      include: /src\/assets/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
