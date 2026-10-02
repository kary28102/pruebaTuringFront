"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Registro() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          email: email.trim(),
          password,
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error ?? "No se pudo crear la cuenta.");
      }

      router.push("/login");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo crear la cuenta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#102f43] px-4 py-12 text-[#eaf5f3]">
      <div className="mx-auto max-w-md">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Bienvenido<span className="text-[#19c5a5]">.</span>
        </Link>
        <div className="mt-8 rounded-xl border border-[#315365] bg-[#163f52] p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-white">Crear cuenta</h1>
          <p className="mt-1 text-[#9bb4bb]">Regístrate para acceder a tu cuenta.</p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} placeholder="Tu nombre" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@correo.com" autoComplete="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Tu contraseña" autoComplete="new-password" required />
            </div>
            {error && <p className="text-sm text-red-300" role="alert">{error}</p>}
            <button type="submit" className="w-full rounded-lg bg-[#19c5a5] px-4 py-2 font-semibold text-[#07202c] hover:bg-[#7de0ca] disabled:cursor-not-allowed disabled:opacity-60" disabled={loading}>
              {loading ? "Creando cuenta..." : "Registrarme"}
            </button>
          </form>
          <p className="mt-5 text-center text-sm text-[#9bb4bb]">
            ¿Ya tienes una cuenta? <Link href="/login" className="font-medium text-[#19c5a5] hover:underline">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
