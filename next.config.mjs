await import('./env.mjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@axieinfinity/matcha', '@axieinfinity/matcha-icons'],
  sassOptions: {
    additionalData: `
      @import "./src/styles/matcha.scss";
    `,
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
}

export default nextConfig
