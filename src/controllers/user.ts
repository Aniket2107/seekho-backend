import { FastifyReply, FastifyRequest } from "fastify";
import User from "../models/userModel";

export const updateProfile = async (
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) => {
  if (request.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    const user = await User.findOne({ _id: request.params.userId });

    user
      .updateOne(request.body)
      .then((res) => {
        return reply.code(200).send({ success: true, msg: "Profile updated" });
      })
      .catch((err) => {
        return reply.code(500).send({
          success: false,
          msg: err.message ? err.message : "Something went wrong, Try again",
        });
      });
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid userId" });
  }
};

export const getUserData = async (
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) => {
  if (request.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    const user = await User.findOne({ _id: request.params.userId });

    if (!Object.keys(user).length) {
      return reply.code(404).send({ success: false, msg: "User not found" });
    }

    reply.code(201).send({ success: true, data: user });
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid userId" });
  }
};
