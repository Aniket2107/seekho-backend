import { FastifyInstance, HookHandlerDoneFunction } from "fastify";

import * as collectionController from "../controllers/collection";

export default function (
  server: FastifyInstance,
  options,
  done: HookHandlerDoneFunction
) {
  server.get("/get/:userId", collectionController.getCollection);

  server.post("/add", collectionController.addCollection);

  server.delete(
    "/delete/:userId/:vocabId",
    collectionController.deleteCollection
  );

  done();
}
