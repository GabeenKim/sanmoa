const Sequelize = require('sequelize');

module.exports = class mountaindata extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        MNTN_NM: { type: Sequelize.STRING },
        MNTN_CODE: { type: Sequelize.STRING },
        PMNTN_SN: { type: Sequelize.STRING },
        PMNTN_NM: { type: Sequelize.STRING },
        PMNTN_DFFL: { type: Sequelize.STRING },
        PMNTN_LT: { type: Sequelize.STRING },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'mountaindata',
        tableName: 'mountaindatas',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {}
};
