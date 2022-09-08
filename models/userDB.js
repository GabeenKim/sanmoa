const Sequelize = require('sequelize');

module.exports = class userdata extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(50),
        },
        name: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING(100),
        },
        mileage: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'userdata',
        tableName: 'userdatas',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.userdata.hasMany(db.Post, {
      foriegnKey: 'userdatumId',
      targetKey: 'id',
    }); //자식릴레이션인 posts에서 User의 id를 사용할 수 있도록 지정.
  }
};
