"use client";

import { useMemo } from "react";
import StadiumMap from "./components/StadiumMap";
import { STADIUMS } from "@/lib/constants";

export default function StadiumsPage() {
	const sortedStadiums = useMemo(
		() =>
			[...STADIUMS].sort(
				(a, b) => b.capacity - a.capacity
			),
		[STADIUMS]
	);

	const totalCapacity = useMemo(
		() =>
			STADIUMS.reduce(
				(sum, stadium) =>
					sum + stadium.capacity,
				0
			),
		[STADIUMS]
	);

	const averageCapacity = useMemo(
		() =>
			STADIUMS.length
				? Math.round(
					totalCapacity /
					STADIUMS.length
				)
				: 0,
		[STADIUMS, totalCapacity]
	);

	if (!STADIUMS.length) {
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

	return (
		<div className="mx-auto flex max-w-7xl flex-col gap-8 p-6">
			<StadiumMap />
		</div>
	);
}