import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { useState } from "react";
import { UploadWidget } from "./UploadWidget.jsx";

export const RecordImageUpload = ({ formData, setFormData }) => {
  const [publicId, setPublicId] = useState("");
  // Replace with your own cloud name
  const [cloudName] = useState(import.meta.env.VITE_CLOUD_NAME);
  // Replace with your own upload preset
  const [uploadPreset] = useState(import.meta.env.VITE_PRESET);

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
  });

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);

  return (
    <div>
      <UploadWidget
        uwConfig={uwConfig}
        setPublicId={setPublicId}
        formData={formData}
        setFormData={setFormData}
      />

      <div style={{ width: "800px" }}>
        <AdvancedImage
          style={{ maxWidth: "100%" }}
          cldImg={myImage}
          plugins={[responsive(), placeholder()]}
        />
      </div>
    </div>
  );
};

// import { useEffect, useRef } from "react";

// export const RecordImageUpload = () => {
//   const cloudinaryRef = useRef();
//   const widgetRef = useRef();

//   useEffect(() => {
//     cloudinaryRef.current = window.cloudinary;
//     widgetRef.current = cloudinaryRef.current.createUploadWidget(
//       {
//         cloudName: import.meta.env.VITE_CLOUD_NAME,
//         uploadPreset: import.meta.env.VITE_PRESET,
//         showAdvancedOptions: true,
//       },
//       function (error, result) {
//       }
//     );
//   }, []);

//   return (
//     <button className="btn-fun" onClick={() => widgetRef.current.open()}>
//       Upload Photos
//     </button>
//   );
// };

// Upload Widget Configuration
// Remove the comments from the code below to add
// additional functionality.
// Note that these are only a few examples, to see
// the full list of possible parameters that you
// can add see:
//   https://cloudinary.com/documentation/upload_widget_reference
