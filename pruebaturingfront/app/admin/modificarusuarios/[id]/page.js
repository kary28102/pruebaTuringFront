"use client";

import { ArrowLeft, Save, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CineNav from "@/components/cine-nav";

const roleOptions = [
	{ value: "admin", label: "Administrador" },
	{ value: "user", label: "Usuario" },
];

const emptyDraft = { name: "", email: "", role: "user" };

function normalizeRole(role) {
	const normalizedRole = String(role ?? "").toLowerCase();
	return normalizedRole === "administrador" ? "admin" : normalizedRole === "usuario" ? "user" : normalizedRole;
}

export default function ModificarUsuarioPage() {
	const params = useParams();
	const router = useRouter();
	const [draft, setDraft] = useState(emptyDraft);
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState("");
	const [saving, setSaving] = useState(false);
	const [userExists, setUserExists] = useState(false);

	useEffect(() => {
		async function loadUser() {
			try {
				const token = localStorage.getItem("access_token");
				const response = await fetch(`/api/usuarios/${params.id}`, {
					headers: token ? { Authorization: `Bearer ${token}` } : {},
					cache: "no-store",
				});
				const data = await response.json().catch(() => null);

				if (!response.ok) {
					throw new Error(data?.error ?? "No se pudo consultar el usuario.");
				}

				setDraft({ name: data.nombre, email: data.email, role: normalizeRole(data.rol) });
				setUserExists(true);
			} catch (requestError) {
				setError(requestError instanceof Error ? requestError.message : "No se pudo consultar el usuario.");
			} finally {
				setLoaded(true);
			}
		}

		loadUser();
	}, [params.id]);

	async function saveUser(event) {
		event.preventDefault();
		if (!draft.name.trim() || !draft.email.trim()) {
			setError("El nombre y el correo son obligatorios.");
			return;
		}

		setError("");
		setSaving(true);

		try {
			const token = localStorage.getItem("access_token");
			const response = await fetch(`/api/usuarios/${params.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
				body: JSON.stringify({
					nombre: draft.name.trim(),
					email: draft.email.trim(),
					rol: draft.role,
				}),
			});
			const data = await response.json().catch(() => null);

			if (!response.ok) {
				throw new Error(data?.error ?? "No se pudo actualizar el usuario.");
			}

			router.push("/admin");
		} catch (requestError) {
			setError(requestError instanceof Error ? requestError.message : "No se pudo actualizar el usuario.");
		} finally {
			setSaving(false);
		}
	}

	if (!loaded) return null;

	return (
		<main className="min-h-screen bg-[#102f43] text-[#eaf5f3]">
			<CineNav variant="admin" />
			<section className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
				<div className="flex items-center gap-2 text-sm font-semibold text-[#19c5a5]"><ShieldCheck className="h-4 w-4" />Administración</div>
				<h1 className="mt-2 text-3xl font-bold text-white">Modificar usuario</h1>
				<p className="mt-2 text-sm text-[#9bb4bb]">Actualiza los datos de la cuenta y guarda los cambios.</p>

				{userExists ? (
					<form onSubmit={saveUser} className="mt-8 space-y-6 rounded-2xl border border-[#315365] bg-[#0d2a3c] p-6 shadow-2xl shadow-[#061a2a]/20 sm:p-8">
						<div className="grid gap-6 sm:grid-cols-2">
							<Field label="Nombre completo" value={draft.name} onChange={(value) => setDraft({ ...draft, name: value })} />
							<Field label="Correo electrónico" type="email" value={draft.email} onChange={(value) => setDraft({ ...draft, email: value })} />
							<SelectField label="Rol" value={draft.role} onChange={(value) => setDraft({ ...draft, role: value })} options={roleOptions} />
						</div>
						{error && <p className="text-sm text-[#f2aaaa]" role="alert">{error}</p>}
						<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
							<Link href="/admin" className="rounded-lg border border-[#315365] px-4 py-3 text-center text-sm font-semibold text-[#b9ced1] transition hover:border-[#19c5a5] hover:text-white">Cancelar</Link>
							<button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#19c5a5] px-4 py-3 text-sm font-bold text-[#092536] transition hover:bg-[#43d8bd] disabled:cursor-not-allowed disabled:opacity-60"><Save className="h-4 w-4" />{saving ? "Guardando..." : "Guardar cambios"}</button>
						</div>
					</form>
				) : (
					<div className="mt-8 rounded-2xl border border-[#315365] bg-[#0d2a3c] p-8 text-center text-[#b9ced1]">
						<p>{error || "El usuario que buscas no existe."}</p>
						<Link href="/admin" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#19c5a5]"><ArrowLeft className="h-4 w-4" />Volver a usuarios</Link>
					</div>
				)}
			</section>
		</main>
	);
}

function Field({ label, type = "text", value, onChange }) {
	return <label className="space-y-2 text-sm font-semibold text-[#b9ced1]">{label}<input required type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-[#315365] bg-[#102f43] px-3 py-3 font-normal text-white outline-none transition focus:border-[#19c5a5]" /></label>;
}

function SelectField({ label, value, onChange, options }) {
	return <label className="space-y-2 text-sm font-semibold text-[#b9ced1]">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-[#315365] bg-[#102f43] px-3 py-3 font-normal text-white outline-none focus:border-[#19c5a5]">{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
}
