import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
export const metadata = {
  title: "Max Live Agent",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <PrimeReactProvider>
        
      <body className={`${poppins.variable} bg-[#EEF0F6] overflow-x-hidden`}>
        {children}
      </body>
      </PrimeReactProvider>
    </html>
  );
}
