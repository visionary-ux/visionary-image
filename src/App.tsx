import { useState } from "react";

import { Image } from "./components/Image/Image";

import "./App.scss";

function App() {
  const [imageSrc] = useState(
    "https://cdn.visionary.cloud/image/Y3Fra2RzdHFwcCEyMDAwITEzMzMhYTdjMWM0IVVuR20zfC5tdFFzLnlGYmNSamFmSW9SUFdCV1dSKk5HVkBqWyE0ITQ/md/image.jpg"
  );
  const [isImageLayerDisabled, setIsImageLayerDisabled] = useState(false);
  const [isBlurLayerDisabled, setIsBlurLayerDisabled] = useState(false);
  const [preventDrag, setPreventDrag] = useState(true);

  return (
    <div>
      <div>
        <strong>
          <code>Visionary Image</code>
        </strong>
        <p>
          For more examples, see Storybook <code>(npm run storybook)</code>
        </p>
      </div>

      <div>
        <div className="input-inline">
          <input
            checked={isImageLayerDisabled}
            id="input-isImageLayerDisabled"
            onChange={() => setIsImageLayerDisabled(!isImageLayerDisabled)}
            type="checkbox"
          />
          <label htmlFor="input-isImageLayerDisabled">disableImageLayer</label>
        </div>

        <div className="input-inline">
          <input
            checked={isBlurLayerDisabled}
            id="input-isBlurLayerDisabled"
            onChange={() => setIsBlurLayerDisabled(!isBlurLayerDisabled)}
            type="checkbox"
          />
          <label htmlFor="input-isBlurLayerDisabled">disableBlurLayer</label>
        </div>

        <div className="input-inline">
          <input
            checked={preventDrag}
            id="input-preventDrag"
            onChange={() => setPreventDrag(!preventDrag)}
            type="checkbox"
          />
          <label htmlFor="input-preventDrag">preventDrag</label>
        </div>
      </div>

      <div className="mt">
        <Image
          alt="White-petaled cherry blossom focused against a blurry background"
          debug
          disableBlurLayer={isBlurLayerDisabled}
          hideImageLayer={isImageLayerDisabled}
          preventDrag={preventDrag}
          preventSelection
          punch={1}
          src={imageSrc}
        />
      </div>

      <div></div>
    </div>
  );
}

export default App;
