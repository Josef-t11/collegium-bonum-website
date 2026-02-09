import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { Mail, Phone, MapPin, Facebook } from 'lucide-react'

// Query pro získání kontaktů ze Site Settings
const SITE_SETTINGS_QUERY = groq`*[_type == "site"][0] {
  title,
	description,
  email,
  phone,
  address,
  ico,
  facebook
}`

export default async function Footer() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY)

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        
        {/* Sloupec 1: O sboru */}
        <div>
          <h3 className="text-white text-xl font-black mb-6">
    				{settings?.title || 'Collegium Bonum'}
  				</h3>
          <p className="text-slate-400 leading-relaxed mb-6">
             {/* Teď už dynamicky! Pokud v Sanity nic není, nezobrazí se nic nebo váš nový text. */}
             {settings?.description || 'Text o sboru doplníte v nastavení webu v Sanity.'}
          </p>
          {settings?.facebook && (
            <a href={settings.facebook} target="_blank" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors font-bold">
              <Facebook size={20} /> Sledujte nás na Facebooku
            </a>
          )}
        </div>

        {/* Sloupec 2: Rychlé kontakty */}
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Kontakt</h4>
          <div className="flex items-start gap-3">
            <Mail size={18} className="text-blue-500 mt-1" />
            <a href={`mailto:${settings?.email}`} className="hover:text-white transition-colors">{settings?.email || 'info@collegiumbonum.cz'}</a>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} className="text-blue-500 mt-1" />
            <span>{settings?.phone || '+420 123 456 789'}</span>
          </div>
          <div className="flex items-start gap-3 text-slate-400 text-sm">
            <MapPin size={18} className="text-blue-500 mt-1 flex-shrink-0" />
            <span className="whitespace-pre-line">
    						{settings?.address || 'Adresu doplníte v nastavení webu.'}
  					</span>
          </div>
        </div>

        {/* Sloupec 3: Právní info & Mapa */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Právní informace</h4>
          <p className="text-slate-500 text-sm mb-4 leading-relaxed">
            Spolek zapsaný v obchodním rejstříku.<br />
            IČO: {settings?.ico || '—'}
          </p>
          <div className="text-xs text-slate-600 mt-10">
            © {new Date().getFullYear()} Collegium Bonum. <br />
            Built with Next.js & Sanity.
          </div>
        </div>

      </div>
    </footer>
  )
}