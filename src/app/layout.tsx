import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Image from "next/image";
import playersIcon from "../../public/players.svg";
import historyIcon from "../../public/history.svg";
import shirtIcon from "../../public/shirt.svg";
import settingsIcon from "../../public/settings.svg"
import Link from "next/link";

export const metadata: Metadata = {
  title: "Asta Fantacalcio",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <div className="btm-nav z-10">
          <Link href='/' id="home" className="text-center">
            <Image
                priority
                src={playersIcon}
                height={25}
                width={25}
                alt="Home">
            </Image>
          </Link>
          <Link href='/teams' id="teams">
            <Image
                priority
                src={shirtIcon}
                height={25}
                width={25}
                alt="Teams">
            </Image>
          </Link>
          <Link href='/history' id="history">
            <Image
                priority
                src={historyIcon}
                height={25}
                width={25}
                alt="History">
            </Image>
          </Link>
          <Link href='/settings' id="settings">
            <Image
                priority
                src={settingsIcon}
                height={25}
                width={25}
                alt="Settings">
            </Image>
          </Link>
        </div>
      {children}</body>
    </html>
  );
}
