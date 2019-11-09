const postImage = require('./upload');

const home = {
  method: 'GET',
  path: '/',
  handler: (req, h) => ({ message: 'hello hapi!' }),
}

module.exports = [].concat(home, postImage);