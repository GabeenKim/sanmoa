const Sequelize = require("sequelize");

module.exports = class storedata extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: { type: Sequelize.STRING(50) },
        location: { type: Sequelize.STRING(100) },
        category: { type: Sequelize.STRING(50) },
        content: { type: Sequelize.STRING(1000) },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "storedata",
        tableName: "storedatas",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
