/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ... seus arquivos
  ],
  theme: {
    extend: {
      screens: {
    
        'desktop-s': '992px', 
        
        // Breakpoint PADRÃO:
        // 'lg': '1024px',

        // 💡 BREAKPOINT 2: ENTRE XL e 2XL (Exemplo: 1400px)
        'xl-plus': '1400px',

        // Breakpoint PADRÃO:
        'xl': '1280px',
        // '2xl': '1536px',
      },
      // ... outras extensões
    },
  },
  plugins: [],
}