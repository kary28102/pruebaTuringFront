import { notFound } from "next/navigation";
import { movies } from "@/lib/movies";
import PeliculaInformacion from "../peliculasinformacion";

export function generateStaticParams() {
	return movies.map((movie) => ({ id: String(movie.id) }));
}

export default async function MovieDetailPage({ params }) {
	const { id } = await params;
	const movie = movies.find((item) => String(item.id) === id);

	if (!movie) {
		notFound();
	}

	return <PeliculaInformacion movie={movie} />;
}