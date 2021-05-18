import { FastifyReply, FastifyRequest } from "fastify";
import { addCat } from "../types";

import Language from "../models/langModel";

export const addLanguage = async (
  request: FastifyRequest<{ Body: { language: string } }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  const langExists = await Language.findOne({
    language: request.body.language,
  });

  if (Object.keys(langExists).length) {
    return reply
      .code(400)
      .send({ success: false, msg: "Language already exists" });
  }

  const payload = {
    langage: request.body.language,
    levels: [],
  };

  let newLanguage = new Language(payload);
  newLanguage.save((err, lang) => {
    if (err || !lang) {
      return reply
        .code(500)
        .send({ success: false, msg: "Something went wrong, Try again" });
    }

    reply.code(200).send({ success: true, msg: "Language added", data: lang });
  });
};

export const addCategory = async (
  request: FastifyRequest<{ Body: addCat }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  const langData = await Language.findOne({ language: request.body.language });

  if (!Object.keys(langData).length) {
    return reply.code(404).send({ success: false, msg: "Language not found" });
  }

  const levelExists = await langData.levels.find(
    (el) => el === request.body.newLevel
  );
  if (levelExists) {
    return reply
      .code(400)
      .send({ success: false, msg: "Level already exists" });
  }

  langData.levels.push(request.body.newLevel);

  await langData.updateOne(langData);

  reply.code(200).send({ success: true, msg: "Category added" });
};

export const getLanguages = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const langData = await Language.find();

  if (!langData || langData.length === 0) {
    return reply.code(404).send({ success: false, msg: "No data found" });
  }
  const languages: Array<string> = [];

  for (const lang of langData) {
    languages.push(lang.language);
  }

  reply.code(201).send({ success: true, msg: "Data found", data: languages });
};

export const getAllData = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const langData = await Language.find();

  if (!langData || langData.length === 0) {
    return reply.code(404).send({ success: false, msg: "No data found" });
  }

  reply.code(201).send({ success: true, msg: "Data found", data: langData });
};

export const getCategoryByLang = async (
  request: FastifyRequest<{ Params: { lang: string } }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  const langData = await Language.findOne({ language: request.params.lang });
  if (!langData) {
    return reply.code(404).send({ success: false, msg: "No data found" });
  }

  const categories: Array<string> = [];

  langData.levels.map((lg) => {
    categories.push(lg);
  });

  reply.code(201).send({ success: true, msg: "Data found", data: categories });
};
