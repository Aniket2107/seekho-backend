export const addLang = {
  summary: "Add language",
  body: {
    type: "object",
    properties: {
      language: { type: "string" },
    },
    required: ["language"],
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
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
        data: {
          type: "object",
          properties: {
            language: { type: "string" },
            levels: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
      },
    },
  },
};

export const addCat = {
  summary: "Add level",
  body: {
    type: "object",
    properties: {
      language: { type: "string" },
      newLevel: { type: "string" },
    },
    required: ["langage", "newLevel"],
  },
  response: {
    "4xx": {
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

export const getLanguages = {
  summary: "Get languages",
  response: {
    404: {
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
        msg: { type: "string" },
        data: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
  },
};

export const getCategories = {
  summary: "Get categories",
  params: {
    type: "object",
    properties: {
      lang: { type: "string" },
    },
    required: ["lang"],
  },
  response: {
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
    201: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        msg: { type: "string" },
        data: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
  },
};

export const getAllData = {
  summary: "Get all data",
  response: {
    401: {
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
        msg: { type: "string" },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              langauge: { type: "string" },
              levels: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};
