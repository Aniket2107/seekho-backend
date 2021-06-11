import * as langController from "../controllers/lang";
import * as langSchema from "../schemas/langSchema";

export default function (server, options, done) {
  server.get(
    "/",
    { schema: langSchema.getLanguages, attachValidation: true },
    langController.getLanguages
  );

  server.get(
    "/all",
    { schema: "", attachValidation: true },
    langController.getAllData
  );

  server.get(
    "/level/:lang",
    { schema: langSchema.getCategories, attachValidation: true },
    langController.getCategoryByLang
  );

  server.post(
    "/",
    { schema: langSchema.addLang, attachValidation: true },
    langController.addLanguage
  );

  server.post("/level", langController.addCategory);

  server.get("/ranking/:lang", langController.getLangPoints);

  done();
}
