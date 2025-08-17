import { FastifyInstance } from "fastify";
import {
	createUserRequestSchema,
	createUserResponseSchema,
	getUserByIdRequestSchema,
	getUserByIdResponseSchema,
} from "./user.schema.ts";
import { Type } from "@sinclair/typebox";
import { createUser, getUserById } from "./user.controller.ts";

export async function userRoutes(app: FastifyInstance) {
	app.post("/", {
		schema: {
			body: createUserRequestSchema,
			response: {
				201: Type.Object(
					{
						id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
						status: Type.Boolean({ default: true }),
						message: Type.String(),
						data: createUserResponseSchema,
					},
					{ description: "Created" }
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
		handler: createUser,
	});

	app.get("/:id", {
		schema: {
			params: getUserByIdRequestSchema,
			response: {
				200: Type.Object({
					id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
					status: Type.Boolean({ default: true }),
					message: Type.String(),
					data: getUserByIdResponseSchema,
				}),
				500: Type.Object({
					id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
					status: Type.Boolean({ default: false }),
					message: Type.String(),
					data: Type.Null(),
				}),
			},
		},
		handler: getUserById,
	});
}
