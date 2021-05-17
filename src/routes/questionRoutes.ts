import * as qstControllers from "../controllers/question";
import * as qstSchemas from "../schemas/questionSchema";

export default function (server, options, done) {
  server.get(
    "/:id",
    { schema: qstSchemas.getQuestionsById, attachValidation: true },
    qstControllers.getQuestionById
  );
  server.get(
    "/",
    { schema: qstSchemas.getquestions, attachValidation: true },
    qstControllers.getQuestions
  );

  server.post(
    "/",
    { schema: qstSchemas.addQuestion, attachValidation: true },
    qstControllers.addQuestion
  );
  server.post(
    "/quiz",
    { schema: qstSchemas.genQuiz, attachValidation: true },
    qstControllers.generateQuiz
  );

  server.put(
    "/:id",
    { schema: qstSchemas.editQuestion, attachValidation: true },
    qstControllers.updateQuestion
  );

  server.delete(
    "/:id",
    { schema: qstSchemas.editQuestion, attachValidation: true },
    qstControllers.removeQuestion
  );

  done();
}
