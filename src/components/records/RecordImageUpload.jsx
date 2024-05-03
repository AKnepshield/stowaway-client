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
