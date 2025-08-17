import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { users } from "../../database/schema.ts";
import { Type, type Static } from "@sinclair/typebox";

// Schemas for request and response
const createUserRequestSchema = createInsertSchema(users);
const createUserResponseSchema = Type.Object({
	id: Type.String(),
});

const getUserByIdRequestSchema = Type.Object({
	id: Type.String(),
});

const getUserByIdResponseSchema = createSelectSchema(users, {
	password: Type.Optional(Type.String()),
	socialName: Type.Optional(Type.String()),
});

// Static Types
type CreateUserRequest = Static<typeof createUserRequestSchema>;
type CreateUserResponse = Static<typeof createUserResponseSchema>;

type GetUserByIdRequest = Static<typeof getUserByIdRequestSchema>;
type GetUserByIdResponse = Static<typeof getUserByIdResponseSchema>;

// Exports
export {
	// Schemas
	createUserRequestSchema,
	createUserResponseSchema,
	getUserByIdRequestSchema,
	getUserByIdResponseSchema,

	// Types
	CreateUserRequest,
	CreateUserResponse,
	GetUserByIdRequest,
	GetUserByIdResponse,
};
