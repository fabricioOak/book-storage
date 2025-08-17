import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { users } from "../database/schema.ts";
import { eq } from "drizzle-orm";

export async function getUserByEmail(db: NodePgDatabase, email: string) {
	const result = await db.select().from(users).where(eq(users.email, email));

	return result.length > 0 ? result[0] : null;
}
