import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./app";
import "./global.css";
import NextTopLoader from 'nextjs-toploader';


export const metadata = {
  title: "Spike Main Demo",
  description: "Spike Main kit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <NextTopLoader color="#0085db" />
        <Providers>
          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}
