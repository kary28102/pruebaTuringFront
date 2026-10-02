import { notFound } from "next/navigation";
import PeliculaInformacion from "../peliculasinformacion";

const API_URL = process.env.PELICULAS_API_URL ?? "http://localhost:8000/peliculas/";

export default async function MovieDetailPage({ params }) {
	const { id } = await params;
	const response = await fetch(`${API_URL.replace(/\/$/, "")}/${id}/`, { cache: "no-store" });

	if (response.status === 404) {
		notFound();
	}

	if (!response.ok) {
		throw new Error("No se pudo obtener la película.");
	}

	const data = await response.json();
	const movie = {
		id: data.id,
		title: data.title ?? data.titulo ?? data.nombre ?? "Sin título",
		genre: data.genre ?? data.genero ?? "Sin género",
		year: data.year ?? data.anio ?? data.año ?? "",
		rating: data.rating ?? data.calificacion ?? data.puntuacion ?? 0,
		description: data.description ?? data.descripcion ?? data.sinopsis ?? "Sin descripción disponible.",
		image: data.image ?? data.imagen ?? data.poster ?? data.url_imagen ?? "",
	};

	return <PeliculaInformacion movie={movie} />;
}