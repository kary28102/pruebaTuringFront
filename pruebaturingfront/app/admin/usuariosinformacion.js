"use client";

import Link from "next/link";
import { Pencil, Search, Save, ShieldCheck, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const initialUsers = [
	{ id: 1, name: "Ana García", email: "ana.garcia@example.com", role: "Administrador", status: "Activo" },
	{ id: 2, name: "Carlos López", email: "carlos.lopez@example.com", role: "Editor", status: "Activo" },
	{ id: 3, name: "María Torres", email: "maria.torres@example.com", role: "Usuario", status: "Pendiente" },
	{ id: 4, name: "Luis Hernández", email: "luis.hernandez@example.com", role: "Usuario", status: "Inactivo" },
];

const emptyDraft = { name: "", email: "", role: "Usuario", status: "Activo" };

export default function UsuariosInformacion() {
	const [users, setUsers] = useState(initialUsers);
	const [search, setSearch] = useState("");
	const [editingId, setEditingId] = useState(null);
	const [draft, setDraft] = useState(emptyDraft);

	const filteredUsers = useMemo(() => {
		const query = search.trim().toLowerCase();
		return users.filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query));
	}, [search, users]);

	function startEditing(user) {
		setEditingId(user.id);
		setDraft({ name: user.name, email: user.email, role: user.role, status: user.status });
	}

	function cancelEditing() {
		setEditingId(null);
		setDraft(emptyDraft);
	}

	function saveUser() {
		if (!draft.name.trim() || !draft.email.trim()) return;

		setUsers((currentUsers) => currentUsers.map((user) => user.id === editingId ? { ...user, ...draft, name: draft.name.trim(), email: draft.email.trim() } : user));
		cancelEditing();
	}

	return (
		<main className="min-h-screen bg-[#102f43] text-[#eaf5f3]">
			<nav className="border-b border-[#214457] bg-[#092536]">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
					<Link href="/" className="text-xl font-bold tracking-tight">cine<span className="text-[#19c5a5]">.</span></Link>
					<Link href="/peliculas" className="text-sm text-[#b9ced1] transition hover:text-white">Volver a películas</Link>
				</div>
			</nav>

			<section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
				<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-[#19c5a5]"><ShieldCheck className="h-4 w-4" />Administración</div>
						<h1 className="mt-2 text-3xl font-bold text-white">Usuarios</h1>
						<p className="mt-2 text-sm text-[#9bb4bb]">Consulta y modifica la información de las cuentas.</p>
					</div>
					<Label className="w-full rounded-lg border border-[#315365] bg-[#0d2a3c] px-4 py-3 sm:max-w-xs">
						<Search className="h-4 w-4 text-[#19c5a5]" />
						<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar usuario" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#70909a]" />
					</Label>
				</div>

				<div className="mt-8 overflow-x-auto rounded-2xl border border-[#315365] bg-[#0d2a3c] shadow-2xl shadow-[#061a2a]/20">
					<Table className="text-left text-sm">
						<TableHeader className="border-b border-[#214457] bg-[#163346] text-xs uppercase tracking-wide text-[#9bb4bb]">
							<TableRow><TableHead className="px-4 py-4 font-semibold sm:px-5">Usuario</TableHead><TableHead className="hidden px-5 py-4 font-semibold sm:table-cell">Correo</TableHead><TableHead className="hidden px-5 py-4 font-semibold sm:table-cell">Rol</TableHead><TableHead className="px-4 py-4 font-semibold sm:px-5">Estado</TableHead><TableHead className="px-4 py-4 text-right font-semibold sm:px-5">Acciones</TableHead></TableRow>
						</TableHeader>
						<TableBody className="divide-y divide-[#214457]">
							{filteredUsers.map((user) => editingId === user.id ? (
								<TableRow key={user.id}>
									<TableCell className="px-5 py-3"><input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} aria-label="Nombre del usuario" className="w-full rounded border border-[#315365] bg-[#102f43] px-3 py-2 text-white outline-none focus:border-[#19c5a5]" /></TableCell>
									<TableCell className="hidden px-5 py-3 sm:table-cell"><input type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} aria-label="Correo del usuario" className="w-full rounded border border-[#315365] bg-[#102f43] px-3 py-2 text-white outline-none focus:border-[#19c5a5]" /></TableCell>
									<TableCell className="hidden px-5 py-3 sm:table-cell"><select value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value })} aria-label="Rol del usuario" className="rounded border border-[#315365] bg-[#102f43] px-3 py-2 text-white outline-none"><option>Administrador</option><option>Editor</option><option>Usuario</option></select></TableCell>
									<TableCell className="px-5 py-3"><select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })} aria-label="Estado del usuario" className="rounded border border-[#315365] bg-[#102f43] px-3 py-2 text-white outline-none"><option>Activo</option><option>Pendiente</option><option>Inactivo</option></select></TableCell>
									<TableCell className="px-5 py-3"><div className="flex justify-end gap-2"><button type="button" onClick={saveUser} aria-label="Guardar cambios" title="Guardar cambios" className="rounded-lg p-2 text-[#19c5a5] transition hover:bg-[#163f52]"><Save className="h-4 w-4" /></button><button type="button" onClick={cancelEditing} aria-label="Cancelar edición" title="Cancelar edición" className="rounded-lg p-2 text-[#b9ced1] transition hover:bg-[#163f52]"><X className="h-4 w-4" /></button></div></TableCell>
								</TableRow>
							) : (
								<TableRow key={user.id} className="text-[#b9ced1]"><TableCell className="px-4 py-4 font-semibold text-white sm:px-5">{user.name}</TableCell><TableCell className="hidden px-5 py-4 sm:table-cell">{user.email}</TableCell><TableCell className="hidden px-5 py-4 sm:table-cell">{user.role}</TableCell><TableCell className="px-4 py-4 sm:px-5"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${user.status === "Activo" ? "bg-[#19c5a5]/15 text-[#7de0ca]" : user.status === "Pendiente" ? "bg-[#f6c85f]/15 text-[#f6c85f]" : "bg-[#b9ced1]/10 text-[#9bb4bb]"}`}>{user.status}</span></TableCell><TableCell className="px-4 py-4 text-right sm:px-5"><button type="button" onClick={() => startEditing(user)} aria-label={`Modificar a ${user.name}`} title="Modificar usuario" className="inline-flex items-center gap-2 rounded-lg border border-[#315365] px-2.5 py-2 text-xs font-semibold text-[#eaf5f3] transition hover:border-[#19c5a5] hover:text-[#19c5a5] sm:px-3"><Pencil className="h-3.5 w-3.5" /><span className="hidden sm:inline">Modificar</span></button></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					{filteredUsers.length === 0 && <p className="px-5 py-12 text-center text-[#9bb4bb]">No encontramos usuarios.</p>}
				</div>
			</section>
		</main>
	);
}
