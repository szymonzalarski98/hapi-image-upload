const fs = require('fs');

const handleFileUpload = file  => {
  return new Promise((resolve, reject) => {
    const filename = file.hapi.filename
    const data = file._data
    fs.writeFile('./upload/' + filename, data, err => {
      if (!err) {
        reject(err);
      }
      resolve({ message: 'Upload successfully!' });
    })
  })
};

const postImage = {
  method: 'POST',
  path: '/upload',
  options: {
    payload: {
      output: 'stream'
    }
  },
  handler: (req, h) => {
    const { payload } = req;
    const response = handleFileUpload(payload.file);
    return response;
  }
};

const getImage = {
  method: 'GET',
  path: '/upload/{file*}',
  handler: {
    directory: {
      path: 'upload'
    }
  }
}

module.exports = [postImage, getImage];