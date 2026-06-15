"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Stadium } from "@/types/worldCupTypes";
import { STADIUMS } from "@/lib/constants";
import { projectToMap } from "@/lib/utils";

export default function StadiumMap() {
	const [selected, setSelected] =
		useState<Stadium | null>(null);

	const [hovered, setHovered] =
		useState<string | null>(null);

	const stadiums = useMemo(() => {
		return STADIUMS
	}, [STADIUMS]);

	useEffect(() => {
		if (
			!selected &&
			stadiums.length > 0
		) {
			setSelected(stadiums[0]);
		}
	}, [stadiums, selected]);

	if (!stadiums.length) {
		return null;
	}

	return (
		<div className="grid gap-6 lg:grid-cols-[1fr_450px]">
			<div className="rounded-3xl border border-neutral-200 bg-white shadow-lg">
	<div className="p-6">
		<h2 className="text-2xl font-bold">
			Host Cities Map
		</h2>

		<p className="mt-1 text-sm text-neutral-500">
			Click a marker to view stadium details
		</p>
	</div>

	<div className="p-4">
		<div
			className="relative mx-auto w-full max-w-7xl"
			style={{
				aspectRatio: "1536 / 726",
			}}
		>
			<Image
				src="/stadiums/map.svg"
				alt="North America"
				fill
				priority
				className="pointer-events-none"
			/>

			{stadiums.map((stadium) => {
				const { left, top } =
					projectToMap(
						stadium.lat,
						stadium.lon
					);

				return (
					<div
						key={stadium.id}
						onClick={() =>
							setSelected(stadium)
						}
						onMouseEnter={() =>
							setHovered(stadium.id)
						}
						onMouseLeave={() =>
							setHovered(null)
						}
						className={`group absolute cursor-pointer ${
							hovered === stadium.id
								? "z-[9999]"
								: "z-10"
						}`}
						style={{
							left: `${left}%`,
							top: `${top}%`,
							transform:
								"translate(-50%, -50%)",
						}}
					>
						<div className="relative">
							<div
								className={`absolute inset-0 rounded-full animate-ping ${
									selected?.id ===
									stadium.id
										? "bg-red-500/50"
										: "bg-red-400/30"
								}`}
							/>

							<div
								className={`relative h-3 w-3 rounded-full border-2 border-white shadow-lg transition-all ${
									selected?.id ===
									stadium.id
										? "scale-125 bg-red-600"
										: "bg-red-500"
								}`}
							/>
						</div>

						<div
							className={`pointer-events-none absolute left-1/2 top-5 z-[10000] w-56 -translate-x-1/2 overflow-hidden rounded-xl border bg-white shadow-2xl transition-all duration-150 ${
								hovered === stadium.id
									? "visible opacity-100"
									: "invisible opacity-0"
							}`}
						>
							<Image
								src={`/stadiums/${stadium.id}.jpg`}
								alt={
									stadium.name_en
								}
								width={300}
								height={180}
								className="h-28 w-full object-cover"
							/>

							<div className="p-3">
								<p className="font-semibold">
									{
										stadium.name_en
									}
								</p>

								<p className="text-xs text-neutral-500">
									{
										stadium.city_en
									}
									,{" "}
									{
										stadium.country_en
									}
								</p>

								<p className="mt-2 text-xs font-medium text-red-500">
									Capacity:{" "}
									{stadium.capacity.toLocaleString()}
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	</div>
</div>

			<div className="overflow-hidden rounded-3xl border bg-white shadow-lg">
				{selected && (
					<>
						<div className="relative h-72">
							<Image
								src={`/stadiums/${selected.id}.jpg`}
								alt={
									selected.name_en
								}
								fill
								className="object-cover"
							/>

							<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

							<div className="absolute bottom-5 left-5">
								<h2 className="text-3xl font-bold text-white">
									{
										selected.name_en
									}
								</h2>

								<p className="text-white/80">
									{
										selected.city_en
									}
									,{" "}
									{
										selected.country_en
									}
								</p>
							</div>
						</div>

						<div className="space-y-4 p-6">
							<div className="grid grid-cols-2 gap-4">
								<div className="rounded-2xl bg-neutral-100 p-4">
									<p className="text-xs uppercase text-neutral-500">
										Capacity
									</p>

									<p className="mt-1 text-2xl font-bold">
										{selected.capacity.toLocaleString()}
									</p>
								</div>

								<div className="rounded-2xl bg-neutral-100 p-4">
									<p className="text-xs uppercase text-neutral-500">
										Country
									</p>

									<p className="mt-1 text-2xl font-bold">
										{
											selected.country_en
										}
									</p>
								</div>
							</div>

							<div>
								<p className="text-xs uppercase text-neutral-500">
									FIFA Venue Name
								</p>

								<p className="mt-1 text-lg font-semibold">
									{
										selected.fifa_name
									}
								</p>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}