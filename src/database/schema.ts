import { uuid, text, pgEnum, pgTable } from "drizzle-orm/pg-core";
import { EUserGender, EUserRoles } from "../enums/user.ts";
import { enumToPgEnum } from "../utils/drizzleUtils.ts";

export const userRole = pgEnum("user_role", enumToPgEnum(EUserRoles));
export const userGender = pgEnum("user_gender", enumToPgEnum(EUserGender));

export const users = pgTable("users", {
	id: uuid().primaryKey().defaultRandom(),
	legalName: text("legal_name").notNull(),
	socialName: text("social_name"),
	email: text().notNull().unique(),
	password: text().notNull(),
	role: userRole().notNull().default(EUserRoles.Student),
	document: text().notNull(),
	gender: userGender().notNull(),
	birthDate: text("birth_date").notNull(),
});
