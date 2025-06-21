CREATE TABLE "price_history" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "price_history_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"target_date" date NOT NULL,
	"currency_type" text NOT NULL,
	"source" text NOT NULL,
	"price" numeric NOT NULL
);
