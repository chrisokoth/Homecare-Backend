const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Swagger version
    info: {
      title: "MedifyMe API",
      version: "1.0.0",
      description: "API for managing doctor-patient interactions",
    },
    components: {
      schemas: {
        Doctor: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            email: {
              type: "string",
            },
            name: {
              type: "string",
            },
            photo: {
              type: "string",
            },
            token: {
              type: "string",
            },
          },
        },
        Patient: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            age: {
              type: "integer",
            },
          },
        },
      },
    },
  },
  apis: ["./controllers/*.js"], // Point to your controller files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpec };
