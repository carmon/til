import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/index.ts",
  output: {
    file: "../back/static/bundle.js",
    format: "iife",
    name: "lib",
    plugins: [terser()]
  },
  plugins: [
    typescript({ inlineSourceMap: true })
  ],
}
