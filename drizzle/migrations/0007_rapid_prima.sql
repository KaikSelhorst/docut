CREATE TABLE "click" (
	"id" text PRIMARY KEY NOT NULL,
	"link_id" text NOT NULL,
	"ip_address" text NOT NULL,
	"user_agent" text,
	"referer" text,
	"country" text,
	"device_type" text,
	"is_unique" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "click" ADD CONSTRAINT "click_link_id_link_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."link"("id") ON DELETE cascade ON UPDATE no action;