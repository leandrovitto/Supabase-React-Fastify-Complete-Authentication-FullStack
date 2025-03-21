import { FastifyPluginAsync } from "fastify";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return reply.code(200).send({ message: "Hello World" });
  });
};

export default example;
