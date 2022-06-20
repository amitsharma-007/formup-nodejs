const multer = require("multer");
const { S3 } = require("aws-sdk");
const s3 = new S3();

const uuid = require("uuid").v4;

const storage = multer.memoryStorage();

const imageValidation = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

module.exports.uploadImage = multer({
  storage,
  imageValidation,
  limits: { fileSize: 1000000000, files: 2 },
});

module.exports.s3Uploadv1 = async (payload) => {
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${payload.folder ? payload.folder : "common"}/${uuid()}-${
      payload.file.originalname
    }`,
    Body: payload.file.buffer,
  };
  return await s3.upload(param).promise();
};

module.exports.s3Uploadv2 = async (files) => {
  const s3 = new S3();
  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(params.map((param) => s3.upload(param).promise()));
};
