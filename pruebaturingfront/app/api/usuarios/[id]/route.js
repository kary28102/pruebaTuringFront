const USUARIOS_API_URL = process.env.USUARIOS_API_URL ?? "http://localhost:8000/usuarios";

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

	return data === null
		? new Response(null, { status: response.status })
		: Response.json(data, { status: response.status });
}

async function forwardRequest(request, context, options = {}) {
	const { id } = await context.params;
	const headers = {
		...getAuthorization(request),
		...(options.body ? { "Content-Type": "application/json" } : {}),
	};

	const response = await fetch(`${USUARIOS_API_URL.replace(/\/$/, "")}/${id}`, {
		method: options.method ?? request.method,
		headers,
		body: options.body,
		cache: "no-store",
	});

	return forwardResponse(response);
}

export async function GET(request, context) {
	try {
		return await forwardRequest(request, context);
	} catch (error) {
		console.error("Error al consultar el usuario:", error);
		return Response.json({ error: "No se pudo conectar con el servidor de usuarios." }, { status: 502 });
	}
}

export async function PUT(request, context) {
	try {
		const body = await request.json();
		return await forwardRequest(request, context, {
			method: "PUT",
			body: JSON.stringify(body),
		});
	} catch (error) {
		console.error("Error al actualizar el usuario:", error);
		return Response.json({ error: "No se pudo conectar con el servidor de usuarios." }, { status: 502 });
	}
}

export async function DELETE(request, context) {
	try {
		return await forwardRequest(request, context, { method: "DELETE" });
	} catch (error) {
		console.error("Error al eliminar el usuario:", error);
		return Response.json({ error: "No se pudo conectar con el servidor de usuarios." }, { status: 502 });
	}
}
