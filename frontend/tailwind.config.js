/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Glassmorphism colors
        'glass-bg': 'rgba(255, 255, 255, 0.1)',
        'glass-bg-strong': 'rgba(255, 255, 255, 0.15)',
        'glass-border': 'rgba(255, 255, 255, 0.2)',
        'glass-border-strong': 'rgba(255, 255, 255, 0.3)',
        
        // User message colors (purple theme)
        'user-primary': '#8B5CF6',
        'user-secondary': '#A78BFA',
        'user-accent': '#C4B5FD',
        'user-text': '#FFFFFF',
        
        // AI message colors (white/transparent theme)
        'ai-bg': 'rgba(255, 255, 255, 0.1)',
        'ai-bg-hover': 'rgba(255, 255, 255, 0.15)',
        'ai-border': 'rgba(255, 255, 255, 0.2)',
        'ai-text': '#FFFFFF',
        'ai-text-secondary': 'rgba(255, 255, 255, 0.7)',
        
        // Gradient background colors
        'gradient-start': '#667eea',
        'gradient-middle': '#764ba2',
        'gradient-end': '#f093fb',
        
        // Status colors with transparency
        'success-bg': 'rgba(34, 197, 94, 0.1)',
        'success-border': 'rgba(34, 197, 94, 0.3)',
        'error-bg': 'rgba(239, 68, 68, 0.1)',
        'error-border': 'rgba(239, 68, 68, 0.3)',
        'warning-bg': 'rgba(245, 158, 11, 0.1)',
        'warning-border': 'rgba(245, 158, 11, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'glassmorphism': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 12px 40px 0 rgba(31, 38, 135, 0.4)',
        'user-message': '0 4px 16px 0 rgba(139, 92, 246, 0.3)',
        'ai-message': '0 4px 16px 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-dots': 'bounceDots 1.4s ease-in-out infinite both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceDots: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
    },
  },
  plugins: [],
}