import { Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { login, logout } from "../auth/auth.controller.ts";
import { loginRequestSchema, loginResponseSchema } from "./auth.schema.ts";

export async function authRoutes(app: FastifyInstance) {
	app.post("/login", {
		schema: {
			body: loginRequestSchema,
			response: {
				200: Type.Object(
					{
						id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
						status: Type.Boolean({ default: true }),
						message: Type.String(),
						data: loginResponseSchema,
					},
					{ description: "Successful" }
				),
				500: Type.Object(
					{
						id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
						status: Type.Boolean({ default: false }),
						message: Type.String(),
						data: Type.Null(),
					},
					{ description: "Internal Server Error" }
				),
			},
		},
		handler: login,
	});

	app.delete("/logout", {
		preHandler: [app.authenticate],
		handler: logout,
	});
}
