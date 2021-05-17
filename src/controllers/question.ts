import { FastifyReply, FastifyRequest } from "fastify";
import Question from "../models/questionModel";

import { genQuiz, params, questionType } from "../types";

export const getQuestionById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  if (request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const question = await Question.findOne({ _id: request.params.id });

    if (!Object.keys(question).length || !question) {
      return reply.code(404).send({ success: false, msg: "Data not found" });
    }

    reply.code(200).send({ success: true, data: question, msg: "Data found" });
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid id" });
  }
};

export const getQuestions = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  const questions = await Question.find();

  if (!questions || questions.length === 0) {
    return reply.code(404).send({ success: false, msg: "Data not found" });
  }

  reply.code(200).send({ success: true, data: questions, msg: "Data found" });
};

export const generateQuiz = async (
  request: FastifyRequest<{ Body: genQuiz }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  function shuffleFisherYates(array) {
    let i = array.length;
    while (i--) {
      const ri = Math.floor(Math.random() * (i + 1));
      [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
  }

  Question.aggregate([
    {
      $match: {
        language: request.body.language,
        level: request.body.level,
      },
    },
    {
      $sample: {
        size: request.body.size ? request.body.size : 5,
      },
    },
  ])
    .then((data) => {
      // console.log(data);
      // Shuffles all the options before sending:--
      data.map((question) => {
        question.options = shuffleFisherYates(question.options);
      });
      reply.code(200).send({ success: true, data });
    })
    .catch((err) => {
      console.log(err);
      reply.code(400).send({ success: false, msg: "Data not found" });
    });
};

export const addQuestion = (request: FastifyRequest, reply: FastifyReply) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  const newQuestion = new Question(request.body);
  newQuestion.save((err, qst) => {
    if (err || !qst) {
      return reply.code(500).send({
        success: false,
        msg: err.message ? err.message : "Something went wrong, Try again",
      });
    }

    reply.code(200).send({ success: true, msg: "Question added" });
  });
};

export const updateQuestion = (
  request: FastifyRequest<{ Params: params }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  if (request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    Question.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true, useFindAndModify: false },
      (err, updatedQues) => {
        if (err || !updatedQues)
          return reply.code(400).send({
            success: false,
            message: "Something went wrong, Please try again",
          });
        return reply.code(200).send({
          success: true,
          msg: "Question updated sucessfully",
          data: updatedQues,
        });
      }
    );
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid id" });
  }
};

export const removeQuestion = (
  request: FastifyRequest<{ Params: params }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  if (request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    Question.findByIdAndRemove(request.params.id)
      .then((question) => {
        if (!question) {
          return reply
            .code(400)
            .send({ success: false, msg: "Something went wrong, Try again" });
        }

        reply
          .code(200)
          .send({ success: true, msg: "Question deleted", data: question });
      })
      .catch((err) =>
        reply
          .code(500)
          .send({ success: false, msg: "Something went wrong, Try again" })
      );
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid id" });
  }
};
