import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserRequest, GetUserByIdRequest } from "./user.schema.ts";
import * as argon2 from "argon2";
import { db } from "../../database/client.ts";
import { users } from "../../database/schema.ts";
import { eq } from "drizzle-orm";
import { formatDateToISO } from "../../utils/dateFormatter.ts";

// Create User
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

// Get User By Id
export const getUserById = async (
	req: FastifyRequest<{
		Params: GetUserByIdRequest;
	}>,
	reply: FastifyReply
) => {
	const { id } = req.params;

	try {
		const result = await db
			.select({
				id: users.id,
				email: users.email,
				legalName: users.legalName,
				role: users.role,
				birthDate: users.birthDate,
				document: users.document,
				gender: users.gender,
			})
			.from(users)
			.where(eq(users.id, id));

		if (result.length === 0) {
			return reply.code(404).send({
				id: null,
				status: false,
				message: "User not found",
				data: null,
			});
		}

		return reply.code(200).send({
			id,
			status: true,
			message: "User retrieved successfully",
			data: result[0],
		});
	} catch (err) {
		return reply.code(500).send({
			id: null,
			status: false,
			message: err instanceof Error ? err.message : "Internal server error",
			data: null,
		});
	}
};
