import fastify from "fastify";
import multer from "fastify-multer";

import * as dotenv from "dotenv";
dotenv.config();

import { options } from "./utils/swagger";

import authRoutes from "./routes/authRoutes";
import vocabRoutes from "./routes/vocabRoutes";
import langRoutes from "./routes/languageRoutes";
import algoRoutes from "./routes/algoRoutes";
import questionRoutes from "./routes/questionRoutes";
import resultRoutes from "./routes/resultRoutes";
import userRoutes from "./routes/userRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";

require("./utils/db");

function createServer() {
  const server = fastify({ logger: true });

  server.register(require("fastify-cors"), {
    origin: true,
  });
  server.register(multer.contentParser);
  server.register(require("fastify-jwt"), {
    secret: process.env.SECRET,
  });
  server.register(require("fastify-swagger"), options);
  server.register(require("./middlewares/auth"));

  server.register(authRoutes, { prefix: "/api/v1/auth" });
  server.register(vocabRoutes, { prefix: "/api/v1/vocab" });
  server.register(langRoutes, { prefix: "/api/v1/lang" });
  server.register(algoRoutes, { prefix: "/api/v1/algo" });
  server.register(questionRoutes, { prefix: "/api/v1/quiz" });
  server.register(resultRoutes, { prefix: "/api/v1/result" });
  server.register(userRoutes, { prefix: "/api/v1/user" });
  server.register(feedbackRoutes, { prefix: "/api/v1/feedbacks" });

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString());
    res.send({ error });
  });

  return server;
}

export default createServer;
