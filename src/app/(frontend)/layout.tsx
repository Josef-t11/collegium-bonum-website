// src/app/(frontend)/layout.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script' // Import pro optimalizované načítání skriptů
import '@/styles/app.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Jako Ops inženýr oddělujeme monitoring produkce od vývoje
  const isProd = process.env.NODE_ENV === 'production';

  return (
    <html lang="cs">
      <body className="antialiased min-h-screen flex flex-col bg-white text-slate-900">

        {/* 
          DYNATRACE RUM (Real User Monitoring) 
          Aktivní pouze v produkci, aby se předešlo šumu v datech z localhostu.
          strategy="afterInteractive" zajistí, že tag neblokuje vykreslení stránky.
        */}
        {isProd && (
          <Script
            type="text/javascript" src="https://dok.js-cdn.dynatrace.com/jstag/193010ae318/bf76321nss/3da99c1a43a50125_complete.js"
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}

        {/* Naše nová hlavička */}
        <Header />

        {/* Hlavní obsah webu */}
        <main id="main-content" className="flex-grow">
          {children}
        </main>

        {/* Naše nová patička */}
        <Footer />
      </body>
    </html>
  )
}