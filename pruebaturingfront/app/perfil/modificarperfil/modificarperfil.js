"use client";

import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppSidebar from "@/components/appSidebar";
import UserForm from "@/components/user-form";
import SiteFooter from "@/components/site-footer";

const emptyDraft = { name: "", email: "", role: "user" };

function normalizeRole(role) {
    const normalizedRole = String(role ?? "").toLowerCase();
    return normalizedRole === "administrador" ? "admin" : normalizedRole === "usuario" ? "user" : normalizedRole;
}

export default function ModificarPerfilPage() {
    const router = useRouter();
    const [draft, setDraft] = useState(emptyDraft);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        async function loadSessionUser() {
            const storedUser = localStorage.getItem("usuario");
            if (!storedUser) {
                setError("No se encontró una sesión activa.");
                setLoaded(true);
                return;
            }

            try {
                const user = JSON.parse(storedUser);
                const id = user.id ?? user.user_id ?? user.usuario_id;

                setUserId(id);
                setDraft({
                    name: user.nombre ?? user.name ?? "",
                    email: user.email ?? user.correo ?? "",
                    role: normalizeRole(user.rol ?? user.role ?? (user.is_admin ? "admin" : "user")),
                });
                setUserExists(true);
            } catch {
                setError("No se pudo leer la información de la sesión.");
            } finally {
                setLoaded(true);
            }
        }

        loadSessionUser();
    }, []);

    async function saveUser(event) {
        event.preventDefault();
        if (!userId) {
            setError("No se encontró el identificador del usuario.");
            return;
        }

        if (!draft.name.trim() || !draft.email.trim()) {
            setError("El nombre y el correo son obligatorios.");
            return;
        }

        setError("");
        setSaving(true);

        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(`/api/usuarios/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: "Bearer " + token } : {}),
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

            const storedUser = JSON.parse(localStorage.getItem("usuario") ?? "{}");
            localStorage.setItem("usuario", JSON.stringify({
                ...storedUser,
                ...data,
                nombre: data?.nombre ?? draft.name.trim(),
                email: data?.email ?? draft.email.trim(),
                rol: data?.rol ?? draft.role,
            }));
            router.push("/perfil");
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "No se pudo actualizar el usuario.");
        } finally {
            setSaving(false);
        }
    }

    if (!loaded) return null;

    return (
        <AppSidebar>
            <main className="min-h-screen bg-[#102f43] text-[#eaf5f3]">
                <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#19c5a5]"><ShieldCheck className="h-4 w-4" />Administración</div>
                    <h1 className="mt-2 text-3xl font-bold text-white">Modificar usuario</h1>
                    <p className="mt-2 text-sm text-[#9bb4bb]">Actualiza los datos de la cuenta y guarda los cambios.</p>

                    
                    {userExists ? (
                        <UserForm draft={draft} onChange={setDraft} onSubmit={saveUser} error={error} saving={saving} cancelHref="/perfil" showRole={false} />
                    ) : (
                        <div className="mt-8 rounded-2xl border border-[#315365] bg-[#0d2a3c] p-8 text-center text-[#b9ced1]">
                            <p>{error || "No se encontró la información del usuario."}</p>
                            <Link href="/perfil" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#19c5a5]"><ArrowLeft className="h-4 w-4" />Volver al perfil</Link>
                        </div>
                    )}
                   
                </section>
                <SiteFooter />
            </main>
        </AppSidebar>
    );
}
