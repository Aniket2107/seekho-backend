export const initSchema = {
  summary: "Init algo",
  body: {
    type: "object",
    properties: {
      userId: { type: "string" },
      level: { type: "string" },
      language: { type: "string" },
    },
    required: ["language", "level", "userId"],
  },
  response: {
    200: {
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
    404: {
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

export const postSchema = {
  summary: "Post algo",
  body: {
    type: "object",
    properties: {
      userId: { type: "string" },
      level: { type: "string" },
      language: { type: "string" },
      wordId: { type: "string" },
      status: { type: "number" },
    },
    required: ["language", "level", "userId", "wordId", "status"],
  },
  response: {
    200: {
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
    404: {
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

export const getDataSchema = {
  summary: "Get leitner data",
  params: {
    type: "object",
    properties: {
      userId: { type: "string" },
      language: { type: "string" },
      level: { type: "string" },
    },
    required: ["userId", "level", "language"],
  },
  response: {
    500: {
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
        data: {
          type: "object",
          properties: {
            learningPer: { type: "number" },
            reviewingPer: { type: "number" },
            masteredPer: { type: "number" },
            learningWords: { type: "number" },
            reviewingWords: { type: "number" },
            masteredWords: { type: "number" },
            total: { type: "number" },
            learning: {
              type: "array",
              items: { type: "string" },
            },
            reviewing: {
              type: "array",
              items: { type: "string" },
            },
            mastered: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
      },
    },
  },
};

export const getProgressSchema = {
  summary: "Get user progress",
  params: {
    type: "object",
    properties: {
      userId: { type: "string" },
    },
    required: ["userId"],
  },
  response: {
    500: {
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
    404: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
      },
    },
    200: {
      properties: {
        success: { type: "boolean" },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              date: { type: "string", format: "date" },
              language: { type: "string" },
              wordsLearned: { type: "number" },
            },
          },
        },
      },
    },
  },
};

export const userVocabSchema = {
  summary: "User Vocab schema",
  params: {
    type: "object",
    properties: {
      userId: { type: "string" },
      language: { type: "string" },
      level: { type: "string" },
    },
    required: ["userId", "level", "language"],
  },
  response: {
    500: {
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
              _id: { type: "string" },
              language: { type: "string" },
              level: { type: "string" },
              image: { type: "string" },
              audio: { type: "string" },
              hindiInHindi: { type: "string" },
              englishInEnglish: { type: "string" },
              languageInHindi: { type: "string" },
              languageInEnglish: { type: "string" },
              languageInLanguage: { type: "string" },
            },
          },
        },
      },
    },
  },
};
