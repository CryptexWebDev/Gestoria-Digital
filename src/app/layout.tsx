import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./app";
import "./global.css";
import NextTopLoader from 'nextjs-toploader';


import { SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo"

export const metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
}

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
