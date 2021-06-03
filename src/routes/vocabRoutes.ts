/**
 * @author Aniket Habib
 * @description Vocab Ruotes
 * @auth public
 */

import { FastifyInstance } from "fastify";

import multer from "fastify-multer";
import path from "path";

import * as vocabController from "../controllers/vocab";
import * as vocabSchema from "../schemas/vocabschema";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const checkFileType = (file, cb) => {
  if (file.fieldname === "image") {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else if (file.fieldname === "audio") {
    if (file.mimetype === "audio/mpeg") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
};

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

export default function VocabHandler(server: FastifyInstance, options, done) {
  server.get(
    "/",
    { schema: vocabSchema.listVocab, attachValidation: true },
    vocabController.getALlVocabs
  );

  server.get(
    "/language/:language",
    { schema: vocabSchema.listVocabSchemaByLanguage, attachValidation: true },
    vocabController.getVocabByLanguage
  );

  server.get(
    "/lang-level/:language/:level",
    { schema: vocabSchema.listVocabSchemaByLanguage, attachValidation: true },
    vocabController.getVocabByLanguageAndLevel
  );

  server.get(
    "/id/:id",
    { schema: vocabSchema.listVocabSchemaById, attachValidation: true },
    vocabController.getVocabById
  );

  server.post(
    "/",
    {
      // schema: vocabSchema.addVocabSchema,
      // attachValidation: true,
      preHandler: upload.fields([
        { name: "image", maxCount: 1 },
        { name: "audio", maxCount: 1 },
      ]),
    },
    vocabController.addVocab
  );

  server.put(
    "/:id",
    { schema: vocabSchema.updateVocabSchema, attachValidation: true },
    vocabController.UpdateVocab
  );

  server.delete(
    "/:id",
    { schema: vocabSchema.deleteVocabSchema, attachValidation: true },
    vocabController.delateVocab
  );

  done();
}
