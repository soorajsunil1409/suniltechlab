import cron from "node-cron";
import { refreshWorldCupData } from "@/lib/refreshWorldCupData";

let started = false;

export function startCron() {
	if (started) return;

	started = true;

	console.log("World Cup cron started");

	// Run immediately
	refreshWorldCupData().catch(console.error);

	let isRefreshing = false;

	// Then every 5 minutes
	cron.schedule("*/1 * * * *", async () => {
		if (isRefreshing) return;

		isRefreshing = true;

		try {
			await refreshWorldCupData();
			console.log("Snapshot refreshed");
		} catch (error) {
			console.error(error);
		} finally {
			isRefreshing = false;
		}
	});
}