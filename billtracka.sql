drop table users cascade;
drop table invoices cascade;
drop table items cascade;
drop table tasks cascade;
drop type p_method cascade;
drop type p_status cascade;

CREATE TYPE "p_method" AS ENUM (
  'CARD',
  'TRANSFER',
  'BANK'
);

CREATE TYPE "p_status" AS ENUM (
  'PAID',
  'DEPOSIT',
  'UNPAID'
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "first_name" varchar(255),
  "last_name" varchar(255),
  "email" varchar(255) UNIQUE,
  "phone" varchar(20) UNIQUE,
  "hashed_password" varchar(255) NOT NULL,
  "refresh_token" varchar(1000),
  "verification_token" varchar(1000),
  "google_id" varchar(255),
  "github_id" varchar(255),
  "is_verified" boolean DEFAULT 'false',
  "created_at" timestamp DEFAULT (now()),
  "business_name" varchar(500)
);

CREATE TABLE "invoices" (
  "id" uuid PRIMARY KEY,
  "invoice_number" varchar(255),
  "issue_date" Date,
  "due_date" Date,
  "notes" varchar(1000),
  "payment_mode" p_method,
  "status" p_status,
  "client_name" varchar(255) NOT NULL,
  "client_email" varchar(255),
  "client_phone" varchar(255),
  "client_address" varchar(255),
  "client_state" varchar(255),
  "client_city" varchar(255),
  "client_country" varchar(255),
  "client_lga" varchar(255),
  "amount_paid" float,
  "amount_due" float,
  "discount" float,
  "total" float,
  "ref_id" varchar(255),
  "owner_id" uuid,
  "payment_link" varchar(1000),
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "items" (
  "id" uuid PRIMARY KEY,
  "item_name" varchar(1000),
  "unit_price" float,
  "quantity" int,
  "discount" float,
  "user_id" uuid
);

CREATE TABLE "invoice_items" (
  "invoice_id" uuid,
  "item_id" uuid,
  "quantity" int NOT NULL,
  PRIMARY KEY ("invoice_id", "item_id")
);

CREATE TABLE "tasks" (
  "id" uuid PRIMARY KEY,
  "task_title" varchar(255),
  "task_description" varchar(1000),
  "start_date" Date,
  "end_date" Date,
  "completed" boolean,
  "user_id" uuid
);

ALTER TABLE "invoices" ADD FOREIGN KEY ("owner_id") REFERENCES "users" ("id");

ALTER TABLE "items" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "invoice_items" ADD FOREIGN KEY ("invoice_id") REFERENCES "invoices" ("id");

ALTER TABLE "invoice_items" ADD FOREIGN KEY ("item_id") REFERENCES "items" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
