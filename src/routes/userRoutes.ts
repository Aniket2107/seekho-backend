import * as userController from "../controllers/user";
import * as userMiddleware from "../middlewares/user";

export default function userHandler(server, options, done) {
  server.get(
    "/:userId",
    { preHandler: userMiddleware.updateUserPoints },
    userController.getUserData
  );

  server.post("/update/:userId", userController.updateProfile);

  done();
}
