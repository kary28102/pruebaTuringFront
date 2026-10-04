"use client";

import Link from "next/link";
import { Pencil, Plus, Search, ShieldCheck, Trash2, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AppSidebar from "@/components/appSidebar";
import SiteFooter from "@/components/site-footer";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Personaje() {
	const [characters, setCharacters] = useState([]);
	const [search, setSearch] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadCharacters() {
			try {
				const response = await fetch("/api/personajes", { cache: "no-store" });
				const data = await response.json().catch(() => null);
				if (!response.ok) throw new Error(data?.error ?? "No se pudieron consultar los personajes.");
				setCharacters(Array.isArray(data) ? data : []);
			} catch (requestError) {
				setError(requestError instanceof Error ? requestError.message : "No se pudieron consultar los personajes.");
			} finally {
				setLoading(false);
			}
		}

		loadCharacters();
	}, []);

	const filteredCharacters = useMemo(() => {
		const query = search.trim().toLowerCase();
		return characters.filter((character) => `${character.name} ${character.role} ${character.movieId}`.toLowerCase().includes(query));
	}, [characters, search]);

	async function deleteCharacter(character) {
		if (!window.confirm(`¿Seguro que deseas eliminar a "${character.name}"? Esta acción no se puede deshacer.`)) return;

		try {
			const token = localStorage.getItem("access_token");
			const response = await fetch(`/api/personajes/${character.id}`, {
				method: "DELETE",
				headers: token ? { Authorization: `Bearer ${token}` } : {},
			});
			const data = await response.json().catch(() => null);
			if (!response.ok) throw new Error(data?.error ?? "No se pudo eliminar el personaje.");
			setCharacters((current) => current.filter((item) => item.id !== character.id));
			setError("");
		} catch (requestError) {
			setError(requestError instanceof Error ? requestError.message : "No se pudo eliminar el personaje.");
		}
	}

	return (
		<AppSidebar>
			<main className="min-h-screen bg-[#163f52] text-[#eaf5f3]">
				<section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
					<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
						<div>
							<div className="flex items-center gap-2 text-sm font-semibold text-[#19c5a5]"><ShieldCheck className="h-4 w-4" />Administración</div>
							<h1 className="mt-2 text-3xl font-bold text-white">Administrar personajes</h1>
							<p className="mt-2 max-w-xl text-sm text-[#9bb4bb]">Agrega y modifica los personajes relacionados con cada película.</p>
						</div>
						<div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
							<Label className="w-full rounded-lg border border-[#315365] bg-[#0d2a3c] px-4 py-3 sm:w-80">
								<Search className="h-4 w-4 text-[#19c5a5]" />
								<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar personaje" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#70909a]" />
							</Label>
							<Link href="/admin/personajes/nuevo" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#19c5a5] px-4 py-3 text-sm font-bold text-[#092536] transition hover:bg-[#43d8bd]"><Plus className="h-4 w-4" />Nuevo personaje</Link>
						</div>
					</div>

					<div className="mt-8 overflow-x-auto rounded-2xl border border-[#315365] bg-[#0d2a3c] shadow-2xl shadow-[#061a2a]/20">
						{error && <p className="border-b border-[#b85c5c] px-5 py-4 text-sm text-[#f2aaaa]" role="alert">{error}</p>}
						{loading && <p className="px-5 py-12 text-center text-[#9bb4bb]">Cargando personajes...</p>}
						<Table className="text-left text-sm">
							<TableHeader className="border-b border-[#214457] bg-[#163346] text-xs uppercase tracking-wide text-[#9bb4bb]">
								<TableRow>
                                    <TableHead className="px-4 py-4 font-semibold sm:px-5">Personaje</TableHead>
                                    <TableHead className="px-4 py-4 font-semibold sm:px-5">Película</TableHead>
                                    <TableHead className="px-4 py-4 text-right font-semibold sm:px-5">Acciones</TableHead>
                                </TableRow>
							</TableHeader>
							<TableBody className="divide-y divide-[#214457]">
								{filteredCharacters.map((character) => (
									<TableRow key={character.id} className="text-[#b9ced1]">
										<TableCell className="min-w-48 px-3 py-3 sm:px-5"><div className="flex items-center gap-3">{character.image ? <img src={character.image} alt="" className="h-12 w-12 rounded-full object-cover" /> : <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#163346]"><UserRound className="h-5 w-5 text-[#19c5a5]" /></div>}<span className="font-semibold text-white">{character.name}</span></div></TableCell>
										<TableCell className="px-3 py-3 sm:px-5">{character.movieId || "—"}</TableCell>
										<TableCell className="px-3 py-3 text-right sm:px-5"><div className="flex justify-end gap-2"><Link href={`/admin/personajes/${character.id}`} aria-label={`Editar ${character.name}`} title="Editar personaje" className="inline-flex items-center gap-2 rounded-lg border border-[#315365] px-2.5 py-2 text-xs font-semibold text-[#eaf5f3] transition hover:border-[#19c5a5] hover:text-[#19c5a5] sm:px-3"><Pencil className="h-3.5 w-3.5" /><span className="hidden lg:inline">Editar</span></Link><button type="button" onClick={() => deleteCharacter(character)} aria-label={`Eliminar ${character.name}`} title="Eliminar personaje" className="inline-flex items-center gap-2 rounded-lg border border-[#b85c5c] px-2.5 py-2 text-xs font-semibold text-[#f2aaaa] transition hover:bg-[#b85c5c]/15 sm:px-3"><Trash2 className="h-3.5 w-3.5" /><span className="hidden lg:inline">Eliminar</span></button></div></TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						{!loading && filteredCharacters.length === 0 && <p className="px-5 py-12 text-center text-[#9bb4bb]">No encontramos personajes.</p>}
					</div>
				</section>
				<SiteFooter />
			</main>
		</AppSidebar>
	);
}
