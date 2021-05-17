export const postResult = {
  summary: "Post result",
  body: {
    type: "object",
    properties: {
      userId: { type: "string" },
      language: { type: "string" },
      level: { type: "string" },
      score: { type: "number" },
      data: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: { type: "string" },
            rightAns: { type: "string" },
            userAns: { type: "string" },
            timeTaken: { type: "number" },
          },
        },
      },
    },
    required: ["userId", "language", "level", "score", "data"],
  },
  response: {
    500: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
      },
    },
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
      },
    },
    400: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
      },
    },
  },
};

export const getUserQuiz = {
  summary: "fetch user quiz data",
  body: {
    type: "object",
    properties: {
      userId: { type: "string" },
      language: { type: "string" },
      level: { type: "string" },
    },
    required: ["userId", "language", "level"],
  },
  response: {
    400: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
      },
    },
    404: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
      },
    },
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              score: { type: "number" },
              date: { type: "string" },
              quizData: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question: { type: "string" },
                    userAns: { type: "string" },
                    rightAns: { type: "string" },
                    timeTaken: { type: "number" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
