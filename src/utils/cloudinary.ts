import cloudinary from "cloudinary";

const cloud = cloudinary.v2;

cloud.config({
  cloud_name: process.env.CLOUD_CONNECT,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloud.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder: folder,
      },
      (error, result) => {
        resolve(result.url);
      }
    );
  });
};

export { cloud, uploads };
