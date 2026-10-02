"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
	const router = useRouter()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (event) => {
		event.preventDefault()
		setError("")

		if (!email || !password) {
			setError("Completa todos los campos para continuar.")
			return
		}

		setLoading(true)
		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email.trim(),
					password,
				}),
			})
			const data = await response.json().catch(() => null)

			if (!response.ok) {
				throw new Error(data?.error ?? "No se pudo iniciar sesión.")
			}

			if (!data?.access_token) {
				throw new Error("El servidor no devolvió un token de acceso.")
			}

			localStorage.setItem("access_token", data.access_token)
			if (data.usuario) {
				localStorage.setItem("usuario", JSON.stringify(data.usuario))
			}
			router.push("/peliculas")
		} catch (requestError) {
			setError(requestError instanceof Error ? requestError.message : "No se pudo iniciar sesión.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<main className="min-h-screen bg-[#102f43] text-[#eaf5f3]">
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
				<Link href="/" className="text-xl font-bold tracking-tight">
					cine<span className="text-[#19c5a5]">.</span>
				</Link>
				<div className="hidden items-center gap-6 text-sm text-[#9bb4bb] md:flex">
					<Link href="/#beneficio" className="transition-colors hover:text-white">Beneficios</Link>
					<Link href="/#comenzar" className="transition-colors hover:text-white">Como comenzar</Link>
				</div>
				<Link
					href="/"
					className="inline-flex h-8 items-center justify-center gap-2 rounded-lg bg-[#19c5a5] px-2.5 text-sm font-semibold text-[#07202c] transition-colors hover:bg-[#7de0ca] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#19c5a5]/40"
				>
						<ArrowLeft className="h-4 w-4" />
						Volver al inicio
				</Link>
			</nav>

			<section className="flex min-h-[calc(100vh-81px)] items-center justify-center px-4 py-12">
			<Card className="w-full max-w-md border-[#315365] bg-[#163f52] shadow-lg shadow-[#061a2a]/20">
				<CardHeader className="space-y-1">
					<div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-[#12354a] text-[#19c5a5]">
						<LogIn className="h-5 w-5" />
					</div>
					<CardTitle className="text-2xl font-bold text-white">Iniciar sesión</CardTitle>
					<CardDescription className="text-[#9bb4bb]">
						Ingresa tus datos para acceder a tu cuenta.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Correo electrónico</Label>
							<Input
								id="email"
								type="email"
								placeholder="tu@correo.com"
								autoComplete="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Contraseña</Label>
								<a href="#recuperar" className="text-sm font-medium text-[#19c5a5] hover:underline">
									¿Olvidaste tu contraseña?
								</a>
							</div>
							<Input
								id="password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
							/>
						</div>
						{error && <p className="text-sm text-red-600" role="alert">{error}</p>}
						<Button type="submit" className="w-full bg-[#19c5a5] text-[#07202c] hover:bg-[#7de0ca]" disabled={loading}>
							{loading ? "Ingresando..." : "Ingresar"}
						</Button>
						<p className="text-center text-sm text-[#9bb4bb]">
							¿No tienes una cuenta?{" "}
							<Link href="/registro" className="font-medium text-[#102f43] hover:underline">
								Regístrate
							</Link>
						</p>
					</form>
				</CardContent>
			</Card>
			</section>
		</main>
	)
}
