import { movies } from "@/lib/movies"

export function GET(request) {
	const { searchParams } = new URL(request.url)
	const search = searchParams.get("search")?.trim().toLowerCase() ?? ""
	const genre = searchParams.get("genre")?.trim().toLowerCase() ?? ""

	const filteredMovies = movies.filter((movie) => {
		const matchesSearch = movie.title.toLowerCase().includes(search)
		const matchesGenre = !genre || movie.genre.toLowerCase() === genre
		return matchesSearch && matchesGenre
	})

	return Response.json(filteredMovies)
}