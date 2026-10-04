"use client";

import { ArrowLeft, ExternalLink, Film, Pencil, Plus, Search, ShieldCheck, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AppSidebar from "@/components/appSidebar";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SiteFooter from "@/components/site-footer";

export default function PeliculasInformacion() {
	const [movies, setMovies] = useState([]);
	const [search, setSearch] = useState("");
	const [genre, setGenre] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadMovies() {
			try {
				const response = await fetch("/api/peliculas", { cache: "no-store" });
				const data = await response.json().catch(() => null);

				if (!response.ok) {
					throw new Error(data?.error ?? "No se pudieron consultar las películas.");
				}

				setMovies(Array.isArray(data) ? data : []);
			} catch (requestError) {
				setError(requestError instanceof Error ? requestError.message : "No se pudieron consultar las películas.");
			} finally {
				setLoading(false);
			}
		}

		loadMovies();
	}, []);

	const genres = useMemo(() => [...new Set(movies.map((movie) => movie.genre).filter(Boolean))].sort(), [movies]);
	const filteredMovies = useMemo(() => {
		const query = search.trim().toLowerCase();

		return movies.filter((movie) => {
			const matchesSearch = `${movie.title} ${movie.genre} ${movie.year}`.toLowerCase().includes(query);
			const matchesGenre = !genre || movie.genre === genre;
			return matchesSearch && matchesGenre;
		});
	}, [genre, movies, search]);

	async function deleteMovie(movie) {
		if (!window.confirm(`¿Seguro que deseas eliminar "${movie.title}"? Esta acción no se puede deshacer.`)) return;

		try {
			const token = localStorage.getItem("access_token");
			const response = await fetch(`/api/peliculas/${movie.id}`, {
				method: "DELETE",
				headers: token ? { Authorization: `Bearer ${token}` } : {},
			});
			const data = await response.json().catch(() => null);

			if (!response.ok) {
				throw new Error(data?.error ?? "No se pudo eliminar la película.");
			}

			setMovies((currentMovies) => currentMovies.filter((currentMovie) => currentMovie.id !== movie.id));
			setError("");
		} catch (requestError) {
			setError(requestError instanceof Error ? requestError.message : "No se pudo eliminar la película.");
		}
	}

	return (
		<AppSidebar>
			<main className="min-h-screen bg-[#163f52] text-[#eaf5f3]">
				<section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
					<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
						<div>
							<div className="flex items-center gap-2 text-sm font-semibold text-[#19c5a5]">
								<ShieldCheck className="h-4 w-4" />Administración
							</div>
							<h1 className="mt-2 text-3xl font-bold text-white">Administrar películas</h1>
							<p className="mt-2 max-w-xl text-sm text-[#9bb4bb]">Consulta el catálogo y revisa la información de cada película.</p>
						</div>
						<div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
							<Label className="w-full rounded-lg border border-[#315365] bg-[#0d2a3c] px-4 py-3 sm:w-80">
								<Search className="h-4 w-4 text-[#19c5a5]" />
								<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar película" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#70909a]" />
							</Label>
							<Link href="/admin/peliculas/nueva" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#19c5a5] px-4 py-3 text-sm font-bold text-[#092536] transition hover:bg-[#43d8bd]">
								<Plus className="h-4 w-4" />Nueva película
							</Link>
						</div>
					</div>

					{genres.length > 0 && (
						<div className="mt-6 flex gap-2 overflow-x-auto pb-1">
							<button type="button" onClick={() => setGenre("")} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${!genre ? "bg-[#19c5a5] text-[#07202c]" : "border border-[#315365] text-[#9bb4bb]"}`}>
								Todas
							</button>
							{genres.map((item) => (
								<button type="button" key={item} onClick={() => setGenre(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm ${genre === item ? "bg-[#19c5a5] font-semibold text-[#07202c]" : "border border-[#315365] text-[#9bb4bb]"}`}>
									{item}
								</button>
							))}
						</div>
					)}

					<div className="mt-8 overflow-x-auto rounded-2xl border border-[#315365] bg-[#0d2a3c] shadow-2xl shadow-[#061a2a]/20">
						{error && <p className="border-b border-[#b85c5c] px-5 py-4 text-sm text-[#f2aaaa]" role="alert">{error}</p>}
						{loading && <p className="px-5 py-12 text-center text-[#9bb4bb]">Cargando películas...</p>}
						<Table className="text-left text-sm">
							<TableHeader className="border-b border-[#214457] bg-[#163346] text-xs uppercase tracking-wide text-[#9bb4bb]">
								<TableRow>
									<TableHead className="px-4 py-4 font-semibold sm:px-5">Película</TableHead>
									<TableHead className="px-4 py-4 font-semibold sm:px-5">Género</TableHead>
									<TableHead className="px-4 py-4 font-semibold sm:px-5">Año</TableHead>
									<TableHead className="px-4 py-4 font-semibold sm:px-5">Calificación</TableHead>
									<TableHead className="px-4 py-4 text-right font-semibold sm:px-5">Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className="divide-y divide-[#214457]">
								{filteredMovies.map((movie) => (
									<TableRow key={movie.id} className="text-[#b9ced1]">
										<TableCell className="min-w-56 px-3 py-3 sm:px-5">
											<div className="flex items-center gap-3">
												{movie.image ? <img src={movie.image} alt="" className="h-14 w-10 rounded object-cover" /> : <div className="flex h-14 w-10 items-center justify-center rounded bg-[#163346]"><Film className="h-4 w-4 text-[#19c5a5]" /></div>}
												<span className="font-semibold text-white">{movie.title}</span>
											</div>
										</TableCell>
										<TableCell className="px-3 py-3 sm:px-5">{movie.genre}</TableCell>
										<TableCell className="px-3 py-3 sm:px-5">{movie.year || "—"}</TableCell>
										<TableCell className="px-3 py-3 sm:px-5"><span className="flex items-center gap-1 text-[#f6c85f]"><Star className="h-4 w-4 fill-current" />{movie.rating}</span></TableCell>
										<TableCell className="px-3 py-3 text-right sm:px-5">
											<div className="flex justify-end gap-2">
												<Link href={`/peliculas/${movie.id}`} aria-label={`Ver información de ${movie.title}`} title="Ver película" className="inline-flex items-center gap-2 rounded-lg border border-[#315365] px-2.5 py-2 text-xs font-semibold text-[#eaf5f3] transition hover:border-[#19c5a5] hover:text-[#19c5a5] sm:px-3">
													<ExternalLink className="h-3.5 w-3.5" /><span className="hidden lg:inline">Ver</span>
												</Link>
												<Link href={`/admin/peliculas/${movie.id}`} aria-label={`Editar ${movie.title}`} title="Editar película" className="inline-flex items-center gap-2 rounded-lg border border-[#315365] px-2.5 py-2 text-xs font-semibold text-[#eaf5f3] transition hover:border-[#19c5a5] hover:text-[#19c5a5] sm:px-3">
													<Pencil className="h-3.5 w-3.5" /><span className="hidden lg:inline">Editar</span>
												</Link>
												<button type="button" onClick={() => deleteMovie(movie)} aria-label={`Eliminar ${movie.title}`} title="Eliminar película" className="inline-flex items-center gap-2 rounded-lg border border-[#b85c5c] px-2.5 py-2 text-xs font-semibold text-[#f2aaaa] transition hover:bg-[#b85c5c]/15 sm:px-3">
													<Trash2 className="h-3.5 w-3.5" /><span className="hidden lg:inline">Eliminar</span>
												</button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						{!loading && filteredMovies.length === 0 && <p className="px-5 py-12 text-center text-[#9bb4bb]">No encontramos películas.</p>}
					</div>

					<Link href="/admin" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#b9ced1] transition hover:text-white">
						<ArrowLeft className="h-4 w-4" />Volver al panel
					</Link>
				</section>
				<SiteFooter />
			</main>
		</AppSidebar>
	);
}