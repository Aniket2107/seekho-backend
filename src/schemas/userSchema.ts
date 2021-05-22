export const userSchema = {
  summary: "user",
  resopnse: {
    "4xx": {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
      },
    },
    201: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              dob: { type: "string" },
              age: { type: "number" },
              gender: { type: "string" },
              city: { type: "string" },
              country: { type: "string" },
              whyLearning: { type: "string" },
              knownThrough: { type: "string" },
              dailyGoal: { type: "number" },
              knownLang: { type: "string" },
              learningLang: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              points: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    language: { type: "string" },
                    coins: { type: "number" },
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

export const singleUser = {
  summary: "user",
  response: {
    "4xx": {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
      },
    },
    "5xx": {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
      },
    },
    "2xx": {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            dob: { type: "string" },
            age: { type: "number" },
            gender: { type: "string" },
            city: { type: "string" },
            country: { type: "string" },
            whyLearning: { type: "string" },
            knownThrough: { type: "string" },
            dailyGoal: { type: "number" },
            knownLang: { type: "string" },
            learningLang: {
              type: "array",
              items: {
                type: "string",
              },
            },
            points: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  language: { type: "string" },
                  coins: { type: "number" },
                },
              },
            },
          },
        },
      },
    },
  },
};
