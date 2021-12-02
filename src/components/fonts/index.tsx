import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Comic Sans MS';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./comici.ttf') format('ttf')
      }
      /* latin */
      @font-face {
        font-family: 'Comic Sans MS';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./comici.ttf') format('ttf')
      }
      `}
  />
);

export default Fonts;
