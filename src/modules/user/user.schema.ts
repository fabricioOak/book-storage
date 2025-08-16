import { createInsertSchema } from "drizzle-typebox";
import { users } from "../../database/schema.ts";
import { Type, type Static } from "@sinclair/typebox";

// Schemas
export const createUserRequestSchema = createInsertSchema(users);
export const createUserResponseSchema = Type.Object({
	id: Type.String(),
});

// Static Types
type CreateUserRequest = Static<typeof createUserRequestSchema>;
type CreateUserResponse = Static<typeof createUserResponseSchema>;

export { CreateUserRequest, CreateUserResponse };
