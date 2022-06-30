import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue(), eslint()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {},
  },
  server: {
    port: 5200,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/v': {
        target: 'http://10.186.62.5:10000/',
      },
    },
    cors: true,
  },
});
