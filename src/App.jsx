import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

const App = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dglqbikxe",
    },
  });
  const myImage = cld
    .image("docs/models")
    .resize(fill().width(250).height(250));

  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
};

export default App;
