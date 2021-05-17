import { login, register, adminLogin } from "../controllers/auth";
import {
  loginSchema,
  registerSchema,
  adminLoginSchema,
} from "../schemas/authschema";

export default function authRoutes(server, options, done) {
  server.post("/login", { schema: loginSchema, attachValidation: true }, login);

  server.post(
    "/register",
    { schema: registerSchema, attachValidation: true },
    register
  );

  server.post(
    "/admin/login",
    { schema: adminLoginSchema, attachValidation: true },
    adminLogin
  );

  server.get(
    "/test",
    { preValidation: [server.authenticate] },
    (req, reply) => {
      reply.send({ msg: "Hello user" });
    }
  );

  done();
}
