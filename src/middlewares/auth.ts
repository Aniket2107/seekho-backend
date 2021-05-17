import fp from "fastify-plugin";

module.exports = fp(function (fastify, options, done) {
  fastify.decorate("authenticate", async (req, res) => {
    try {
      await req.jwtVerify();
    } catch (error) {
      res.status(401).send({ success: false, msg: error.message });
    }
  });

  done();
});
