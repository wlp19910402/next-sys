/** @type {import('next').NextConfig}  */
const nextConfig = {
  reactStrictMode: false,
  redirects: async () => {
    return [
      //   {
      //     source: '/',
      //     destination: '/',
      //     permanent: false,
      //   },
    ]
  },
}

module.exports = nextConfig
