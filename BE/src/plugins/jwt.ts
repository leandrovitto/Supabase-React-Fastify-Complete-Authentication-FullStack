import fp from "fastify-plugin";
import jwt from "@fastify/jwt";

export default fp(async (fastify, opts) => {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET, //TODO config env fastify
  });

  fastify.decorate(
    "authenticate",
    async function (
      request: { jwtVerify: () => any },
      reply: { send: (arg0: unknown) => void }
    ) {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
});

declare module "fastify" {
  export interface FastifyInstance {
    authenticate(
      request: { jwtVerify: () => any },
      reply: { send: (arg0: unknown) => void }
    ): Promise<void>;
  }
}
