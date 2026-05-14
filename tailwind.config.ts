import type { Config } from "tailwindcss";

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:       { DEFAULT: '#0D0F1A', surface: '#13162A', surface2: '#1A1D35' },
        border:   { DEFAULT: '#2A2D4A' },
        primary:  { DEFAULT: '#378ADD', light: '#85B7EB' },
        gold:     { DEFAULT: '#C9A84C' },
        text:     { DEFAULT: '#FFFFFF', muted: '#8B8FA8', dim: '#5A5E7A' },
        tag: {
          model:    { bg: '#1A2A3A', border: '#2A4A6A', text: '#85B7EB' },
          tools:    { bg: '#0F2A1F', border: '#1A4A30', text: '#5DCAA5' },
          research: { bg: '#1F1A3A', border: '#3A2A6A', text: '#AFA9EC' },
          business: { bg: '#2A1F0A', border: '#4A350A', text: '#EF9F27' },
        }
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      fontSize: {
        hero:    ['64px', { fontWeight: '700', letterSpacing: '-1.5px', lineHeight: '1.1' }],
        section: ['40px', { fontWeight: '600', letterSpacing: '-0.8px' }],
        card:    ['18px', { fontWeight: '600' }],
        body:    ['15px', { lineHeight: '1.7' }],
        caption: ['13px', {}],
        label:   ['11px', { fontWeight: '500', letterSpacing: '0.08em' }],
      },
      borderRadius: { card: '12px', pill: '20px' },
      animation: { 'fade-in': 'fadeIn 300ms ease' },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'none' },
        }
      }
    }
  }
}

export default config;
