const Sequelize = require('sequelize');

module.exports = class hikingdata extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        startpoint: { type: Sequelize.STRING(1000) },
        endpoint: { type: Sequelize.STRING(1000) },
        totallength: { type: Sequelize.STRING(1000) },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'hikingdata',
        tableName: 'hikingdatas',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.hikingdata.belongsTo(db.mountaindata, {
      foriegnKey: 'mountainid',
      targetKey: 'id',
    });
  }
};
