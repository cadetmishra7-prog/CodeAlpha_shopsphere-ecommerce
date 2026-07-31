require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

(async () => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    );

    console.log("SUCCESS");
    console.log(result.secure_url);
  } catch (err) {
    console.log("FULL ERROR");
    console.dir(err, { depth: null });

    if (err.response) {
      console.log("Response:");
      console.dir(err.response, { depth: null });
    }
  }
})();