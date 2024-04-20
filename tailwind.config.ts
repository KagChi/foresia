import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true
      },
      extend: {
        objectPosition: {
          "85-15": "85% 15%"
        },
        fontFamily: {
          baloo: ["var(--font-baloo)"]
        }
      }
    },
  },
  plugins: [],
};
export default config;
