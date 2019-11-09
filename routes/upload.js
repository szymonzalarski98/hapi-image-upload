const fs = require('fs');
const cuid  = require('cuid');
const File = require('../models/file.model');

const handleFileUpload = file  => {
  return new Promise((resolve, reject) => {
    const fileName = file.hapi.filename;
    const data = file._data;
    const fileExtension = fileName.split('.')[fileName.split('.').length - 1];
    let fileId = cuid();
    let date = new Date();
    fs.writeFile(`./upload/${fileId}.${fileExtension}`, data, err => {
      if (!err) {
        reject(err);
      }
      File.create({
        fileName,
        fileId,
        date,
      });
      resolve({ message: 'Upload successfully!' });
    });
  });
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
    // handleFileUpload(payload.file);
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