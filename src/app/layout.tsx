import { Montserrat, Hind, Dancing_Script } from 'next/font/google'
import "./globals.scss";
import Menu from './components/Menu';
import { Metadata } from 'next';


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const hind = Hind({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hind",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
})

export const metadata: Metadata = {
  title: "Constant Bourgois",
  description: "Portfolio de Constant Bourgois, développeur web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${montserrat.variable} ${dancing.variable} ${hind.variable} `} lang="fr">
      <body>
        <Menu></Menu>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
