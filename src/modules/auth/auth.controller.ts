import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../../database/client.ts";
import * as argon2 from "argon2";
import { LoginRequest } from "./auth.schema.ts";
import { getUserByEmail } from "../../utils/userUtils.ts";

export const login = async (
	req: FastifyRequest<{
		Body: LoginRequest;
	}>,
	reply: FastifyReply
) => {
	const body = req.body;

	try {
		const existingUser = await getUserByEmail(db, body.email);

		const isMatch =
			existingUser &&
			(await argon2.verify(existingUser.password, body.password));

		if (!existingUser || !isMatch) {
			return reply.code(401).send({
				message: "Invalid email or password",
			});
		}

		const payload = {
			id: existingUser.id,
			email: existingUser.email,
			role: existingUser.role,
		};

		const token = req.jwt.sign(payload);

		reply.setCookie("access_token", token, {
			path: "/",
			httpOnly: true,
			secure: true,
		});

		return reply.code(200).send({
			id: existingUser.id || null,
			status: true,
			message: "Login successful",
			data: { accessToken: token },
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

export const logout = async (req: FastifyRequest, reply: FastifyReply) => {
	reply.clearCookie("access_token", {
		path: "/",
		httpOnly: true,
		secure: true,
	});
	return reply.code(200).send({
		id: null,
		status: true,
		message: "Logout successful",
		data: null,
	});
};
