import { serverFastify } from "./infrastructure/http/fastify/main";
import { serverNestJs } from "./infrastructure/http/nestjs/main";

//uso fastify
serverFastify.listen({ port: 3000 });

//uso nestjs
//serverNestJs();
