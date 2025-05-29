ALTER TABLE "link" RENAME COLUMN "project_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "link" DROP CONSTRAINT "link_project_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "link" ADD CONSTRAINT "link_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;