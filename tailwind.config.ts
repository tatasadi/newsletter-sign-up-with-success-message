import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          tomato: "hsl(4, 100%, 67%)",
          orange: "hsl(15, 100%, 61%)",
          pink: "hsl(346, 100%, 66%)",
        },
        neutral: {
          "dark-slate-grey": "hsl(234, 29%, 20%)",
          "charcoal-grey": "hsl(235, 18%, 26%)",
          grey: "hsl(231, 7%, 60%)",
          "gray-25": "hsla(243, 28%, 13%, 0.25)",
        },
      },
    },
  },
  plugins: [],
}
export default config
