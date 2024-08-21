/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
"use client";
import { usePathname } from "next/navigation";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./globals.css";
import { metadata } from "./metadata";
import Script from "next/script";

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const hiddenFooterPaths = ["/profile", "/admin"];
    const isFooterVisible = !hiddenFooterPaths.includes(pathname);

    return (
        <html lang="fr">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
                <meta name="keywords" content="" />
                <meta name="description" content={metadata.description} />
                <meta name="author" content="" />
                <link rel="icon" href="../app/favicon.ico" type="image/gif" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet" />

                <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous" />

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />

                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>

                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-2QP99VQNRS"></Script>
                <Script id="google-analytics">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-2QP99VQNRS');
                    `}
                </Script>
            </head>

            <body>
                <Header />
                <div id="root" className="body">
                    {children}
                </div>
                {isFooterVisible && <Footer />}
            </body>
        </html>
    );
}
