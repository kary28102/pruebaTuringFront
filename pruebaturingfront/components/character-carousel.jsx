"use client";

import MediaCarousel from "@/components/media-carousel";

const defaultCharacters = [
	{
		id: "mara",
		name: "Mara Solís",
		role: "La exploradora",
		image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=640&q=80",
	},
	{
		id: "leo",
		name: "Leo Valdés",
		role: "El estratega",
		image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80",
	},
	{
		id: "ines",
		name: "Inés Duarte",
		role: "La visionaria",
		image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=640&q=80",
	},
	{
		id: "tomas",
		name: "Tomás Ríos",
		role: "El inconforme",
		image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=640&q=80",
	},
];

export default function CharacterCarousel({ characters = defaultCharacters, className, circularImages = false }) {
	return <MediaCarousel id="personajes" items={characters.map((character) => ({ ...character, title: character.name, subtitle: character.role, alt: `Retrato de ${character.name}` }))} eyebrow="Historias que dejan huella" title="Conoce a los personajes" description="Descubre a quienes hacen que cada película sea inolvidable." ariaLabel="Personajes" className={className} imageShape={circularImages ? "circle" : "default"} cardClassName={circularImages ? "text-center" : ""} itemsPerView={3} />;
}
