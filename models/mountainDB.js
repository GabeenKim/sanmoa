const Sequelize = require('sequelize');

module.exports = class mountaindata extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: { type: Sequelize.STRING(50) },
        location_x: { type: Sequelize.DOUBLE },
        location_y: { type: Sequelize.DOUBLE },
        level: { type: Sequelize.STRING(50) },
        content: { type: Sequelize.STRING(1000) },
        root: { type: Sequelize.STRING(1000) },
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
  static associate(db) {
    db.mountaindata.hasMany(db.hikingdata, {
      foriegnKey: 'mountainid',
      targetKey: 'id',
    });
  }
};
