CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"provider_id" varchar(255),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
CREATE TABLE "sessions" (
	"session_id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_user_id_users_user_id_fk"
		FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE
);
CREATE TABLE "experts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) UNIQUE,
	"avatar_key" text,
	"headline" text,
	"title" varchar(255),
	"company" varchar(255),
	"rating" numeric(2,1),
	"review_count" integer DEFAULT 0 NOT NULL,
	"availability" varchar(50),
	"availability_label" varchar(255),
	"bio" text,
	"expertise" jsonb,
	"work_experience" jsonb,
	"education" jsonb,
	"minutes_coached" integer DEFAULT 0 NOT NULL,
	"available_times" jsonb
);
