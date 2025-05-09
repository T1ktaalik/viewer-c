import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts', // Your entry file
  output: {
    file: 'dist/bimViewerLib.js', // Output file
    format: 'esm', // Can be 'esm', 'cjs', 'iife', etc.
    sourcemap: true // Generate sourcemaps
  },
  plugins: [
    resolve(), // Resolves node_modules imports
    commonjs(), // Converts CommonJS to ES modules
    typescript() // Handles TypeScript compilation
  ]
};