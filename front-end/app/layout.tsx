import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "./components/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Next Game",
  description: "",
};

const helveticaNow = localFont({
  src: [
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-ExtBdIta.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-BoldItalic.woff2',
      weight: 'bold',
      style: 'italic',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-RegIta.woff2',
      weight: 'normal',
      style: 'italic',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-ExtLtIta.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-ThinItalic.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-ExtraLight.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../public/assets/fonts/helveticaNow/HelveticaNowText-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: "--font-helvetica-now"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${helveticaNow.variable} ${inter.className}`}>

        <Layout>

          {children}

        </Layout>

      </body>

    </html>
  );
}
