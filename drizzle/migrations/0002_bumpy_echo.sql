CREATE TABLE "seo" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"link_id" text NOT NULL,
	CONSTRAINT "seo_link_id_unique" UNIQUE("link_id")
);
--> statement-breakpoint
ALTER TABLE "seo" ADD CONSTRAINT "seo_link_id_link_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."link"("id") ON DELETE cascade ON UPDATE no action;