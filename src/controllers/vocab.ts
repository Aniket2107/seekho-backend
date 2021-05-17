import { FastifyReply, FastifyRequest } from "fastify";

import { uploads } from "../utils/cloudinary";
import Vocab from "../models/vocabModel";
import { params, vocabBodyType } from "../types";

export const getVocabById = async (
  request: FastifyRequest<{ Params: params }>,
  reply: FastifyReply
) => {
  if (request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const vocab = await Vocab.findOne({ _id: request.params.id });

    if (!vocab) {
      return reply.code(404).send({ success: false, msg: "Vocab not found" });
    }

    reply.code(200).send({ success: true, data: vocab });
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid id" });
  }
};

export const getALlVocabs = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const vocabList = await Vocab.find();

  if (vocabList.length === 0)
    return reply.code(404).send({ success: false, msg: "Vocab not found" });

  reply.code(200).send({ success: true, data: vocabList });
};

export const getVocabByLanguage = async (
  request: FastifyRequest<{ Params: { language: string } }>,
  reply: FastifyReply
) => {
  const vocabList = await Vocab.find({ language: request.params.language });

  if (!vocabList || vocabList.length === 0) {
    return reply.code(404).send({ success: false, msg: "Vocab not found" });
  }

  reply.code(200).send({ success: true, data: vocabList });
};

export const addVocab = async (
  request: FastifyRequest & { files: any; body: vocabBodyType },
  reply: FastifyReply
) => {
  if (!request.body) {
    return reply.code(400).send({
      success: false,
      msg: "Please insert valid data",
    });
  }

  const data = await request.files;

  const uploader = async (path) => await uploads(path, "Home");

  let audioUrl;
  let imageUrl;

  const path1 = data["image"][0].filename;
  imageUrl = await uploader(path1);

  const path2 = data["audio"][0].filename;
  audioUrl = await uploader(path2);

  const newVocab = new Vocab({
    ...request.body,
    image: imageUrl,
    audio: audioUrl,
  });
  newVocab.save((err, vocab) => {
    if (err || !vocab) {
      return reply.code(500).send({
        success: false,
        msg: err.message ? err.message : "Something went wrong, Try again",
        err,
      });
    }

    reply.code(200).send({ success: true, msg: "Vocab added", data: vocab });
  });
};

export const UpdateVocab = async (
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
    const newVocab = await Vocab.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true }
    );

    if (!newVocab) {
      return reply
        .code(500)
        .send({ success: false, msg: "Something went wrong, Try again" });
    }
    reply
      .code(200)
      .send({ success: true, msg: "Vocab updated", data: newVocab });
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid id" });
  }
};

export const delateVocab = async (
  request: FastifyRequest<{ Params: params }>,
  reply: FastifyReply
) => {
  if (request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    Vocab.findByIdAndRemove(request.params.id).then((vocab) => {
      if (!vocab) {
        return reply
          .code(500)
          .send({ success: false, msg: "Something went wrong, Try again" });
      }

      reply.code(200).send({
        success: true,
        msg: "Vocab deleted sucessfully..",
        data: vocab,
      });
    });
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid id" });
  }
};
