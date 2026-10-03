import Link from "next/link";
import { Film, Mail } from "lucide-react";

const footerLinks = [
	{ label: "Películas", href: "/peliculas" },
	{ label: "Géneros", href: "/peliculas#generos" },
	{ label: "Personajes", href: "/peliculas#personajes" },
];

export default function SiteFooter() {
	return (
		<footer className="border-t border-[#214457] bg-[#081f2e] px-5 py-10 text-[#9bb4bb] sm:px-8">
			<div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
				<div className="max-w-xs">
					<Link href="/peliculas" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-white">
						<Film className="h-5 w-5 text-[#19c5a5]" />
						cine<span className="text-[#19c5a5]">.</span>
					</Link>
					<p className="mt-3 text-sm leading-6">Un espacio para descubrir películas, historias y personajes que vale la pena recordar.</p>
				</div>

				<nav aria-label="Enlaces del sitio" className="flex flex-col gap-3 text-sm">
					<p className="font-semibold text-white">Explora</p>
					{footerLinks.map((link) => <Link key={link.href} href={link.href} className="transition hover:text-[#19c5a5]">{link.label}</Link>)}
				</nav>

				<div className="flex flex-col gap-3 text-sm">
					<p className="font-semibold text-white">Conecta</p>
					<a href="mailto:hola@cine.example" className="inline-flex items-center gap-2 transition hover:text-[#19c5a5]"><Mail className="h-4 w-4" /> hola@cine.example</a>
					<div className="flex gap-3 pt-1">
						<a href="#instagram" aria-label="Instagram" className="text-xs font-bold transition hover:text-[#19c5a5]">IG</a>
						<a href="#twitter" aria-label="Twitter" className="text-xs font-bold transition hover:text-[#19c5a5]">X</a>
					</div>
				</div>
			</div>
			<div className="mx-auto mt-8 max-w-7xl border-t border-[#214457] pt-5 text-xs">
				<p>© {new Date().getFullYear()} cine. Todos los derechos reservados.</p>
			</div>
		</footer>
	);
}
