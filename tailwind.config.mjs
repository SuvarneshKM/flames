/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        flames: {
          f: "#00FF00",
          l: "#FF0000",
          a: "#FFC0CB",
          m: "#FFD700",
          e: "#FF4500",
          s: "#ADD8E6",
        },
      },
    },
  },
  plugins: [],
};
