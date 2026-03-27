import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 500,
    // CSS code splitting
    cssCodeSplit: true,
    // Source map for production (set to false for smaller builds)
    sourcemap: false,
    // Target modern browsers
    target: 'esnext',
    rollupOptions: {
      output: {
        // Asset file naming
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]'
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
        // Manual chunks function for Rolldown compatibility
        manualChunks(id, { getModuleInfo }) {
          // Vendor chunks - separate large dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react') && !id.includes('react-icons')) {
              return 'vendor-react'
            }
            if (id.includes('react-router')) {
              return 'vendor-router'
            }
            if (id.includes('react-icons')) {
              return 'vendor-icons'
            }
            if (id.includes('zustand')) {
              return 'vendor-zustand'
            }
            if (id.includes('axios')) {
              return 'vendor-axios'
            }
            return 'vendor'
          }
          
          // Feature-based chunks for source files
          if (id.includes('/src/components/')) {
            if (id.includes('Header') || id.includes('Notification')) {
              return 'components-ui'
            }
            if (id.includes('RegistrationForm') || id.includes('StatusChecker')) {
              return 'components-forms'
            }
            if (id.includes('Dashboard')) {
              return 'components-dashboard'
            }
          }
          
          if (id.includes('/src/pages/')) {
            if (id.includes('Home')) {
              return 'pages-main'
            }
            if (id.includes('Register') || id.includes('Status')) {
              return 'pages-forms'
            }
          }
          
          if (id.includes('/src/stores/')) {
            return 'state-management'
          }
          
          if (id.includes('/src/services/')) {
            return 'api-services'
          }
          
          return undefined
        },
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'zustand', 'axios'],
    exclude: ['react-icons/fi'],
  },
})
