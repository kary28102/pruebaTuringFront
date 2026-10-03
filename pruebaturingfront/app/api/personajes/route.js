const API_URL = process.env.PERSONAJES_API_URL ?? "http://localhost:8000/personajes/";

function normalizeCharacter(character) {
	return {
		id: character.id,
		name: character.name ?? character.nombre ?? character.nombre_personaje ?? "Sin nombre",
		role: character.role ?? character.rol ?? character.descripcion ?? "Personaje",
		image: character.image ?? character.imagen ?? character.url_imagen ?? "",
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
