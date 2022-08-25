const Sequelize = require('sequelize');

module.exports = class Code extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        code: { type: Sequelize.STRING(50) },
        location: { type: Sequelize.STRING(100) },
        Existence: { type: Sequelize.STRING(50) },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Code',
        tableName: 'Codes',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {}
};
