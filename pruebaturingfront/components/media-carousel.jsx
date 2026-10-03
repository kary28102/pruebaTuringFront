"use client";

import Link from "next/link";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

function MediaCard({ item, imageShape, cardVariant, cardClassName = "" }) {
	const isCircular = imageShape === "circle";
	const isFeatured = cardVariant === "featured";
	const isImageOnly = cardVariant === "image-only";
	const content = (
		<div className={isFeatured ? "flex gap-4" : undefined}>
			<div className={`${isImageOnly ? "aspect-[2/3] rounded-xl" : isFeatured ? "h-28 w-20 shrink-0 rounded-lg" : isCircular ? "aspect-square rounded-full" : "aspect-[4/5]"} overflow-hidden bg-[#163f52]`}>
				<img
					src={item.image}
					alt={item.alt ?? item.title}
					className={`h-full w-full object-cover transition duration-500 group-hover:scale-105${isCircular ? " rounded-full" : isFeatured ? " rounded-lg" : isImageOnly ? " rounded-xl" : ""}`}
				/>
			</div>
			{!isImageOnly && <div className={isFeatured ? "min-w-0" : "min-h-28 bg-[#0d2a3c] p-4"}>
				{(item.eyebrow || isFeatured) && <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#19c5a5]">{item.eyebrow ?? "Película destacada"}</p>}
				<h3 className="mt-1 truncate font-semibold text-white">{item.title}</h3>
				{item.subtitle && <p className="mt-1 min-h-[4.5rem] line-clamp-3 text-sm leading-6 text-[#9bb4bb]">{item.subtitle}</p>}
				{isFeatured && item.rating != null && <p className="mt-3 flex items-center gap-1 text-sm font-semibold text-[#f6c85f]"><span aria-hidden="true">★</span>{item.rating}</p>}
				{item.description && <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#b9ced1]">{item.description}</p>}
			</div>}
		</div>
	);

	const defaultCardClassName = `group block overflow-hidden rounded-2xl border border-[#214457]${isFeatured ? " bg-[#0d2a3c] p-4" : isImageOnly ? " border-0" : ""} transition hover:-translate-y-1 hover:border-[#19c5a5]`;
	const finalCardClassName = `${defaultCardClassName} ${cardClassName}`;
	return item.href ? <Link href={item.href} className={finalCardClassName}>{content}</Link> : <div className={finalCardClassName}>{content}</div>;
}

export default function MediaCarousel({
	items,
	id,
	eyebrow,
	title,
	description,
	sectionClassName = "border-t border-[#183c4e] bg-[#102f43]",
	ariaLabel = "Carrusel",
	className = "",
	imageShape = "default",
	cardVariant = "default",
	cardClassName = "",
	itemsPerView,
}) {
	if (!items?.length) return null;

	const itemBasis = cardVariant === "image-only"
		? "basis-1/2 sm:basis-1/3 lg:basis-1/4"
		: itemsPerView === 3
			? "basis-full sm:basis-1/2 lg:basis-1/3"
			: items.length <= 3
			? "basis-full sm:basis-1/2 lg:basis-1/3"
			: cardVariant === "featured"
				? "basis-full md:basis-1/2"
				: "basis-full sm:basis-1/2 lg:basis-1/4";

	return (
		<section id={id} className={`${sectionClassName} ${className} px-5 py-16 sm:px-8`}>
			<div className="mx-auto max-w-7xl">
				<div className="mb-8 max-w-xl">
					{eyebrow && <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#19c5a5]">{eyebrow}</p>}
					<h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{title}</h2>
					{description && <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#9bb4bb]">{description}</p>}
				</div>
				<Carousel opts={{ align: "start", loop: items.length > 3 }} className="mx-8 sm:mx-10" aria-label={ariaLabel}>
					<CarouselContent className="-ml-4">
						{items.map((item) => (
							<CarouselItem key={item.id ?? item.title} className={`${itemBasis} pl-4`}>
								<MediaCard item={item} imageShape={imageShape} cardVariant={cardVariant} cardClassName={cardClassName} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious aria-label="Elemento anterior" className="-left-8 border-[#315365] bg-[#12354a] text-white hover:bg-[#19c5a5] sm:-left-10" />
					<CarouselNext aria-label="Elemento siguiente" className="-right-8 border-[#315365] bg-[#12354a] text-white hover:bg-[#19c5a5] sm:-right-10" />
				</Carousel>
			</div>
		</section>
	);
}
