const API_URL = process.env.PELICULAS_API_URL ?? "http://localhost:8000/peliculas/"

function normalizeMovie(movie) {
	return {
		id: movie.id,
		title: movie.title ?? movie.titulo ?? movie.nombre ?? "Sin título",
		genre: movie.genre ?? movie.genero ?? "Sin género",
		year: movie.year ?? movie.anio ?? movie.año ?? "",
		rating: movie.rating ?? movie.calificacion ?? movie.puntuacion ?? 0,
		description: movie.description ?? movie.descripcion ?? movie.sinopsis ?? "Sin descripción disponible.",
		image: movie.image ?? movie.imagen ?? movie.poster ?? movie.url_imagen ?? "",
	}
}

export function GET(request) {
	return fetch(API_URL, { cache: "no-store" })
		.then(async (response) => {
			if (!response.ok) {
				return Response.json({ error: "No se pudieron obtener las películas." }, { status: response.status })
			}

			const data = await response.json()
			const movies = Array.isArray(data) ? data.map(normalizeMovie) : data.peliculas?.map(normalizeMovie) ?? []
			const { searchParams } = new URL(request.url)
			const search = searchParams.get("search")?.trim().toLowerCase() ?? ""
			const genre = searchParams.get("genre")?.trim().toLowerCase() ?? ""
			const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(search) && (!genre || movie.genre.toLowerCase() === genre))

			return Response.json(filteredMovies)
		})
		.catch(() => Response.json({ error: "No se pudo conectar con el servidor de películas." }, { status: 502 }))
}