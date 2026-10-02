export const initialUsers = [
	{ id: 1, name: "Ana García", email: "ana.garcia@example.com", role: "Administrador", status: "Activo" },
	{ id: 2, name: "Carlos López", email: "carlos.lopez@example.com", role: "Editor", status: "Activo" },
	{ id: 3, name: "María Torres", email: "maria.torres@example.com", role: "Usuario", status: "Pendiente" },
	{ id: 4, name: "Luis Hernández", email: "luis.hernandez@example.com", role: "Usuario", status: "Inactivo" },
];

const usersStorageKey = "cine-admin-users";

export function getStoredUsers() {
	if (typeof window === "undefined") return initialUsers;

	try {
		const storedUsers = window.localStorage.getItem(usersStorageKey);
		const parsedUsers = storedUsers ? JSON.parse(storedUsers) : null;
		return Array.isArray(parsedUsers) ? parsedUsers : initialUsers;
	} catch {
		return initialUsers;
	}
}

export function storeUsers(users) {
	if (typeof window === "undefined") return;

	window.localStorage.setItem(usersStorageKey, JSON.stringify(users));
}
