"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { Stadium } from "@/types/worldCupTypes";

const STADIUM_META: Record<
	string,
	{
		x: number;
		y: number;
	}
> = {
	"9": { x: 80.03, y: 63.1 },
	"11": { x: 77.3, y: 65.46 },
	"10": { x: 76.5, y: 67 },
	"7": { x: 67.1, y: 75.64 },
	"8": { x: 73.1, y: 84.6 },
	"12": { x: 71.6, y: 62.4 },
	"6": { x: 55, y: 69.24 },
	"4": { x: 50.89, y: 76.52 },
	"5": { x: 52.27, y: 81.1 },
	"3": { x: 46.24, y: 85.22 },
	"1": { x: 46.5, y: 93.2 },
	"2": { x: 40.34, y: 90.88 },
	"16": { x: 26.95, y: 71.26 },
	"15": { x: 23.86, y: 65.06 },
	"14": { x: 29.63, y: 53.19 },
	"13": { x: 29.22, y: 50.77 },
};

interface FullStadium extends Stadium {
	x: number;
	y: number;
}

export default function StadiumMap({
	stadiums,
}: {
	stadiums: Stadium[];
}) {
	const mappedStadiums = useMemo(
		() =>
			stadiums
				.map((stadium) => {
					const meta =
						STADIUM_META[stadium.id];

					if (!meta) return null;

					return {
						...stadium,
						...meta,
					};
				})
				.filter(
					Boolean
				) as FullStadium[],
		[stadiums]
	);

	const [selected, setSelected] =
		useState<FullStadium | null>(
			mappedStadiums[0] ?? null
		);

	if (!mappedStadiums.length)
		return null;

	return (
		<div className="grid gap-6 lg:grid-cols-[1fr_450px]">
			{/* MAP */}
			<div className="overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-4 md:p-6 shadow-lg">
				<div className="mb-4 md:mb-6 bg-white p-4 rounded-xl">
					<h2 className="text-xl md:text-2xl font-bold">
						Host Cities Map
					</h2>

					<p className="text-sm text-neutral-500">
						Tap a marker to view stadium details.
					</p>
				</div>

				<div className="relative mx-auto h-[500px] w-full overflow-hidden rounded-2xl bg-neutral-100">
					{/* MAP */}
					<div className="absolute inset-0">
						<Image
							src="/stadiums/map.svg"
							alt="North America"
							fill
							priority
							className="object-contain scale-[1.5] -translate-y-30"
						/>
					</div>

					{/* MARKERS */}
					<div className="absolute inset-0">
						{mappedStadiums.map((stadium) => (
							<div
								key={stadium.id}
								onClick={() => setSelected(stadium)}
								className={`group absolute cursor-pointer ${selected?.id === stadium.id
									? "z-[9999]"
									: "z-10 hover:z-[9999]"
									}`}
								style={{
									left: `${stadium.x}%`,
									top: `${stadium.y}%`,
									transform: "translate(-50%, -50%)",
								}}
							>
								{/* Glow */}
								{/* <div
									className={`absolute left-1/2 top-1/2 -z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md transition-all ${selected?.id === stadium.id
										? "bg-red-500/60"
										: "bg-red-500/20"
										}`}
								/> */}

								{/* Marker */}
								{/* <MapPin
									className={`relative transition-all duration-200 ${selected?.id === stadium.id
										? "size-6 scale-125 text-red-600"
										: "size-5 text-red-500 hover:scale-110"
										}`}
									strokeWidth={2.5}
									fill={
										selected?.id === stadium.id
											? "currentColor"
											: "white"
									}
								/> */}
								<div className="size-0.5 bg-red-400 rounded-full">

								</div>

								{/* Tooltip */}
								<div className="pointer-events-none absolute left-1/2 top-7 z-[10000] hidden w-56 -translate-x-1/2 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl group-hover:block">
									<Image
										src={`/stadiums/${stadium.id}.jpg`}
										alt={stadium.name_en}
										width={300}
										height={180}
										className="h-28 w-full object-cover"
									/>

									<div className="p-3">
										<p className="line-clamp-1 text-sm font-semibold">
											{stadium.name_en}
										</p>

										<p className="mt-1 text-xs text-neutral-500">
											{stadium.city_en},{" "}
											{stadium.country_en}
										</p>

										<p className="mt-2 text-xs font-medium text-red-500">
											Capacity:{" "}
											{stadium.capacity.toLocaleString()}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* DETAILS PANEL */}
			<div className="overflow-hidden rounded-3xl border bg-white shadow-lg lg:sticky lg:top-6 lg:h-fit">
				{selected && (
					<>
						<div className="relative h-52 md:h-72 overflow-hidden">
							<Image
								src={`/stadiums/${selected.id}.jpg`}
								alt={selected.name_en}
								fill
								className="object-cover"
							/>

							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

							<div className="absolute bottom-4 left-4 md:bottom-5 md:left-5">
								<h2 className="text-xl md:text-3xl font-bold text-white">
									{selected.name_en}
								</h2>

								<p className="text-sm md:text-base text-white/80">
									{selected.city_en}, {selected.country_en}
								</p>
							</div>
						</div>

						<div className="space-y-4 p-4 md:p-6">
							<div className="grid grid-cols-2 gap-3">
								<div className="rounded-2xl bg-neutral-50 p-3 md:p-4">
									<p className="text-xs uppercase text-neutral-500">
										Capacity
									</p>

									<p className="mt-1 text-lg md:text-2xl font-bold">
										{selected.capacity.toLocaleString()}
									</p>
								</div>

								<div className="rounded-2xl bg-neutral-50 p-3 md:p-4">
									<p className="text-xs uppercase text-neutral-500">
										Country
									</p>

									<p className="mt-1 text-lg md:text-2xl font-bold">
										{selected.country_en}
									</p>
								</div>
							</div>

							<div>
								<p className="text-xs uppercase text-neutral-500">
									Host City
								</p>

								<p className="mt-1 text-base md:text-lg font-semibold">
									{selected.city_en}
								</p>
							</div>

							<div>
								<p className="text-xs uppercase text-neutral-500">
									FIFA Venue Name
								</p>

								<p className="mt-1 text-base md:text-lg font-semibold">
									{selected.fifa_name}
								</p>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}