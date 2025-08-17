import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import {
	TypeBoxTypeProvider,
	TypeBoxValidatorCompiler,
} from "@fastify/type-provider-typebox";
import { fastifySwagger } from "@fastify/swagger";
import scalarAPIReference from "@scalar/fastify-api-reference";
import routes from "./routes/index.ts";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fCookie from "@fastify/cookie";

const jwtSecret = String(process.env.JWT_SECRET);
const cookieSecret = String(process.env.COOKIE_SECRET);

const server = fastify({
	genReqId: () => randomUUID(),
	logger: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
}).withTypeProvider<TypeBoxTypeProvider>();
server.setValidatorCompiler(TypeBoxValidatorCompiler);

if (process.env.NODE_ENV === "development") {
	server.register(fastifySwagger, {
		openapi: {
			info: {
				title: "Book Storage API",
				version: "0.0.1",
			},
		},
	});

	server.register(scalarAPIReference, {
		routePrefix: "/docs",
	});
}

server.register(fjwt, {
	secret: jwtSecret,
});

server.decorate(
	"authenticate",
	async (req: FastifyRequest, reply: FastifyReply) => {
		const token = req.cookies.access_token;

		if (!token) {
			return reply.status(401).send({
				message: "Unauthorized",
			});
		}

		const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
		req.user = decoded;
	}
);

server.register(routes, { prefix: "/api" });

server.addHook("preHandler", (req, reply, next) => {
	req.jwt = server.jwt;
	return next();
});

server.register(fCookie, {
	secret: cookieSecret,
	hook: "preHandler",
});

export { server };
