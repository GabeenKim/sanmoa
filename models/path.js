const Sequelize = require('sequelize');

module.exports = class path extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        MNTN_NM: { type: Sequelize.STRING },
        PMNTN_SN: { type: Sequelize.STRING },
        paths_x: { type: Sequelize.STRING },
        paths_y: { type: Sequelize.STRING },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'path',
        tableName: 'paths',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {}
};
