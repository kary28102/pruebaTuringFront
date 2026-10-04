"use client";

import Link from "next/link";
import { ArrowLeft, Save, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppSidebar from "@/components/appSidebar";
import SiteFooter from "@/components/site-footer";

const emptyCharacter = { name: "", description: "", image: "", movieId: "" };

export default function PersonajeForm({ editing = false }) {
	const params = useParams();
	const router = useRouter();
	const [draft, setDraft] = useState(emptyCharacter);
	const [loaded, setLoaded] = useState(!editing);
	const [error, setError] = useState("");
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		if (!editing) return;

		async function loadCharacter() {
			try {
				const response = await fetch(`/api/personajes/${params.id}`, { cache: "no-store" });
				const data = await response.json().catch(() => null);
				if (!response.ok) throw new Error(data?.error ?? "No se pudo consultar el personaje.");
				setDraft({
					name: data.name ?? data.nombre ?? "",
					description: data.description ?? data.descripcion ?? "",
					image: data.image ?? data.imagen ?? "",
					movieId: data.movieId ?? data.pelicula_id ?? "",
				});
			} catch (requestError) {
				setError(requestError instanceof Error ? requestError.message : "No se pudo consultar el personaje.");
			} finally {
				setLoaded(true);
			}
		}

		loadCharacter();
	}, [editing, params.id]);

	async function saveCharacter(event) {
		event.preventDefault();
		if (!draft.name.trim() || !draft.movieId) {
			setError("El nombre y la película son obligatorios.");
			return;
		}

		setSaving(true);
		setError("");
		try {
			const token = localStorage.getItem("access_token");
			const response = await fetch(editing ? `/api/personajes/${params.id}` : "/api/personajes", {
				method: editing ? "PUT" : "POST",
				headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
				body: JSON.stringify({
					nombre: draft.name.trim(),
					descripcion: draft.description.trim() || null,
					imagen: draft.image.trim() || null,
					pelicula_id: Number(draft.movieId),
				}),
			});
			const data = await response.json().catch(() => null);
			if (!response.ok) throw new Error(data?.error ?? "No se pudo guardar el personaje.");
			router.push("/admin/personajes");
		} catch (requestError) {
			setError(requestError instanceof Error ? requestError.message : "No se pudo guardar el personaje.");
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
					<h1 className="mt-2 text-3xl font-bold text-white">{editing ? "Modificar personaje" : "Nuevo personaje"}</h1>
					<p className="mt-2 text-sm text-[#9bb4bb]">Completa la información del personaje.</p>
					<form onSubmit={saveCharacter} className="mt-8 space-y-6 rounded-2xl border border-[#315365] bg-[#0d2a3c] p-6 shadow-2xl shadow-[#061a2a]/20 sm:p-8">
						<Field label="Nombre" value={draft.name} onChange={(value) => setDraft({ ...draft, name: value })} required />
						<Field label="ID de película" type="number" min="1" value={draft.movieId} onChange={(value) => setDraft({ ...draft, movieId: value })} required />
						<Field label="URL de imagen" type="url" value={draft.image} onChange={(value) => setDraft({ ...draft, image: value })} />
						<label className="block space-y-2 text-sm font-semibold text-[#b9ced1]">Descripción<textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} rows="5" className="w-full rounded-lg border border-[#315365] bg-[#102f43] px-3 py-3 font-normal text-white outline-none transition focus:border-[#19c5a5]" /></label>
						{error && <p className="text-sm text-[#f2aaaa]" role="alert">{error}</p>}
						<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Link href="/admin/personajes" className="rounded-lg border border-[#315365] px-4 py-3 text-center text-sm font-semibold text-[#b9ced1] transition hover:border-[#19c5a5] hover:text-white">Cancelar</Link><button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#19c5a5] px-4 py-3 text-sm font-bold text-[#092536] transition hover:bg-[#43d8bd] disabled:cursor-not-allowed disabled:opacity-60"><Save className="h-4 w-4" />{saving ? "Guardando..." : "Guardar personaje"}</button></div>
					</form>
					<Link href="/admin/personajes" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#b9ced1] transition hover:text-white"><ArrowLeft className="h-4 w-4" />Volver a personajes</Link>
				</section>
				<SiteFooter />
			</main>
		</AppSidebar>
	);
}

function Field({ label, type = "text", value, onChange, required = false, ...props }) {
	return <label className="block space-y-2 text-sm font-semibold text-[#b9ced1]">{label}<input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-[#315365] bg-[#102f43] px-3 py-3 font-normal text-white outline-none transition focus:border-[#19c5a5]" {...props} /></label>;
}
