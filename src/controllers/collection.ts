import { FastifyReply, FastifyRequest } from "fastify";
import Collection from "../models/collectionModel";

import { addCollectionType } from "../types";

export const getCollection = async (
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  if (request.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    const userExists = await Collection.findOne({
      userId: request.params.userId,
    }).populate("vocabCollection");

    if (userExists && userExists.vocabCollection.length > 0) {
      reply.code(200).send({ success: true, data: userExists });
    } else {
      return reply
        .code(400)
        .send({ success: false, msg: "Something went wrong, Try again" });
    }
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid userId" });
  }
};

export const addCollection = async (
  request: FastifyRequest<{ Body: addCollectionType }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  if (
    request.body.userId.match(/^[0-9a-fA-F]{24}$/) &&
    request.body.vocabId.match(/^[0-9a-fA-F]{24}$/)
  ) {
    const userExists = await Collection.findOne({
      userId: request.body.userId,
    });

    if (userExists) {
      const vocabExists = await userExists.vocabCollection.find(
        (el) => el == request.body.vocabId
      );

      if (vocabExists) {
        return reply
          .code(400)
          .send({ success: false, msg: "Vocab already exists" });
      }

      userExists.vocabCollection.push(
        ...userExists.vocabCollection,
        request.body.vocabId
      );

      await userExists.updateOne(userExists);

      return reply.code(200).send({ success: true, msg: "Vocab pushed" });
    } else {
      const newCollection = new Collection({
        userId: request.body.userId,
        vocabCollection: [request.body.vocabId],
      });

      newCollection.save((err, col) => {
        if (err || !col) {
          return reply
            .code(400)
            .send({ success: false, msg: "Something went wrong, Try again" });
        }

        reply
          .code(200)
          .send({ success: true, msg: "Vocab added to collection" });
      });
    }
  } else {
    return reply
      .code(500)
      .send({ success: false, msg: "Enter valid objectId" });
  }
};

export const deleteCollection = async (
  request: FastifyRequest<{ Params: addCollectionType }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  if (
    request.params.userId.match(/^[0-9a-fA-F]{24}$/) &&
    request.params.vocabId.match(/^[0-9a-fA-F]{24}$/)
  ) {
    const userExists = await Collection.findOne({
      userId: request.params.userId,
    });

    if (userExists) {
      const vocab = userExists.vocabCollection.filter(
        (cl) => cl != request.params.vocabId
      );

      userExists.vocabCollection = vocab;

      await userExists.updateOne(userExists);

      return reply.code(200).send({ success: true, msg: "vocab deleted" });
    }

    return reply.code(404).send({ success: false, msg: "NO data found" });
  } else {
    return reply
      .code(500)
      .send({ success: false, msg: "Enter valid objectId" });
  }
};

//get and delete
