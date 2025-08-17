import { JWT } from "@fastify/jwt";
import { EUserRoles } from "../enums/user.ts";

declare module "fastify" {
	interface FastifyRequest {
		jwt: JWT;
	}
	export interface FastifyInstance {
		authenticate: any;
	}
}

type UserPayload = {
	id: string;
	email: string;
	name: string;
	role: EUserRoles;
};

declare module "@fastify/jwt" {
	interface FastifyJWT {
		user: UserPayload;
	}
}
