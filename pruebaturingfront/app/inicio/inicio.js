import Link from "next/link";
import { ArrowRight, Film, Search, Sparkles, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Inicio() {
	return (
		<main className="min-h-screen bg-[#102f43] text-[#eaf5f3]">
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
				<Link href="/inicio" className="text-xl font-bold tracking-tight">
					cine<span className="text-[#19c5a5]">.</span>
				</Link>
				<div className="hidden items-center gap-6 text-sm text-[#9bb4bb] md:flex">
					<Link href="#beneficios" className="text-gray-300">Descubre</Link>
					<Link href="/registro" className="text-gray-300">Registro</Link>
				</div>
				<Link href="/login" className="inline-flex h-8 items-center justify-center rounded-lg bg-[#19c5a5] px-2.5 text-sm font-semibold text-[#07202c] transition-colors hover:bg-[#7de0ca] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#19c5a5]/40">
					Iniciar sesión
				</Link>
			</nav>

			<section className="relative isolate overflow-hidden bg-[#0d2a3c] px-6 py-20 text-center md:py-24">
				<div aria-hidden="true" className="absolute inset-[-20px] -z-10 scale-105 bg-[url('/imgg.png')] bg-cover bg-center blur-[2px]" />
				<div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0b5270]/70" />
				<div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#19c5a566,transparent_55%)]" />
				<div className="relative z-10 mx-auto max-w-3xl">
					<div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-[#315365] bg-[#0d2a3c] px-4 py-2 text-sm text-[#b9ced1]">
						<Sparkles className="h-4 w-4 text-[#19c5a5]" />
						Un espacio hecho para ti
					</div>
					<h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">Tu cartelera, más simple</h1>
					<p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#b9ced1]">Encuentra películas, descubre nuevas historias y conoce las mejores calificaciones en un solo lugar.</p>
					<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
						<Link href="/login" className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#19c5a5] px-2.5 text-sm font-semibold text-[#07202c] transition-colors hover:bg-[#7de0ca] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#19c5a5]/40">Explorar películas <ArrowRight className="h-4 w-4" /></Link>
						<Link href="#beneficios" className="inline-flex h-9 items-center justify-center rounded-lg border border-[#315365] bg-[#0d2a3c] px-2.5 text-sm font-medium text-[#eaf5f3] transition-colors hover:border-[#19c5a5] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#19c5a5]/40">Conocer más</Link>
					</div>
				</div>
			</section>

			<section id="beneficios" className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-3">
				{[
					["Explora", "Busca películas por título y filtra el catálogo por género.", Search],
					["Descubre", "Conoce los detalles de cada historia antes de elegir qué ver.", Film],
					["Elige tus favoritas", "Encuentra las películas mejor calificadas y disfruta tu próxima historia.", Star],
				].map(([title, description, Icon]) => (
					<Card key={title} className="border-[#214457] bg-[#0d2a3c] shadow-sm"><CardHeader><Icon className="mb-2 h-6 w-6 text-[#19c5a5]" /><CardTitle className="text-white">{title}</CardTitle></CardHeader><CardContent className="text-[#9bb4bb]">{description}</CardContent></Card>
				))}
			</section>

			<section id="comenzar" className="border-t border-[#315365] bg-[#163f52] px-6 py-16 text-center">
				<h2 className="text-3xl font-bold tracking-tight text-white">Encuentra tu próxima película</h2>
				<p className="mx-auto mt-3 max-w-xl text-[#9bb4bb]">Visita el catálogo y descubre una selección pensada para todos los gustos.</p>
				<Link href="/peliculas" className="mt-6 inline-flex h-8 items-center justify-center rounded-lg bg-[#19c5a5] px-2.5 text-sm font-semibold text-[#07202c] transition-colors hover:bg-[#7de0ca] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#19c5a5]/40">Ir al catálogo</Link>
			</section>
		</main>
	);
}
