import { FastifyReply, FastifyRequest } from "fastify";

import Feedback from "../models/feedbackModel";

export const getFeedbacks = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const feedbacks = await Feedback.find();

  if (!feedbacks || feedbacks.length === 0) {
    return reply
      .code(404)
      .send({ success: false, msg: "No feedbacks available" });
  }

  return reply.code(201).send({ success: true, data: feedbacks });
};

export const addFeedback = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  let feedBack = new Feedback(request.body);

  let savedfeedBack = await feedBack.save();
  if (!savedfeedBack) {
    return reply
      .code(500)
      .send({ success: false, msg: "Something went wrong, Try again" });
  }

  return reply.code(200).send({ success: true, msg: "Response added" });
};
