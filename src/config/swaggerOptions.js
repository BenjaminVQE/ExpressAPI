import dotenv from "dotenv";

dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Exemple",
      version: `${process.env.API_VERSION}`,
      description: "Exemple d'API avec Swagger et Express",
      contact: {
        name: "Benjamin",
        url: "https://www.example.com",
        email: "ton.email@example.com",
      },
    },
    servers: [
      {
        url: `${process.env.API_URL}`, // L'URL de l'API
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

export default swaggerOptions;
