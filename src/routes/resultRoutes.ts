import * as resultControllers from "../controllers/result";
import * as resultSchema from "../schemas/resultSchema";

export default function (server, options, done) {
  server.post(
    "/get/user-quiz",
    { schema: resultSchema.getUserQuiz, attachValidation: true },
    resultControllers.getUserQuiz
  );

  server.post(
    "/post/user-quiz",
    { schema: resultSchema.postResult, attachValidation: true },
    resultControllers.addData
  );

  done();
}
