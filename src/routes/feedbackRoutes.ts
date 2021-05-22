import * as feedbackController from "../controllers/feedback";

export default function (server, options, done) {
  server.get("/", feedbackController.getFeedbacks);

  server.post("/", feedbackController.addFeedback);

  done();
}
