import { createContext, useEffect, useState } from "react";
import "./CloudinaryButton.css";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

export const UploadWidget = ({
  uwConfig,
  setPublicId,
  formData,
  setFormData,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [cloudName] = useState(import.meta.env.VITE_CLOUD_NAME);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const handleChange = (info) => {
    setFormData({
      ...formData,
      imageUrl: `https://res.cloudinary.com/${cloudName}/image/upload/v1714697764/${info.public_id}.jpg`,
    });
  };

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setPublicId(result.info.public_id);
            handleChange(result.info);
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button" // Apply custom class for styling
        onClick={initializeCloudinaryWidget}
      >
        Upload Image
      </button>
    </CloudinaryScriptContext.Provider>
  );
};

export { CloudinaryScriptContext };
