import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/modern-web-stack' : '';

const nextConfig: NextConfig = {
  // commented 'output' solve problem with 'Page "/[[...slug]]/page" is missing param "/[[...slug]]" in "generateStaticParams()", which is required with "output: export" config.'
  // output: 'export', // Outputs a Single-Page Application (SPA)
  distDir: 'build', // Changes the build output directory to `build`
  basePath,
};

export default nextConfig;
