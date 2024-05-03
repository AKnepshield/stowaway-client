// const apiName = import.meta.env.VITE_APP_CLOUD_NAME;

// const formData = new FormData();
// formData.append("api_key", apiKey);
// formData.append("signature", apiSecret);

// fetch(`https://api.cloudinary.com/v1_1/${apiName}/image/upload`, {
//   method: "POST",
//   body: formData,
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error("Error:", error));
// const apipreset = import.meta.env.VITE_PRESET;

// export const uploadImageToCloudinary = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", apipreset); // Replace with your Cloudinary upload preset

//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${apiname}/image/upload`, // Replace with your Cloudinary Cloud Name
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const data = await response.json();
//     return data.secure_url;
//   } catch (error) {
//     console.error("Error uploading image to Cloudinary:", error);
//     return null;
//   }
// };
// import cloudinary from "cloudinary";

// cloudinary.config({
//   cloud_name: import.meta.env.VITE_CLOUD_NAME,
//   api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
//   api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
// });

// export const uploadFile = async (file) => {
//   try {
//     const result = await cloudinary.v2.uploader.upload(file);
//     return result.secure_url; // Return the URL of the uploaded file
//   } catch (error) {
//     console.error("Error uploading file to Cloudinary:", error);
//     throw error;
//   }
// };
