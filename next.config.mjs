/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has typescript errors.
    ignoreBuildErrors: true,
  },
}

export default nextConfig
