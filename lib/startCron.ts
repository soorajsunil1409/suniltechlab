import cron from "node-cron";
import { refreshWorldCupData } from "@/lib/refreshWorldCupData";

let started = false;

let running = false;

async function refresh() {
	if (running) return;

	running = true;

	try {
		await refreshWorldCupData();
		console.log("Snapshot refreshed");
	} catch (error) {
		console.error(error);
	} finally {
		running = false;
	}
}

export function startCron() {
	if (started) return;

	started = true;

	console.log("World Cup cron started");

	refresh();

	cron.schedule("*/30 * * * * *", refresh);
}