export const listVocabSchemaByLanguage = {
  summary: "vocab",
  params: {
    type: "object",
    properties: {
      language: { type: "string" },
    },
    required: ["language"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
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

export const listVocab = {
  summary: "vocab list",
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
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
    404: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
      },
    },
  },
};

export const listVocabSchemaById = {
  summary: "vocab",
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

// export const addVocabSchema = {
//   summary: "add vocab",
//   consumes: ["multipart/form-data"],
//   response: {
//     200: {
//       properties: {
//         success: { type: "boolean" },
//         msg: { type: "string" },
//         data: {
//           type: "object",
//           properties: {
//             _id: { type: "string" },
//             language: { type: "string" },
//             image: { type: "string" },
//             audio: { type: "string" },
//             hindiInHindi: { type: "string" },
//             englishInEnglish: { type: "string" },
//             languageInHindi: { type: "string" },
//             languageInEnglish: { type: "string" },
//           },
//         },
//       },
//     },
//     500: {
//       type: "object",
//       properties: {
//         success: { type: "boolean" },
//         msg: { type: "string" },
//       },
//     },
//     400: {
//       type: "object",
//       properties: {
//         success: { type: "boolean" },
//         msg: { type: "string" },
//       },
//     },
//   },
// };

export const updateVocabSchema = {
  summary: "update vocab",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  body: {
    type: "object",
    properties: {
      hindiInHindi: { type: "string" },
      englishInEnglish: { type: "string" },
      languageInHindi: { type: "string" },
      languageInEnglish: { type: "string" },
      languageInLanguage: { type: "string" },
    },
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
            language: { type: "string" },
            level: { type: "string" },
            hindiInHindi: { type: "string" },
            englishInEnglish: { type: "string" },
            languageInHindi: { type: "string" },
            languageInEnglish: { type: "string" },
            languageInLanguage: { type: "string" },
            audio: { type: "string" },
            image: { type: "string" },
          },
        },
      },
    },
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
  },
};

export const deleteVocabSchema = {
  summary: "delete vocab",
  description: "delete vocab",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
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
  },
};

/*
body: {
    type: "object",
    isFileType: true,
    properties: {
      language: { type: "string" },
      level: { type: "string" },
      image: { isFileType: true, type: "object" },
      audio: { isFileType: true, type: "object" },
      hindiInHindi: { type: "string" },
      englishInEnglish: { type: "string" },
      languageInHindi: { type: "string" },
      languageInEnglish: { type: "string" },
    },
    required: [
      "language",
      "level",
      "image",
      "audio",
      "hindiInHindi",
      "englishInEnglish",
      "languageInHindi",
      "languageInEnglish",
    ],
  },

*/
