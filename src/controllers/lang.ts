import { FastifyReply, FastifyRequest } from "fastify";
import { addCat } from "../types";

import Language from "../models/langModel";
import User from "../models/userModel";

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

  if (langExists) {
    return reply
      .code(400)
      .send({ success: false, msg: "Language already exists" });
  }

  const payload = {
    language: request.body.language,
    levels: [],
  };

  let newLang = new Language(payload);
  let lang = await newLang.save();

  console.log(lang);

  if (!lang) {
    return reply
      .code(500)
      .send({ success: false, msg: "Something went wrong, Try again" });
  }

  reply.code(200).send({ success: true, msg: "Language added", data: lang });
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

export const getLangPoints = async (
  request: FastifyRequest<{ Params: { lang: string } }>,
  reply: FastifyReply
) => {
  if (!request.params.lang) {
    return reply.code(400).send({ success: false, msg: "Enter language" });
  }

  const users = await User.find();

  let ranking = [];

  function compare(a, b) {
    const coinA = a.points;
    const coinB = b.points;

    let comparison = 0;
    if (coinA > coinB) {
      comparison = 1;
    } else if (coinA < coinB) {
      comparison = -1;
    }
    return comparison;
  }

  if (users && users.length > 0) {
    users.map((us) => {
      let langEx = us.points.find((lg) => lg.language === request.params.lang);

      if (langEx) {
        ranking.push({ name: us.name, email: us.email, points: langEx.coins });
      }
    });

    //Before sending just sort the values
    ranking.sort(compare);

    reply.code(200).send({ success: true, data: ranking });
  }
  reply.code(500).send({ success: false, msg: "No data available" });
};
