import { FastifyInstance, HookHandlerDoneFunction } from "fastify";
import { updateMastered } from "../middlewares/algo";
import * as algoController from "../controllers/algo";
import * as algoSchema from "../schemas/algoSchema";

export default function (
  server: FastifyInstance,
  options,
  done: HookHandlerDoneFunction
) {
  server.get(
    "/userprogress/:userId",
    { schema: algoSchema.getProgressSchema, attachValidation: true },
    algoController.getUserProgress
  );

  server.get(
    "/userdata/:userId/:language/:level",
    { schema: algoSchema.getDataSchema, attachValidation: true },
    algoController.getLeitnerData
  );

  server.get(
    "/learnData/:userId/:lang",
    algoController.getLeitnerProgressForLearn
  );

  server.post(
    "/initialize",
    { schema: algoSchema.initSchema, attachValidation: true },
    algoController.initializeLeitner
  );

  //TODO:
  server.post(
    "/post",
    { schema: algoSchema.postSchema, preHandler: updateMastered },
    algoController.postLeitnerData
  );

  done();
}
