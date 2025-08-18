/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@osm/lib", "@osm/types", "@osm/ui"]
};
export default nextConfig;
