import { fetchGroups } from "@/lib/apiFetches";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const groupsData = await fetchGroups();
	return NextResponse.json(groupsData);
}