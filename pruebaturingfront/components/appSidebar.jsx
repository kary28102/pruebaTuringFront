"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CircleUserRound, Film, LogOut, Search, ShieldCheck, Users } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

function isAdminRole(role) {
	const normalizedRole = String(role ?? "").toLowerCase();
	return normalizedRole === "admin" || normalizedRole === "administrador";
}

export default function appSidebar({ children }) {
	const router = useRouter();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const storedUser = window.localStorage.getItem("usuario");
		if (!storedUser) return;

		try {
			setUser(JSON.parse(storedUser));
		} catch {
			window.localStorage.removeItem("usuario");
		}
	}, []);

	const admin = user?.is_admin === true || isAdminRole(user?.role ?? user?.rol);
	const menuItems = useMemo(() => {
		const items = [
			{ label: "Películas", href: "/peliculas", icon: Film },
			{ label: "Mi perfil", href: "/perfil", icon: CircleUserRound },
		];

		if (admin) {
			items.splice(1, 0,
				{ label: "Modificar películas", href: "/admin/peliculas", icon: Film },
				{ label: "Modificar personajes", href: "/admin/personajes", icon: Users },
				{ label: "Usuarios", href: "/admin", icon: Users },
			);
		}

		return items;
	}, [admin]);

	function handleLogout() {
		window.localStorage.removeItem("access_token");
		window.localStorage.removeItem("usuario");
		router.push("/login");
	}

	return (
		<SidebarProvider>
			<Sidebar aria-label="Menú principal" className="hidden w-64 shrink-0 border-r border-[#214457] bg-[#0d2a3c] text-[#eaf5f3] sm:flex">
				<SidebarHeader className="border-b border-[#214457]">
					{user && (
						<div className="px-2 py-3">
							<p className="truncate text-sm font-semibold text-white">{user.name ?? user.email}</p>
							<p className="text-xs text-[#9bb4bb]">{admin ? "Administrador" : "Usuario"}</p>
						</div>
					)}
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel className="text-[#9bb4bb]">Navegación</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu className="cursso">
								{menuItems.map(({ label, href, icon: Icon }) => (
									<SidebarMenuItem key={href}>
										<SidebarMenuButton
											render={<Link href={href} />}
											className="text-[#b9ced1] cursor-pointer hover:bg-[#163f52] hover:text-white"
										>
												<Icon />
												<span>{label}</span>
										</SidebarMenuButton>
										
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>

					{admin && (
						<SidebarGroup>
							<SidebarGroupLabel className="text-[#9bb4bb]">Administración</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton
											render={<Link href="/admin" />}
											className="text-[#b9ced1] hover:bg-[#163f52] hover:text-white"
										>
												<ShieldCheck />
												<span>Panel de administración</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					)}
				</SidebarContent>

				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								type="button"
								onClick={handleLogout}
								className="text-[#f2aaaa] hover:bg-[#b85c5c]/15 hover:text-[#ffb5b5]"
							>
								<LogOut />
								<span>Cerrar sesión</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>
			<main className="min-w-0 flex-1">
				<nav className="flex items-center justify-between gap-4 bg-[#102f43] px-4 py-3 text-white sm:px-6">
					<div className="flex min-w-0 items-center gap-3">
						<SidebarTrigger className="m-0 shrink-0 text-white hover:bg-[#163f52] hover:text-white" />
						<Link href="/peliculas" className="text-xl font-bold tracking-tight">
							cine<span className="text-[#19c5a5]">.</span>
						</Link>
					</div>
					<div className="hidden items-center gap-8 text-sm text-[#b9ced1] md:flex">
						<Link href="/peliculas" className="text-white">Películas</Link>
						<a href="#generos" className="transition hover:text-white">Géneros</a>
					</div>
					
				</nav>
				{children}
			</main>
		</SidebarProvider>
	);
}
