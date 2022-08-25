const Sequelize = require('sequelize');

module.exports = class commentdata extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: { type: Sequelize.STRING(1000) },
        date: { type: Sequelize.DATE },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'commentdata',
        tableName: 'commentdatas',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    // db.commentdata.belongsTo(db.boarddata, {
    //   foriegnKey: 'boardid',
    //   targetKey: 'id',
    // });
    // db.commentdata.belongsTo(db.userdata, {
    //   foriegnKey: 'userid',
    //   targetKey: 'id',
    // });
  }
};
