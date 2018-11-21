"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("positions", "deadline", Sequelize.DATEONLY);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("positions", "deadline");
  }
};
