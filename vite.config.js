import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

  // "dev": "vite",
    // "test": "jest",
    // "build": "vite build",
    // "lint": "eslint .",
    // "preview": "vite preview",

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@module': path.resolve(__dirname, 'src/module'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@routes': path.resolve(__dirname, 'src/lib'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@form': path.resolve(__dirname, 'src/form'),

      '@features': path.resolve(__dirname, 'src/features'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom', // Suitable for testing React components
    setupFiles: './vitest.setup.js', // Path to your setup file

  },
})
