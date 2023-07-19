import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
        /* latin */
        @font-face {
          font-family: 'Pixel';
          src: url('../static/fonts/PublicPixel.ttf') format('truetype');
          font-style: normal;
          font-weight: 100;
        }`}
  />
);

export default Fonts;
