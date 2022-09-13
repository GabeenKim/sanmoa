const { Sequelize } = require('sequelize');
const Post = require('./boardDB');
const commentdata = require('./commentDB');
const storedata = require('./storeDB');
const userdata = require('./userDB');
const path = require('./path');
const mountaindata = require('./mountainDB');

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
db.storedata = storedata;
db.userdata = userdata;
db.path = path;
db.mountaindata = mountaindata;

Post.init(sequelize);
commentdata.init(sequelize);
storedata.init(sequelize);
userdata.init(sequelize);
path.init(sequelize);
mountaindata.init(sequelize);

Post.associate(db);
commentdata.associate(db);
storedata.associate(db);
userdata.associate(db);
path.associate(db);
mountaindata.associate(db);

module.exports = db;
