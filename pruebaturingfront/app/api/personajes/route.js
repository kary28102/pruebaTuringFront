const API_URL = process.env.PERSONAJES_API_URL ?? "http://localhost:8000/personajes/";

function normalizeCharacter(character) {
	return {
		id: character.id,
		name: character.name ?? character.nombre ?? character.nombre_personaje ?? "Sin nombre",
		role: character.role ?? character.rol ?? character.descripcion ?? "Personaje",
		description: character.description ?? character.descripcion ?? "",
		image: character.image ?? character.imagen ?? character.url_imagen ?? "",
		movieId: character.movieId ?? character.pelicula_id ?? "",
	};
}

export async function GET() {
	try {
		const response = await fetch(API_URL, { cache: "no-store" });

		if (!response.ok) {
			return Response.json({ error: "No se pudieron obtener los personajes." }, { status: response.status });
		}

		const data = await response.json();
		const characters = Array.isArray(data)
			? data
			: data.personajes ?? data.characters ?? [];

		return Response.json(characters.map(normalizeCharacter));
	} catch (error) {
		console.error("Error al consultar los personajes:", error);
		return Response.json({ error: "No se pudo conectar con el servidor de personajes." }, { status: 502 });
	}
}

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

export async function POST(request) {
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: { ...getAuthorization(request), "Content-Type": "application/json" },
			body: JSON.stringify(await request.json()),
			cache: "no-store",
		});
		return forwardResponse(response);
	} catch (error) {
		console.error("Error al crear el personaje:", error);
		return Response.json({ error: "No se pudo conectar con el servidor de personajes." }, { status: 502 });
	}
}
