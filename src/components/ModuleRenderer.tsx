// src/components/ModuleRenderer.tsx

import React from 'react';
// Zde budeme importovat všechny frontend komponenty modulů, jak je budeme tvořit.
// Prozatím máme jen placeholder pro Hero, dokud ho nevytvoříme v dalším kroku.

// Mapování typů ze Sanity na React komponenty
const ModuleComponents: Record<string, React.ElementType> = {
	'hero-module': ({ data }: { data: any }) => <div className="p-8 bg-blue-100 text-blue-800">Hero component is coming soon! Title: {data.title}</div>,
	// Zde přidáme 'richtext-module', 'accordion-list' atd. později.
};

interface ModuleRendererProps {
	modules?: any[];
}

export default function ModuleRenderer({ modules }: ModuleRendererProps) {
	if (!modules || modules.length === 0) {
		return <p className="text-center py-12">Administrátor zatím nepřidal žádné moduly na tuto stránku.</p>;
	}

	return (
		<>
			{modules.map((module) => {
				const Component = ModuleComponents[module._type];
				if (!Component) {
					console.warn(`Missing React component for module type: ${module._type}`);
					return null;
				}
				// Každý modul dostane svá data jako prop 'data'
				return <Component key={module._key} data={module} />;
			})}
		</>
	);
}
