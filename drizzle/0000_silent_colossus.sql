CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`provider` text NOT NULL,
	`provider_id` text NOT NULL,
	`name` text NOT NULL,
	`icon` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_provider_id_unique` ON `users` (`provider_id`);