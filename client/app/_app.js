const { default: RootLayout } = require("./layout");
import "./globals.css";

function MyApp({ Component, pagesProps }) {
  return (
    <RootLayout>
      <Component {...pagesProps} />
    </RootLayout>
  );
}
export default MyApp;
