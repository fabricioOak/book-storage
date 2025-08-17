import { Type, Static } from "@sinclair/typebox";

const loginRequestSchema = Type.Object({
	email: Type.String(),
	password: Type.String(),
});

const loginResponseSchema = Type.Object({
	accessToken: Type.String(),
});

type LoginRequest = Static<typeof loginRequestSchema>;
type LoginResponse = Static<typeof loginResponseSchema>;

export {
	// Schemas

	loginRequestSchema,
	loginResponseSchema,

	// Types
	LoginRequest,
	LoginResponse,
};
