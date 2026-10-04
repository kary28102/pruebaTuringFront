"use client";

import { ArrowLeft, Save, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppSidebar from "@/components/appSidebar";
import SiteFooter from "@/components/site-footer";

const emptyMovie = { title: "", genre: "", year: "", rating: "", description: "", image: "" };

export default function PeliculaForm({ editing = false }) {
	const params = useParams();
	const router = useRouter();
	const [draft, setDraft] = useState(emptyMovie);
	const [loaded, setLoaded] = useState(!editing);
	const [error, setError] = useState("");
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		if (!editing) return;

		async function loadMovie() {
			try {
				const token = localStorage.getItem("access_token");
				const response = await fetch(`/api/peliculas/${params.id}`, {
					headers: token ? { Authorization: `Bearer ${token}` } : {},
					cache: "no-store",
				});
				const data = await response.json().catch(() => null);
				if (!response.ok) throw new Error(data?.error ?? "No se pudo consultar la película.");
				setDraft({
					title: data.title ?? data.titulo ?? data.nombre ?? "",
					genre: data.genre ?? data.genero ?? "",
					year: data.year ?? data.anio ?? "",
					rating: data.rating ?? data.calificacion ?? data.puntuacion ?? "",
					description: data.description ?? data.descripcion ?? data.sinopsis ?? "",
					image: data.image ?? data.imagen ?? data.poster ?? data.url_imagen ?? "",
				});
			} catch (requestError) {
				setError(requestError instanceof Error ? requestError.message : "No se pudo consultar la película.");
			} finally {
				setLoaded(true);
			}
		}

		loadMovie();
	}, [editing, params.id]);

	async function saveMovie(event) {
		event.preventDefault();
		if (!draft.title.trim() || !draft.genre.trim()) {
			setError("El título y el género son obligatorios.");
			return;
		}

		setSaving(true);
		setError("");
		try {
			const token = localStorage.getItem("access_token");
			const response = await fetch(editing ? `/api/peliculas/${params.id}` : "/api/peliculas", {
				method: editing ? "PUT" : "POST",
				headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
				body: JSON.stringify({
					titulo: draft.title.trim(),
					genero: draft.genre.trim(),
					anio: draft.year === "" ? null : Number(draft.year),
					calificacion: draft.rating === "" ? null : Number(draft.rating),
					descripcion: draft.description.trim(),
					imagen: draft.image.trim(),
				}),
			});
			const data = await response.json().catch(() => null);
			if (!response.ok) throw new Error(data?.error ?? "No se pudo guardar la película.");
			router.push("/admin/peliculas");
		} catch (requestError) {
			setError(requestError instanceof Error ? requestError.message : "No se pudo guardar la película.");
		} finally {
			setSaving(false);
		}
	}

	if (!loaded) return null;

	return (
		<AppSidebar>
			<main className="min-h-screen bg-[#163f52] text-[#eaf5f3]">
				<section className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
					<div className="flex items-center gap-2 text-sm font-semibold text-[#19c5a5]"><ShieldCheck className="h-4 w-4" />Administración</div>
					<h1 className="mt-2 text-3xl font-bold text-white">{editing ? "Modificar película" : "Nueva película"}</h1>
					<p className="mt-2 text-sm text-[#9bb4bb]">Completa la información que se mostrará en el catálogo.</p>
					<form onSubmit={saveMovie} className="mt-8 space-y-6 rounded-2xl border border-[#315365] bg-[#0d2a3c] p-6 shadow-2xl shadow-[#061a2a]/20 sm:p-8">
						<div className="grid gap-6 sm:grid-cols-2">
							<Field label="Título" value={draft.title} onChange={(value) => setDraft({ ...draft, title: value })} required />
							<Field label="Género" value={draft.genre} onChange={(value) => setDraft({ ...draft, genre: value })} required />
							<Field label="Año" type="number" value={draft.year} onChange={(value) => setDraft({ ...draft, year: value })} />
							<Field label="Calificación" type="number" min="0" max="10" step="0.1" value={draft.rating} onChange={(value) => setDraft({ ...draft, rating: value })} />
						</div>
						<Field label="URL de imagen" type="url" value={draft.image} onChange={(value) => setDraft({ ...draft, image: value })} />
						<label className="block space-y-2 text-sm font-semibold text-[#b9ced1]">Descripción<textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} rows="5" className="w-full rounded-lg border border-[#315365] bg-[#102f43] px-3 py-3 font-normal text-white outline-none transition focus:border-[#19c5a5]" /></label>
						{error && <p className="text-sm text-[#f2aaaa]" role="alert">{error}</p>}
						<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
							<Link href="/admin/peliculas" className="rounded-lg border border-[#315365] px-4 py-3 text-center text-sm font-semibold text-[#b9ced1] transition hover:border-[#19c5a5] hover:text-white">Cancelar</Link>
							<button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#19c5a5] px-4 py-3 text-sm font-bold text-[#092536] transition hover:bg-[#43d8bd] disabled:cursor-not-allowed disabled:opacity-60"><Save className="h-4 w-4" />{saving ? "Guardando..." : "Guardar película"}</button>
						</div>
					</form>
					<Link href="/admin/peliculas" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#b9ced1] transition hover:text-white"><ArrowLeft className="h-4 w-4" />Volver a películas</Link>
				</section>
				<SiteFooter />
			</main>
		</AppSidebar>
		
	);
}

function Field({ label, type = "text", value, onChange, required = false, ...props }) {
	return <label className="block space-y-2 text-sm font-semibold text-[#b9ced1]">{label}<input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-[#315365] bg-[#102f43] px-3 py-3 font-normal text-white outline-none transition focus:border-[#19c5a5]" {...props} /></label>;

}
