import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    gap: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "56px",
    },
    colors: {
      primary: {
        "40": "rgba(0, 125, 255, 0.4)",
        "80": "rgba(0, 125, 255, 0.8)",
        "100": "rgba(0, 125, 255, 1)",
      },
      error: "#FF0B18",
      success: "#00CA48",
      warning: "#FC9828",
      secondary: "#F3F4FA",
      neutral: {
        "0": "rgba(255, 255, 255, 1);",
        "10": "rgba(0, 0, 0, 0.1);",
        "20": "rgba(0, 0, 0, 0.2);",
        "40": "rgba(0, 0, 0, 0.4);",
        "100": "rgba(0, 0, 0, 1);",
      },
    },
    extend: {
      borderRadius: {
        lg: "30px",
        md: "20px",
        sm: "10px",
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
