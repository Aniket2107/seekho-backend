import { FastifyReply, FastifyRequest } from "fastify";
import Collection from "../models/collectionModel";

import { addCollectionType } from "../types";

export const getCollection = async (
  request: FastifyRequest<{ Body: addCollectionType }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  if (request.body.userId.match(/^[0-9a-fA-F]{24}$/)) {
    const userExists = await Collection.findOne({
      userId: request.body.userId,
    }).populate("Collection");

    if (userExists) {
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
      const vocabExists = await userExists.collection.find(
        (el) => el == request.body.vocabId
      );

      if (vocabExists) {
        return reply
          .code(400)
          .send({ success: false, msg: "Vocab already exists" });
      }

      userExists.collection.push(request.body.vocabId);

      await userExists.updateOne(userExists);
    } else {
      const newCollection = new Collection({
        userId: request.body.userId,
        collection: [request.body.vocabId],
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

//get and delete
