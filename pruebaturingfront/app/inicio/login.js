"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
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
			// Conecta aquí tu servicio de autenticación.
			await new Promise((resolve) => setTimeout(resolve, 500))
		} finally {
			setLoading(false)
		}
	}

	return (
		<main className="min-h-screen bg-[#f7fafb] text-[#102f43]">
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
				<Link href="/" className="text-xl font-bold tracking-tight">
					Bienvenido<span className="text-[#1fc3a5]">.</span>
				</Link>
				<div className="hidden items-center gap-6 text-sm text-[#102f43] md:flex">
					<Link href="/#beneficio" className="transition-colors hover:text-[#102f43]">Beneficios</Link>
					<Link href="/#comenzar" className="transition-colors hover:text-[#102f43]">Como comenzar</Link>
				</div>
				<Link
					href="/"
					className="inline-flex h-8 items-center justify-center gap-2 rounded-lg border border-[#102f43] bg-[#102f43] px-2.5 text-sm font-medium text-white transition-colors hover:bg-[#17455e] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#102f43]/40"
				>
						<ArrowLeft className="h-4 w-4" />
						Volver al inicio
				</Link>
			</nav>

			<section className="flex min-h-[calc(100vh-81px)] items-center justify-center px-4 py-12">
			<Card className="w-full max-w-md border-[#c8d8df] bg-white shadow-sm">
				<CardHeader className="space-y-1">
					<div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-[#dce8ed] text-[#102f43]">
						<LogIn className="h-5 w-5" />
					</div>
					<CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
					<CardDescription className="text-[#607685]">
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
								<a href="#recuperar" className="text-sm font-medium text-[#102f43] hover:underline">
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
						<Button type="submit" className="w-full bg-[#102f43] text-white hover:bg-[#17455e]" disabled={loading}>
							{loading ? "Ingresando..." : "Ingresar"}
						</Button>
						<p className="text-center text-sm text-[#607685]">
							¿No tienes una cuenta?{" "}
							<a href="#registro" className="font-medium text-[#102f43] hover:underline">
								Regístrate
							</a>
						</p>
					</form>
				</CardContent>
			</Card>
			</section>
		</main>
	)
}
