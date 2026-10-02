"use client";

import Link from "next/link";
import { Search, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

function MovieCard({ movie }) {
	return (
		<Link href={`/peliculas/${movie.id}`} className="group block min-w-0">
			<div className="relative aspect-2/3 overflow-hidden rounded-xl border border-[#214457] bg-[#163346] shadow-lg shadow-[#061a2a]/20">
				<img src={movie.image} alt={`Poster de ${movie.title}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
			</div>
			<div className="pt-3"><h3 className="truncate text-sm font-semibold text-[#eaf5f3]">{movie.title}</h3><div className="mt-1 flex items-center justify-between gap-2 text-xs text-[#86a5ad]"><span>{movie.year} · {movie.genre}</span><span className="flex shrink-0 items-center gap-1 text-[#f6c85f]"><Star className="h-3 w-3 fill-current" />{movie.rating}</span></div><p className="mt-3 line-clamp-3 text-xs leading-5 text-[#b9ced1]">{movie.description}</p></div>
		</Link>
	);
}

function FeaturedMovieCard({ movie }) {
	return (
		<Link href={`/peliculas/${movie.id}`} className="flex gap-4 rounded-2xl border border-[#214457] bg-[#0d2a3c] p-4 transition hover:border-[#19c5a5]">
			<img src={movie.image} alt={`Poster de ${movie.title}`} className="h-28 w-20 shrink-0 rounded-lg object-cover" />
			<div className="min-w-0"><p className="text-xs font-medium uppercase tracking-wide text-[#19c5a5]">Película destacada</p><h3 className="mt-1 truncate text-base font-bold text-white">{movie.title}</h3><p className="mt-1 text-xs text-[#9bb4bb]">{movie.year} · {movie.genre}</p><p className="mt-3 flex items-center gap-1 text-sm font-semibold text-[#f6c85f]"><Star className="h-4 w-4 fill-current" />{movie.rating}</p></div>
		</Link>
	);
}

export default function Peliculas() {
	const [movies, setMovies] = useState([]);
	const [search, setSearch] = useState("");
	const [genre, setGenre] = useState("");

	useEffect(() => {
		const params = new URLSearchParams();
		if (search) params.set("search", search);
		if (genre) params.set("genre", genre);

		fetch(`/api/peliculas?${params.toString()}`)
			.then((response) => response.json())
			.then(setMovies);
	}, [search, genre]);

	const genres = ["Acción", "Drama", "Fantasía", "Suspenso", "Animación", "Historia"];

	return (
		<main className="min-h-screen bg-[#102f43] text-[#eaf5f3]">
			<nav className="bg-[#102f43] text-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"><Link href="/" className="text-xl font-bold tracking-tight">cine<span className="text-[#19c5a5]">.</span></Link><div className="hidden items-center gap-8 text-sm text-[#b9ced1] md:flex"><Link href="/peliculas" className="text-white">Películas</Link><a href="#generos" className="transition hover:text-white">Géneros</a></div><div className="flex items-center gap-2 text-sm text-[#b9ced1]"><Search className="h-4 w-4" />Catálogo</div></div></nav>
			<section className="bg-[#163f52] px-5 pb-16 pt-12 text-center text-white sm:px-8 sm:pt-16"><div className="mx-auto max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#19c5a5]">Descubre tu próxima historia</p><h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Tu cartelera, más simple</h1><p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#b9ced1]">Encuentra películas, conoce sus detalles y descubre las mejor calificadas.</p></div></section>
			<section className="mx-auto grid max-w-5xl gap-4 px-5 py-8 sm:grid-cols-3 sm:px-8"><div className="rounded-lg bg-[#19c5a5] p-5 text-[#07202c]"><p className="text-2xl font-bold">{movies.length || 8}</p><p className="mt-1 text-sm font-medium">Películas disponibles</p></div><div className="rounded-lg bg-[#19c5a5] p-5 text-[#07202c]"><p className="text-2xl font-bold">6</p><p className="mt-1 text-sm font-medium">Géneros para explorar</p></div><div className="rounded-lg bg-[#19c5a5] p-5 text-[#07202c]"><p className="text-2xl font-bold">8.8</p><p className="mt-1 text-sm font-medium">Calificación más alta</p></div></section>
			<section id="generos" className="mx-auto max-w-7xl px-5 pb-20 pt-4 sm:px-8"><div className="mb-8"><h2 className="text-2xl font-bold text-white sm:text-3xl">Explora películas</h2><p className="mt-2 text-sm text-[#9bb4bb]">Busca por título o filtra por género.</p></div><div className="mb-8 flex flex-col gap-4 sm:flex-row"><label className="flex flex-1 items-center gap-3 rounded-lg border border-[#315365] bg-[#0d2a3c] px-4 py-3"><Search className="h-4 w-4 text-[#19c5a5]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar una película" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#70909a]" /></label><div className="flex gap-2 overflow-x-auto pb-1 text-sm"><button type="button" onClick={() => setGenre("")} className={`shrink-0 rounded-full px-4 py-2 font-semibold ${!genre ? "bg-[#19c5a5] text-[#07202c]" : "border border-[#315365] text-[#9bb4bb]"}`}>Todas</button>{genres.map((item) => <button type="button" key={item} onClick={() => setGenre(item)} className={`shrink-0 rounded-full px-4 py-2 ${genre === item ? "bg-[#19c5a5] font-semibold text-[#07202c]" : "border border-[#315365] text-[#9bb4bb]"}`}>{item}</button>)}</div></div><div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div>{movies.length === 0 && <p className="py-16 text-center text-[#9bb4bb]">No encontramos películas con esos criterios.</p>}</section>
			<section className="border-t border-[#183c4e] bg-[#0a2435] px-5 py-16 sm:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#19c5a5]">Selección de la semana</p><h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Películas destacadas</h2><Carousel opts={{ align: "start", loop: true }} className="mt-8 px-10"><CarouselContent className="-ml-4">{movies.slice(0, 4).map((movie) => <CarouselItem key={movie.id} className="basis-full pl-4 md:basis-1/2"><FeaturedMovieCard movie={movie} /></CarouselItem>)}</CarouselContent><CarouselPrevious aria-label="Película anterior" className="left-0 border-[#315365] bg-[#12354a] text-white hover:bg-[#19c5a5]" /><CarouselNext aria-label="Película siguiente" className="right-0 border-[#315365] bg-[#12354a] text-white hover:bg-[#19c5a5]" /></Carousel></div></section>
		</main>
	);
}
