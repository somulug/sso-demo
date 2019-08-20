// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./keys_prod');
// } else {
//   module.exports = require('./keys_dev');
// }
module.exports = {
  // mongoURI: "mongodb://unifieduser:78dM39JgkmdyR@ds047345.mlab.com",
  // mongo "" --username somulu

  // mongoURI: "mongodb+srv://somulu:Shraddha1!@cluster0-9kqrt.mongodb.net/test",
  mongoURI: "mongodb://localhost:27017/sso-server-server-service",
  secretOrKey: "secret"
};
