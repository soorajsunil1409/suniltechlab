// app/api/refresh/route.ts

import { NextResponse } from "next/server";
import { refreshWorldCupData } from "@/lib/refreshWorldCupData";

export async function GET() {
	try {
		await refreshWorldCupData();

		return NextResponse.json({
			success: true,
		});
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error
						? error.message
						: "Unknown error",
			},
			{
				status: 500,
			}
		);
	}
}