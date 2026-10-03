"use client";

import { Save } from "lucide-react";
import Link from "next/link";

const roleOptions = [
	{ value: "admin", label: "Administrador" },
	{ value: "user", label: "Usuario" },
];

export default function UserForm({
	draft,
	onChange,
	onSubmit,
	error = "",
	saving = false,
	cancelHref = "/admin",
	submitLabel = "Guardar cambios",
	showRole = true,
}) {
	return (
		<form onSubmit={onSubmit} className="mt-8 space-y-6 rounded-2xl border border-[#315365] bg-[#0d2a3c] p-6 shadow-2xl shadow-[#061a2a]/20 sm:p-8">
			<div className="grid gap-6 sm:grid-cols-2">
				<Field label="Nombre completo" value={draft.name} onChange={(name) => onChange({ ...draft, name })} />
				<Field label="Correo electrónico" type="email" value={draft.email} onChange={(email) => onChange({ ...draft, email })} />
				{showRole && <SelectField label="Rol" value={draft.role} onChange={(role) => onChange({ ...draft, role })} options={roleOptions} />}
			</div>
			{error && <p className="text-sm text-[#f2aaaa]" role="alert">{error}</p>}
			<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
				<Link href={cancelHref} className="rounded-lg border border-[#315365] px-4 py-3 text-center text-sm font-semibold text-[#b9ced1] transition hover:border-[#19c5a5] hover:text-white">Cancelar</Link>
				<button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#19c5a5] px-4 py-3 text-sm font-bold text-[#092536] transition hover:bg-[#43d8bd] disabled:cursor-not-allowed disabled:opacity-60"><Save className="h-4 w-4" />{saving ? "Guardando..." : submitLabel}</button>
			</div>
		</form>
	);
}

function Field({ label, type = "text", value, onChange }) {
	return <label className="space-y-2 text-sm font-semibold text-[#b9ced1]">{label}<input required type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-[#315365] bg-[#102f43] px-3 py-3 font-normal text-white outline-none transition focus:border-[#19c5a5]" /></label>;
}

function SelectField({ label, value, onChange, options }) {
	return <label className="space-y-2 text-sm font-semibold text-[#b9ced1]">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-[#315365] bg-[#102f43] px-3 py-3 font-normal text-white outline-none focus:border-[#19c5a5]">{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
}
