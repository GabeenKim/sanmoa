const Sequelize = require('sequelize');

module.exports = class Mountain extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: { type: Sequelize.STRING(50) },
        location: { type: Sequelize.STRING },
        level: { type: Sequelize.STRING(50) },
        content: { type: Sequelize.STRING(1000) },
        root: { type: Sequelize.STRING(1000) },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Mountain',
        tableName: 'Mountains',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {}
};
