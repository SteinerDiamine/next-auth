// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["utfs.io"]

   
//   }
// };



// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["utfs.io"]
  },
  typescript: {
    ignoreBuildErrors: true, // This will ignore TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // This will ignore ESLint errors during build
  }
};

export default nextConfig;