import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel";
import { Login, Register } from "../types";

export const login = async (
  request: FastifyRequest<{ Body: Login }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  const user = await User.findOne({ email: request.body.email });
  if (!user) {
    return reply.code(404).send({ success: false, msg: "User not found" });
  }

  const validPass = await bcrypt.compare(request.body.password, user.password);
  if (!validPass) {
    return reply
      .code(400)
      .send({ success: false, msg: "Password does not match" });
  }

  const token = await jwt.sign(
    {
      userId: user._id,
      knownLang: user.knownLang,
      learningLang: user.learningLang,
    },
    process.env.SECRET,
    { expiresIn: "1w" }
  );
  reply.code(200).send({ success: true, msg: "User logged in", data: token });
};

export const register = async (
  request: FastifyRequest<{ Body: Register }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  const userExists = await User.findOne({ email: request.body.email });
  if (userExists) {
    return reply.code(400).send({
      success: false,
      msg: "Email already registered, Try logging in",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(request.body.password, salt);

  let newUser = new User({
    ...request.body,
    password: hash,
  });
  newUser.save((err, user) => {
    if (err || !user) {
      return reply
        .code(400)
        .send({ success: false, msg: "Something went wrong, Try again" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        learningLang: user.learningLang,
        knownLang: user.knownLang,
      },
      process.env.SECRET,
      { expiresIn: "1w" }
    );

    return reply
      .code(200)
      .send({ success: true, msg: "User registered & logged in", data: token });
  });
};

export const adminLogin = async (
  request: FastifyRequest<{ Body: Login }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  const user = await User.findOne({ email: request.body.email });
  if (!user || user.isAdmin === false) {
    return reply.code(404).send({ success: false, msg: "User not found" });
  }

  const validPass = await bcrypt.compare(request.body.password, user.password);
  if (!validPass) {
    return reply
      .code(400)
      .send({ success: false, msg: "Password does not match" });
  }

  const token = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.SECRET,
    { expiresIn: "1w" }
  );
  reply
    .code(200)
    .send({ success: true, msg: "User logged in", data: { user, token } });
};
