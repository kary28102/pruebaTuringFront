const AUTH_API_URL = process.env.AUTH_API_URL ?? "http://localhost:8000/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await fetch(`${AUTH_API_URL.replace(/\/$/, "")}/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const error = typeof data?.detail === "string" ? data.detail : "No se pudo crear la cuenta.";
      return Response.json({ error }, { status: response.status });
    }

    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Error al conectar con el servicio de autenticación:", error);
    return Response.json(
      { error: "No se pudo conectar con el servidor de autenticación." },
      { status: 502 },
    );
  }
}
