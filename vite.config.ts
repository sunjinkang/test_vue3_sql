import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  server: {
    port: 5200,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/v': {
        target: 'http://10.186.62.39:10000',
      },
    },
    cors: true,
  },
});
