"use client";

import { ArrowLeft, Save, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CineNav from "@/components/cine-nav";
import { getStoredUsers, storeUsers } from "@/lib/admin-users";

const emptyDraft = { name: "", email: "", role: "Usuario", status: "Activo" };

export default function ModificarUsuarioPage() {
	const params = useParams();
	const router = useRouter();
	const [draft, setDraft] = useState(emptyDraft);
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const user = getStoredUsers().find((candidate) => String(candidate.id) === String(params.id));

		if (user) setDraft({ name: user.name, email: user.email, role: user.role, status: user.status });
		setLoaded(true);
	}, [params.id]);

	function saveUser(event) {
		event.preventDefault();
		if (!draft.name.trim() || !draft.email.trim()) {
			setError("El nombre y el correo son obligatorios.");
			return;
		}

		const users = getStoredUsers().map((user) => user.id === Number(params.id)
			? { ...user, ...draft, name: draft.name.trim(), email: draft.email.trim() }
			: user);

		storeUsers(users);
		router.push("/admin");
	}

	if (!loaded) return null;

	const userExists = getStoredUsers().some((user) => String(user.id) === String(params.id));

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
							<SelectField label="Rol" value={draft.role} onChange={(value) => setDraft({ ...draft, role: value })} options={["Administrador", "Editor", "Usuario"]} />
							<SelectField label="Estado" value={draft.status} onChange={(value) => setDraft({ ...draft, status: value })} options={["Activo", "Pendiente", "Inactivo"]} />
						</div>
						{error && <p className="text-sm text-[#f2aaaa]" role="alert">{error}</p>}
						<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
							<Link href="/admin" className="rounded-lg border border-[#315365] px-4 py-3 text-center text-sm font-semibold text-[#b9ced1] transition hover:border-[#19c5a5] hover:text-white">Cancelar</Link>
							<button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#19c5a5] px-4 py-3 text-sm font-bold text-[#092536] transition hover:bg-[#43d8bd]"><Save className="h-4 w-4" />Guardar cambios</button>
						</div>
					</form>
				) : (
					<div className="mt-8 rounded-2xl border border-[#315365] bg-[#0d2a3c] p-8 text-center text-[#b9ced1]">
						<p>El usuario que buscas no existe.</p>
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
	return <label className="space-y-2 text-sm font-semibold text-[#b9ced1]">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-[#315365] bg-[#102f43] px-3 py-3 font-normal text-white outline-none focus:border-[#19c5a5]">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
