"use client";

import { useMemo } from "react";
import { useWorldCupStore } from "@/store/worldCupStore";
import Image from "next/image";
import StadiumMap from "./components/StadiumMap";

export default function StadiumsPage() {
	const { stadiums } = useWorldCupStore();

	const sortedStadiums = useMemo(
		() =>
			[...stadiums].sort(
				(a, b) => b.capacity - a.capacity
			),
		[stadiums]
	);

	const totalCapacity = useMemo(
		() =>
			stadiums.reduce(
				(sum, stadium) =>
					sum + stadium.capacity,
				0
			),
		[stadiums]
	);

	const averageCapacity = useMemo(
		() =>
			stadiums.length
				? Math.round(
					totalCapacity /
					stadiums.length
				)
				: 0,
		[stadiums, totalCapacity]
	);

	if (!stadiums.length) {
		return (
			<div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
				<div className="flex flex-col items-center gap-3 rounded-3xl border bg-white p-12 shadow-sm">
					<h1 className="text-3xl font-bold">
						No Stadium Data
					</h1>

					<p className="text-gray-500">
						Stadium information is
						currently unavailable.
					</p>
				</div>
			</div>
		);
	}

	const largestStadium = sortedStadiums[0];

	return (
		<div className="mx-auto flex max-w-7xl flex-col gap-8 p-6">
			<StadiumMap stadiums={sortedStadiums} />
		</div>
	);
}