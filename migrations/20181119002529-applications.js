"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("applications", "decision", {
      type: Sequelize.STRING,
      minlength: 1,
      max_length: 1
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("applications", "decision");
  }
};
