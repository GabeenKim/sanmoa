const { Sequelize } = require('sequelize');
const Post = require('./boardDB');
const commentdata = require('./commentDB');
const hikingdata = require('./hikingDB');
const mountaindata = require('./mountainDB');
const Mountain = require('./mountain');
const storedata = require('./storeDB');
const User = require('./userDB');
const Code = require('./region');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize( //config의 db정보와 연결
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.Post = Post;
db.commentdata = commentdata;
db.hikingdata = hikingdata;
db.mountaindata = mountaindata;
db.storedata = storedata;
db.User = User;
db.Mountain = Mountain;
db.Code = Code;

Post.init(sequelize);
commentdata.init(sequelize);
hikingdata.init(sequelize);
mountaindata.init(sequelize);
storedata.init(sequelize);
User.init(sequelize);
Mountain.init(sequelize);
Code.init(sequelize);

Post.associate(db);
commentdata.associate(db);
hikingdata.associate(db);
mountaindata.associate(db);
storedata.associate(db);
User.associate(db);
Mountain.associate(db);
Code.associate(db);

module.exports = db;
