import { PortableText } from '@portabletext/react'

export default function PortableTextComponent({ value }: { value: any }) {
  // OCHRANA: Pokud data (value) chybí nebo nejsou polem, nic nevykresluj.
  // Zabrání to pádu aplikace na chybě "_rev".
  if (!value || !Array.isArray(value)) {
    return null
  }

  return (
    <div className="prose prose-slate max-w-none prose-headings:font-black prose-a:text-blue-600">
      <PortableText value={value} />
    </div>
  )
}