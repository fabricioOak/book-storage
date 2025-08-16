import { MySqlColumnBuilderWithAutoIncrement } from "drizzle-orm/mysql-core";
import { uuid, text, pgEnum, pgTable } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["manager", "student", "teacher"]);
export const userGender = pgEnum("user_gender", ["male", "female", "other"]);

export const users = pgTable("users", {
	id: uuid().primaryKey().defaultRandom(),
	legalName: text("legal_name").notNull(),
	socialName: text("social_name"),
	email: text().notNull().unique(),
	password: text().notNull(),
	role: userRole().notNull().default("student"),
	document: text().notNull(),
	gender: userGender().notNull(),
	birthDate: text("birth_date").notNull(),
});
