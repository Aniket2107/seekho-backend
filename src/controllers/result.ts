import { FastifyReply, FastifyRequest } from "fastify";

import Result from "../models/resultModel";
import { addQuiz, getQuiz } from "../types";

export const addData = async (
  request: FastifyRequest<{ Body: addQuiz }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  const langAndLevelExists = await Result.findOne({
    userId: request.body.userId,
    language: request.body.language,
    level: request.body.level,
  });

  const payload = {
    score: request.body.score,
    date: new Date(),
    quizData: request.body.data,
  };

  if (langAndLevelExists) {
    langAndLevelExists.attemps.push(payload);
    await langAndLevelExists.updateOne(langAndLevelExists);
    return reply.code(200).send({ success: true, msg: "Quiz data added" });
  }

  const newResult = new Result({
    userId: request.body.userId,
    language: request.body.language,
    level: request.body.level,
    attemps: [payload],
  });
  const savedResult = await newResult.save();

  if (!savedResult) {
    return reply
      .code(500)
      .send({ success: false, msg: "Something went wrong, Try again" });
  }

  reply.code(200).send({ success: true, msg: "Data saved" });
};

export const getUserQuiz = async (
  request: FastifyRequest<{ Body: getQuiz }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  const langAndLevelExists = await Result.findOne({
    userId: request.body.userId,
    language: request.body.language,
    level: request.body.level,
  });

  if (langAndLevelExists && langAndLevelExists.attemps.length > 0) {
    return reply
      .code(200)
      .send({ success: true, data: langAndLevelExists.attemps });
  } else {
    reply.code(404).send({ success: false, msg: "Data not found" });
  }
};
