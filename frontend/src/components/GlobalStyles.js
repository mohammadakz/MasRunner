import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --color-cadmium-red: #D80026;
    --color-alabama-crimson: #AA001E;
    --color-blue: #cccccc;
    --color-selective-yellow: #FDBB01;
    --color-desert-sand: #E3C4A6;
    --font-heading: 'Bebas Neue', Arial, Helvetica, sans-serif;
    --font-body: 'Kosugi', Arial, Helvetica, sans-serif;
    --padding-page: 24px;
    --font-p: 'Gluten' Arial, Helvetica, sans-serif;
    --font-logo: 'Ephesis' Arial, Helvetica, sans-serif;
  }
  

  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      vertical-align: baseline;
      font-size: 62.5%;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
      overflow: hidden;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }


a,
li,
blockquote,
input {
  font-family: var(--font-body);
}
p{
  font-family: var(----font-p);
  font-size: 2rem;
  color: #272020;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-style: italic;

}

  /* input {
    font-size: 24px;
    height: 42px;
    border: 2px solid var(--color-orange);
    border-radius: 4px;
    padding: 0 12px;
  } */
`;
