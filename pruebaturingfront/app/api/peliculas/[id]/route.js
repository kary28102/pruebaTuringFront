const API_URL = process.env.PELICULAS_API_URL ?? "http://localhost:8000/peliculas/";

function getAuthorization(request) {
	const authorization = request.headers.get("authorization");
	return authorization ? { Authorization: authorization } : {};
}

async function forwardResponse(response) {
	const data = await response.json().catch(() => null);
	if (!response.ok) {
		const detail = typeof data?.detail === "string" ? data.detail : "No se pudo completar la solicitud.";
		return Response.json({ error: detail }, { status: response.status });
	}
	return data === null ? new Response(null, { status: response.status }) : Response.json(data, { status: response.status });
}

async function forwardRequest(request, context) {
	const { id } = await context.params;
	const body = request.method === "PUT" ? JSON.stringify(await request.json()) : undefined;
	const response = await fetch(`${API_URL.replace(/\/$/, "")}/${id}/`, {
		method: request.method,
		headers: { ...getAuthorization(request), ...(body ? { "Content-Type": "application/json" } : {}) },
		body,
		cache: "no-store",
	});
	return forwardResponse(response);
}

export async function GET(request, context) {
	try {
		return await forwardRequest(request, context);
	} catch (error) {
		console.error("Error al consultar la película:", error);
		return Response.json({ error: "No se pudo conectar con el servidor de películas." }, { status: 502 });
	}
}

export async function PUT(request, context) {
	try {
		return await forwardRequest(request, context);
	} catch (error) {
		console.error("Error al actualizar la película:", error);
		return Response.json({ error: "No se pudo conectar con el servidor de películas." }, { status: 502 });
	}
}

export async function DELETE(request, context) {
	try {
		return await forwardRequest(request, context);
	} catch (error) {
		console.error("Error al eliminar la película:", error);
		return Response.json({ error: "No se pudo conectar con el servidor de películas." }, { status: 502 });
	}
}
