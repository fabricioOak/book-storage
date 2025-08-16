import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserRequest } from "./user.schema.ts";
import * as argon2 from "argon2";
import { db } from "../../database/client.ts";
import { users } from "../../database/schema.ts";
import { eq } from "drizzle-orm";
import { formatDateToISO } from "../../utils/dateFormatter.ts";

export const createUser = async (
	req: FastifyRequest<{
		Body: CreateUserRequest;
	}>,
	reply: FastifyReply
) => {
	const body = req.body;

	try {
		const existingUser = await db
			.select()
			.from(users)
			.where(eq(users.email, body.email));

		if (existingUser.length > 0) {
			return reply.code(401).send({
				message: "User already exists",
			});
		}

		const hash = await argon2.hash(body.password);
		const formatedDate = formatDateToISO(body.birthDate);
		const result = await db
			.insert(users)
			.values({
				...body,
				password: hash,
				birthDate: formatedDate,
			})
			.returning();

		reply.code(201).send({
			id: result[0].id,
		});
	} catch (err) {
		return reply.code(500).send({
			id: null,
			status: false,
			message: err,
			data: null,
		});
	}
};
