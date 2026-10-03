
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppSidebar from "@/components/appSidebar";

function getUserValue(user, ...keys) {
  return keys.map((key) => user?.[key]).find((value) => value !== undefined && value !== null && value !== "");
}

function roleLabel(role, isAdmin) {
  if (isAdmin === true) return "Administrador";
  const normalizedRole = String(role ?? "").toLowerCase();
  if (normalizedRole === "admin" || normalizedRole === "administrador") return "Administrador";
  return "Usuario";
}

function statusLabel(status) {
  const normalizedStatus = String(status ?? "").toLowerCase();
  if (["inactivo", "inactive", "false", "0"].includes(normalizedStatus)) return "Inactivo";
  return "Activo";
}

export default function PerfilPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const storedUser = localStorage.getItem("usuario");
        if (!storedUser) {
          setError("No se encontró una sesión activa.");
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "No se pudo cargar el perfil.");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const name = getUserValue(user, "nombre", "name") ?? "Sin nombre";
  const email = getUserValue(user, "email", "correo") ?? "Sin correo";
  const role = roleLabel(getUserValue(user, "rol", "role"), user?.is_admin);
  const status = statusLabel(getUserValue(user, "estado", "status", "is_active"));
  const userId = getUserValue(user, "id", "user_id", "usuario_id");

  return (
    <AppSidebar>
        <main className="min-h-screen bg-[#102f43] text-[#eaf5f3]">
            <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
               <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>
                <p className="mb-4">Bienvenido a tu perfil. Aquí puedes ver y actualizar tu información personal.</p>
                {loading && <p className="mb-4 text-[#9bb4bb]">Cargando información...</p>}
                {error && <p className="mb-4 text-[#f2aaaa]" role="alert">{error}</p>}
                {!loading && user && (
                  <div className="mb-6 space-y-3 rounded-2xl border border-[#315365] bg-[#163f52] p-5">
                    <p><span className="font-semibold text-[#9bb4bb]">Nombre:</span> {name}</p>
                    <p><span className="font-semibold text-[#9bb4bb]">Correo:</span> {email}</p>
                    <p><span className="font-semibold text-[#9bb4bb]">Rol:</span> {role}</p>
                    <p><span className="font-semibold text-[#9bb4bb]">Estado:</span> {status}</p>
                  </div>
                )}
                {userId && (
                  <Link href="/perfil/modificarperfil" className="inline-block bg-[#19c5a5] text-white px-4 py-2 rounded hover:bg-[#17b39e] transition-colors">
                    Modificar Perfil
                  </Link>
                )}
            </section>
        </main>
    </AppSidebar>
  )
}
