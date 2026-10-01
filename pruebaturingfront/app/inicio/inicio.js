import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
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
				<Button asChild variant="outline" className="border-[#b9cbd4] bg-white text-[#102f43] hover:bg-[#dce8ed]">
					<Link href="/login">Iniciar sesión</Link>
				</Button>
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
						<Button asChild size="lg" className="bg-[#102f43] text-white  hover:bg-[#17455e]"><Link href="/registro" className="flex items-center justify-center gap-2">Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
						<Button asChild size="lg" variant="outline" className="border-[#9eb7c2] bg-white/70 text-[#102f43] hover:bg-white"><Link href="#beneficios">Conocer más</Link></Button>
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
				<Button asChild className="mt-6 bg-[#1fc3a5] text-[#102f43] hover:bg-[#18ad92]"><Link href="/registro">Crear una cuenta</Link></Button>
			</section>
		</main>
	);
}
