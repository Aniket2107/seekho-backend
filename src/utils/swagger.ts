export const options = {
  routePrefix: "/documentation",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Duolingo backend",
      description: "Documentation",
      version: "1.0.0",
    },
    servers: [
      { url: "http://localhost:8080", description: "development" },
      {
        url: "https://<production-url>",
        description: "production",
      },
    ],
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
};
