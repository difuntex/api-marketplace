"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class InvalidRequestException extends LogicalException {
  constructor(errorMessage) {
    super(errorMessage, 401);
  }

  handle(error, { response }) {
    response.status(401).send({
      success: false,
      code: this.code,
      message: error.message
    });
  }
}

module.exports = InvalidRequestException;
