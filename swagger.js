const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MRYOKOU Tour API',
      version: '1.0.0',
      description: 'API tài liệu cho hệ thống đặt tour du lịch',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'], // chỉ định file chứa swagger comment
};

const specs = swaggerJsDoc(options);
module.exports = specs;
