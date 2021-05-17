export const getquestions = {
  summary: "get questions",
  response: {
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
              _id: { type: "string" },
              question: { type: "string" },
              language: { type: "string" },
              level: { type: "string" },
              time: { type: "number" },
              options: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    option: { type: "string" },
                    isCorrect: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
    },
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
  },
};

export const getQuestionsById = {
  summary: "Get questoin by Id",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            question: { type: "string" },
            language: { type: "string" },
            level: { type: "string" },
            time: { type: "number" },
            options: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  option: { type: "string" },
                  isCorrect: { type: "boolean" },
                },
              },
            },
          },
        },
      },
    },
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
    500: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
      },
    },
  },
};

export const editQuestion = {
  summary: "Update/Delete question",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    400: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
      },
    },
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
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            question: { type: "string" },
            language: { type: "string" },
            level: { type: "string" },
            time: { type: "number" },
            options: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  option: { type: "string" },
                  isCorrect: { type: "boolean" },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const genQuiz = {
  summary: "Generate quiz",
  body: {
    type: "object",
    properties: {
      language: { type: "string" },
      level: { type: "string" },
      size: { type: "number" },
    },
    required: ["language", "level"],
  },
  response: {
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
              _id: { type: "string" },
              question: { type: "string" },
              language: { type: "string" },
              level: { type: "string" },
              time: { type: "number" },
              options: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    option: { type: "string" },
                    isCorrect: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
    },
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
  },
};

export const addQuestion = {
  summary: "Add question",
  body: {
    type: "object",
    properties: {
      question: { type: "string" },
      language: { type: "string" },
      level: { type: "string" },
      options: {
        type: "array",
        items: {
          type: "object",
          properties: {
            option: { type: "string" },
            isCorrect: { type: "boolean" },
          },
        },
      },
      time: { type: "number" },
    },
    required: ["language", "level", "question", "time", "options"],
  },
  response: {
    400: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
      },
    },
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
  },
};
