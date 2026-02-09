import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/app.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body className="antialiased min-h-screen flex flex-col bg-white text-slate-900">
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