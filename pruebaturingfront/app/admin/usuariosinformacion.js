"use client";

import { ArrowLeft, Pencil, Search, ShieldCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import CineNav from "@/components/cine-nav";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStoredUsers, initialUsers, storeUsers } from "@/lib/admin-users";
import AppSidebar from "@/components/appSidebar";

export default function usuariosinformacion() {
	const [users, setUsers] = useState(initialUsers);
	const [search, setSearch] = useState("");

	useEffect(() => {
		setUsers(getStoredUsers());
	}, []);

	const filteredUsers = useMemo(() => {
		const query = search.trim().toLowerCase();
		return users.filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query));
	}, [search, users]);

	function deleteUser(user) {
		if (!window.confirm(`¿Seguro que deseas eliminar a ${user.name}? Esta acción no se puede deshacer.`)) return;

		setUsers((currentUsers) => currentUsers.filter((currentUser) => currentUser.id !== user.id));
		storeUsers(users.filter((currentUser) => currentUser.id !== user.id));
	}

	return (
		<AppSidebar>
			<main className="min-h-screen bg-[#163f52] text-[#eaf5f3]">
				

				<section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
					<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
						<div>
							<div className="flex items-center gap-2 text-sm font-semibold text-[#19c5a5]"><ShieldCheck className="h-4 w-4" />Administración</div>
							<h1 className="mt-2 text-3xl font-bold text-white">Administrar usuarios</h1>
							<p className="mt-2 max-w-xl text-sm text-[#9bb4bb]">Consulta las cuentas, modifica su información o elimínalas de la plataforma.</p>
						</div>
						<Label className="w-full rounded-lg border border-[#315365] bg-[#0d2a3c] px-4 py-3 sm:w-80">
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
								{filteredUsers.map((user) => (
									<TableRow key={user.id} className="text-[#b9ced1]">
										<TableCell className="px-4 py-4 font-semibold text-white sm:px-5">{user.name}</TableCell>
										<TableCell className="hidden px-5 py-4 sm:table-cell">{user.email}</TableCell>
										<TableCell className="hidden px-5 py-4 sm:table-cell">{user.role}</TableCell>
										<TableCell className="px-4 py-4 sm:px-5">{user.status}</TableCell>
										<TableCell className="px-4 py-4 text-right sm:px-5"><div className="flex justify-end gap-2">
											<Link href={`/admin/modificarusuarios/${user.id}`} aria-label={`Editar a ${user.name}`} title="Editar usuario" className="inline-flex items-center gap-2 rounded-lg border border-[#315365] px-2.5 py-2 text-xs font-semibold text-[#eaf5f3] transition hover:border-[#19c5a5] hover:text-[#19c5a5] sm:px-3">
												<Pencil className="h-3.5 w-3.5" /><span className="hidden sm:inline">Editar</span>
											</Link>
											<button type="button" onClick={() => deleteUser(user)} aria-label={`Eliminar a ${user.name}`} title="Eliminar usuario" className="inline-flex items-center gap-2 rounded-lg border border-[#b85c5c] px-2.5 py-2 text-xs font-semibold text-[#f2aaaa] transition hover:bg-[#b85c5c]/15 sm:px-3">
												<Trash2 className="h-3.5 w-3.5" /><span className="hidden sm:inline">Eliminar</span>
											</button>
										</div></TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						{filteredUsers.length === 0 && <p className="px-5 py-12 text-center text-[#9bb4bb]">No encontramos usuarios.</p>}
					</div>

					<Link href="/admin" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#b9ced1] transition hover:text-white">
						<ArrowLeft className="h-4 w-4" />Volver a usuarios
					</Link>
				</section>
			</main>
		</AppSidebar>
	);
}
