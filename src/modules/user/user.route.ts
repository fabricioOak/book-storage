import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
	createUserRequestSchema,
	createUserResponseSchema,
} from "./user.schema.ts";
import { Type } from "@sinclair/typebox";
import { createUser } from "./user.controller.ts";

export async function userRoutes(app: FastifyInstance) {
	app.get("/", (req: FastifyRequest, reply: FastifyReply) => {
		reply.send({
			message: "Hello World",
		});
	});

	app.post("/register", {
		schema: {
			body: createUserRequestSchema,
			response: {
				201: createUserResponseSchema,
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
}
