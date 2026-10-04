import { Star } from "lucide-react";
import CineNav from "@/components/cine-nav";
import SiteFooter from "@/components/site-footer";
import AppSidebar from "@/components/appSidebar";

export default function PeliculaInformacion({ movie }) {
	return (
		<AppSidebar>
			<main className="min-h-screen bg-[#102f43] text-[#eaf5f3]">
				<section className="mx-auto grid max-w-5xl gap-8 px-5 py-10 sm:grid-cols-[minmax(220px,300px)_1fr] sm:px-8 sm:py-16">
					<div className="overflow-hidden rounded-2xl border border-[#214457] bg-[#163346] shadow-xl shadow-[#061a2a]/20">
						<img src={movie.image} alt={`Poster de ${movie.title}`} className="aspect-2/3 h-full w-full object-cover" />
					</div>
					<div className="flex flex-col justify-center">
						<p className="text-xs font-bold uppercase tracking-[0.22em] text-[#19c5a5]">Información de la película</p>
						<h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">{movie.title}</h1>
						<div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#b9ced1]">
							<span>{movie.year}</span>
							<span>{movie.genre}</span>
							<span className="flex items-center gap-1 font-semibold text-[#f6c85f]"><Star className="h-4 w-4 fill-current" />{movie.rating}/10</span>
						</div>
						<div className="mt-8 border-t border-[#214457] pt-6">
							<h2 className="text-lg font-semibold text-white">Sinopsis</h2>
							<p className="mt-3 max-w-2xl text-base leading-7 text-[#b9ced1]">{movie.description}</p>
						</div>
					</div>
				</section>
				<SiteFooter />
			</main>
		</AppSidebar>
	);
}
