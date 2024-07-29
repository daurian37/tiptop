/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./globals.css";

export const metadata = {
  title: "Thé Tip Top",
  description: "Jeu concours pour gagner des lots",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
        <meta name="keywords" content="" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <link rel="icon" href="images/fevicon.png" type="image/gif" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />

        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body>
        <Header/>
        <div id="root" className="body">{children}</div>
        <Footer/>
      </body>
    </html>
  );
}
