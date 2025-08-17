import { FastifyInstance } from "fastify";
import { userRoutes } from "../modules/user/user.route.ts";
import { authRoutes } from "../modules/auth/auth.route.ts";

export default async function (app: FastifyInstance) {
	await app.register(userRoutes, { prefix: "/users" });
	await app.register(authRoutes, { prefix: "/auth" });
}
