CREATE TABLE "link" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"expiration" timestamp,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"project_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "link" ADD CONSTRAINT "link_project_id_user_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;