import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Inicio() {
	return (
		<main className="min-h-screen bg-[#f7fafb] text-[#102f43]">
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
				<Link href="/inicio" className="text-xl font-bold tracking-tight">
					Bienvenido<span className="text-[#1fc3a5]">.</span>
				</Link>
				<div className="hidden items-center gap-6 text-sm text-[#607685] md:flex">
					<Link href="#beneficios" className="hover:text-[#102f43]">Beneficios</Link>
					<Link href="#comenzar" className="hover:text-[#102f43]">Como comenzar</Link>
				</div>
				<Link href="/login" className="inline-flex h-8 items-center justify-center rounded-lg border border-[#b9cbd4] bg-white px-2.5 text-sm font-medium text-[#102f43] transition-colors hover:bg-[#dce8ed] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#102f43]/40">
					Iniciar sesión
				</Link>
			</nav>

			<section className="relative overflow-hidden bg-[#dce8ed] px-6 py-24 text-center md:py-36">
				<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#ffffff99,transparent_55%)]" />
				<div className="mx-auto max-w-3xl">
					<div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-[#b9cbd4] bg-white/70 px-4 py-2 text-sm text-[#607685]">
						<Sparkles className="h-4 w-4 text-[#1fc3a5]" />
						Un espacio hecho para ti
					</div>
					<h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">Todo lo que necesitas, en un solo lugar</h1>
					<p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#466373]">Organiza tus intereses, descubre nuevas ideas y comparte tu experiencia con una comunidad activa.</p>
					<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
						<Link href="/registro" className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#102f43] px-2.5 text-sm font-medium text-white transition-colors hover:bg-[#17455e] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#102f43]/40">Comenzar ahora <ArrowRight className="h-4 w-4" /></Link>
						<Link href="#beneficios" className="inline-flex h-9 items-center justify-center rounded-lg border border-[#9eb7c2] bg-white/70 px-2.5 text-sm font-medium text-[#102f43] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#102f43]/40">Conocer más</Link>
					</div>
				</div>
			</section>

			<section id="beneficios" className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-3">
				{[["Explora", "Encuentra contenido y experiencias que se adapten a tus intereses."], ["Participa", "Comparte tus ideas y forma parte de conversaciones interesantes."], ["Conecta", "Construye una comunidad con personas que comparten tus gustos."]].map(([title, description]) => (
					<Card key={title} className="border-[#c8d8df] bg-white shadow-sm"><CardHeader><CheckCircle2 className="mb-2 h-6 w-6 text-[#1fc3a5]" /><CardTitle className="text-[#102f43]">{title}</CardTitle></CardHeader><CardContent className="text-[#607685]">{description}</CardContent></Card>
				))}
			</section>

			<section id="comenzar" className="border-t border-[#c8d8df] bg-[#eef4f6] px-6 py-16 text-center">
				<h2 className="text-3xl font-bold tracking-tight">Empieza cuando quieras</h2>
				<p className="mx-auto mt-3 max-w-xl text-[#607685]">Crea tu cuenta y descubre una forma más sencilla de disfrutar la experiencia.</p>
				<Link href="/registro" className="mt-6 inline-flex h-8 items-center justify-center rounded-lg bg-[#1fc3a5] px-2.5 text-sm font-medium text-[#102f43] transition-colors hover:bg-[#18ad92] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#102f43]/40">Crear una cuenta</Link>
			</section>
		</main>
	);
}
