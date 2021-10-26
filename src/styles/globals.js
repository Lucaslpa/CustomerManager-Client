import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

html,
body {
  padding: 0;
  margin: 0;
  font-size: 62.5% !important;

}

 * {
   box-sizing: border-box;
   font-family: 'Roboto';
 }

h1,
h2,
h3,
h4 {
  margin: 0;
  padding: 0;
}


a {
  text-decoration: none;
}
`
