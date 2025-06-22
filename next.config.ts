import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.219.200'],

  // 또는 모든 오리진 허용 (개발 환경에서만)
  experimental: {
    allowedDevOrigins: ['*']
  }
};

export default nextConfig;
