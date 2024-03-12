import type { Metadata } from "next";
import { Inter, Single_Day } from "next/font/google";
import "./globals.css";
import { Session } from "inspector";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Freddy's dashboard",
  description: "A dashboard for Freddy's shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Context provider for session management
    // <SessionProvider session={session}> 
    <html lang="en">
      <body className={inter.className}>
        {/* <SideNav /> */}
        <div>{children}</div>
      </body>
    </html>
    // </SessionProvider>
  );
}
