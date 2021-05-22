import * as userController from "../controllers/user";
import * as userMiddleware from "../middlewares/user";
import * as userSchema from "../schemas/userSchema";

export default function userHandler(server, options, done) {
  server.get(
    "/",
    { schema: userSchema.userSchema, attachValidation: true },
    userController.getAllUsers
  );

  server.get(
    "/:userId",
    {
      schema: userSchema.singleUser,
      attachValidation: true,
      preHandler: userMiddleware.updateUserPoints,
    },
    userController.getUserData
  );

  server.post("/update/:userId", userController.updateProfile);

  done();
}
