import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function CineNav({ variant = "catalog" }) {
	if (variant === "detail") {
		return (
			<nav className="bg-[#102f43] text-white">
				<div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
					<Link href="/peliculas" className="flex items-center gap-2 text-sm text-[#b9ced1] transition hover:text-white">
						<ArrowLeft className="h-4 w-4" />
						Volver a películas
					</Link>
					<Brand />
				</div>
			</nav>
		);
	}

	if (variant === "admin") {
		return (
			<nav className="border-b border-[#214457] bg-[#092536]">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
					<Brand />
					<Link href="/peliculas" className="text-sm text-[#b9ced1] transition hover:text-white">Volver a películas</Link>
				</div>
			</nav>
		);
	}

	return (
		<nav className="bg-[#102f43] text-white">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
				<Brand />
				<div className="hidden items-center gap-8 text-sm text-[#b9ced1] md:flex">
					<Link href="/peliculas" className="text-white">Películas</Link>
					<a href="#generos" className="transition hover:text-white">Géneros</a>
				</div>
				
			</div>
		</nav>
	);
}

function Brand() {
	return (
		<Link href="/" className="text-xl font-bold tracking-tight">
			cine<span className="text-[#19c5a5]">.</span>
		</Link>
	);
}
