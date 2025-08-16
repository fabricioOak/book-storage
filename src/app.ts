import fastify from "fastify";
import { randomUUID } from "node:crypto";
import {
	TypeBoxTypeProvider,
	TypeBoxValidatorCompiler,
} from "@fastify/type-provider-typebox";
import { fastifySwagger } from "@fastify/swagger";
import scalarAPIReference from "@scalar/fastify-api-reference";
import routes from "./routes/index.ts";

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

server.setValidatorCompiler(TypeBoxValidatorCompiler);

server.register(routes, { prefix: "/api" });

export { server };
