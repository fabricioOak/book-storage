import fastify from "fastify";
import { type userRole } from "../database/schema.ts";

declare module "fastify" {
	export interface FastifyRequest {
		user?: {
			sub: string;
			role: userRole;
		};
	}
}
