/** @type {import('next').NextConfig}  */
const nextConfig = {
  reactStrictMode: false,
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
