/** @type {import('next').NextConfig}  */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  // env: {
  //   development: {
  //     presets: ['next/babel'],
  //     plugins: [
  //       [
  //         'babel-plugin-styled-components',
  //         { ssr: true, displayName: true, preprocess: false },
  //       ],
  //     ],
  //   },
  //   production: {
  //     plugins: [
  //       [
  //         'babel-plugin-styled-components',
  //         { ssr: true, displayName: true, preprocess: false },
  //       ],
  //     ],
  //     presets: ['next/babel'],
  //   },
  //   test: {
  //     presets: ['next/babel'],
  //   },
  // },
  // plugins: [
  //   [
  //     'babel-plugin-styled-components',
  //     { ssr: true, displayName: true, preprocess: false },
  //   ],
  // ],
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
