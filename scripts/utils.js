const fs = require('fs');
const Path = require('path');

module.exports.deleteDirectory = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = Path.join(path, file);
      fs.unlinkSync(curPath);
    });
    fs.rmdirSync(path);
  }
};
