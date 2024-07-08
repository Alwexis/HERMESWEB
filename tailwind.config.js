/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        fira: ["Fira Code", "monospace"],
        "ibm-mono": ["IBM Plex Mono", "monospace"]
      },
      backgroundImage: {
        'primary': "url('/endless-constellation.svg')",
      }
    },
  },
  plugins: [],
}

