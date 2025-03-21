import { FastifyPluginAsync, FastifyRequest } from "fastify";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/me",
    {
      onRequest: [fastify.authenticate],
    },
    async function (request, reply) {
      console.log(request.user);
      return reply.code(200).send({
        user: request.user,
      });
    }
  );

  fastify.post(
    "/sign",
    function (
      request: FastifyRequest<{ Body: { username: string; password: string } }>,
      reply
    ) {
      return reply.jwtSign(request.body).then(function (token) {
        return { token };
      });
    }
  );

  fastify.get("/verify", function (request, reply) {
    // token avaiable via `request.headers.customauthheader` as defined in fastify.register above
    return request.jwtVerify().then(function (decodedToken) {
      return reply.send(decodedToken);
    });
  });
};

export default example;
