import { FastifyInstance, HookHandlerDoneFunction } from "fastify";
import { updateMastered } from "../middlewares/algo";
import * as algoController from "../controllers/algo";
import * as algoSchema from "../schemas/algoSchema";

export default function (
  server: FastifyInstance,
  options,
  done: HookHandlerDoneFunction
) {
  // This returns the daily progress
  server.get(
    "/userprogress/:userId",
    { schema: algoSchema.getProgressSchema, attachValidation: true },
    algoController.getUserProgress
  );

  // This will return only user progress for level in percentage
  server.get(
    "/userdata/:userId/:language/:level",
    { schema: algoSchema.getDataSchema, attachValidation: true },
    algoController.getLeitnerData
  );

  //Returns vocab for algo
  server.get(
    "/user-vocab/:userId/:language/:level",
    { schema: algoSchema.userVocabSchema, attachValidation: true },
    algoController.getLeitnerVocab
  );

  //Learn page
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
