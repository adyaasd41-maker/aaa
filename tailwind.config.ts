import type { Config } from 'tailwindcss';
export default { darkMode:'class', content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'], theme:{extend:{fontFamily:{sans:['Inter','ui-sans-serif','system-ui']}, borderRadius:{'2xl':'1rem','3xl':'1.5rem'}, boxShadow:{soft:'0 16px 50px rgba(15,23,42,.08)'}}}, plugins:[] } satisfies Config;
