// lib/bootstrap.ts

import { startCron } from "./startCron";

let initialized = false;

export function bootstrap() {
	if (initialized) return;

	initialized = true;

	startCron();
}