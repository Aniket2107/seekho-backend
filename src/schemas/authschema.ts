export const loginSchema = {
  summary: "login",
  body: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
    required: ["email", "password"],
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
          type: "string",
          // type: "object",
          // properties: {
          //   token: { type: "string" },
          //   user: {
          //     type: "object",
          //     properties: {
          //       _id: { type: "string" },
          //       email: { type: "string" },
          //     },
          //   },
          // },
        },
      },
    },
  },
};

export const registerSchema = {
  summary: "register",
  body: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
      name: { type: "string" },
    },
    required: ["email", "password", "name"],
  },
  response: {
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
          type: "string",
          // type: "object",
          // properties: {
          //   email: { type: "string" },
          //   name: { type: "string" },
          // },
        },
      },
    },
  },
};

export const adminLoginSchema = {
  summary: "login",
  body: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
    required: ["email", "password"],
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
          type: "object",
          properties: {
            token: { type: "string" },
            user: {
              type: "object",
              properties: {
                _id: { type: "string" },
                isAdmin: { type: "boolean" },
              },
            },
          },
        },
      },
    },
  },
};
