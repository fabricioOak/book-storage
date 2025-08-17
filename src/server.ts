import { server } from "./app.ts";

server
	.listen({
		port: Number(process.env.PORT),
		host: "0.0.0.0",
	})
	.then(() => {
		console.log("HTTP Server Running!");
	});
