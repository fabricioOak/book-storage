import fastify from "fastify";
import {
	TypeBoxTypeProvider,
	TypeBoxValidatorCompiler,
} from "@fastify/type-provider-typebox";
import { randomUUID } from "node:crypto";

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

server
	.listen({
		port: 3333,
		host: "0.0.0.0",
	})
	.then(() => {
		console.log("HTTP Server Running!");
	});
