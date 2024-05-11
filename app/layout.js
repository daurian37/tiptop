/* eslint-disable @next/next/no-sync-scripts */
import "./globals.css";

export const metadata = {
  title: "Thé Tip Top",
  description: "Jeu concours pour gagner des lots",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="shortcut icon" href="assets/images/favicon.png" />
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

      <body className="body">{children}</body>
    </html>
  );
}
