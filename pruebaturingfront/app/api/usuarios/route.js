const USUARIOS_API_URL = process.env.USUARIOS_API_URL ?? "http://localhost:8000/usuarios";

export async function GET(request) {
	try {
		const token = request.headers.get("authorization");
		const response = await fetch(`${USUARIOS_API_URL.replace(/\/$/, "")}/`, {
			headers: token ? { Authorization: token } : {},
			cache: "no-store",
		});
		const data = await response.json().catch(() => null);

		if (!response.ok) {
			const detail = typeof data?.detail === "string" ? data.detail : "No se pudieron consultar los usuarios.";
			return Response.json({ error: detail }, { status: response.status });
		}

		return Response.json(data ?? []);
	} catch (error) {
		console.error("Error al consultar los usuarios:", error);
		return Response.json({ error: "No se pudo conectar con el servidor de usuarios." }, { status: 502 });
	}
}
