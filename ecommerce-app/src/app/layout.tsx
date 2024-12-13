import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { fetchGTMId } from "@/utils/fetchGTMId";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skill & You | Technical test",
  description: "E-commerce website for Skill & You technical test",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = await fetchGTMId();

  return (
    <html lang="en">
      <head>
        {gtmId && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){
                    w[l]=w[l]||[];
                    w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;
                    f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${gtmId}');
                `,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  if (window.dataLayer) {
                    window.dataLayer.push({
                      event: 'page_view',
                      page_name: document.title,
                      page_path: window.location.pathname,
                    });
                  }
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
