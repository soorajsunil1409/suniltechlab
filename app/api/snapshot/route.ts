// app/api/snapshot/route.ts

import { NextResponse } from "next/server";
import { getSnapshot } from "@/lib/getSnapshot";

export async function GET() {
	const snapshot = await getSnapshot();

	if (!snapshot) {
		return NextResponse.json(
			{
				games: [],
				groups: [],
				teams: [],
			},
			{ status: 404 }
		);
	}

	return NextResponse.json(snapshot);
}