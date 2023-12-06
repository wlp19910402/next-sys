/** @type {import('next').NextConfig}  */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
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
