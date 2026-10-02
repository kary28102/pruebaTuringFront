const AUTH_API_URL = process.env.AUTH_API_URL ?? "http://localhost:8000/auth/login"

export async function POST(request) {
	try {
		const body = await request.json()
		const response = await fetch(AUTH_API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
			cache: "no-store",
		})
		const data = await response.json().catch(() => null)

		if (!response.ok) {
			const error = typeof data?.detail === "string" ? data.detail : "No se pudo iniciar sesión."
			return Response.json({ error }, { status: response.status })
		}

		return Response.json(data)
	} catch (error) {
		console.error("Error al conectar con el servicio de autenticación:", error)
		return Response.json(
			{ error: "No se pudo conectar con el servidor de autenticación." },
			{ status: 502 },
		)
	}
}
