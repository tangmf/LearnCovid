import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        learn: 'learn.html',
        quiz: 'quiz.html',
        stats: 'stats.html',
        game: 'game.html',
        end: 'end.html',
        highscores: 'highscores.html'
      }
    }
  },
  server: {
    port: 3000
  }
});