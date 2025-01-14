import type { Metadata } from "next"; // để làm SEO
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script';
import Link from 'next/link'; //Import thư viện next/link
import Header from "./component/header";
import Footer from "./component/footer";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cửa hàng bán xe đạp",
  description: "Chuyên cung cấp các loại xe đạp như: xe đạp địa hình, xe đạp thể thao, xe đạp trẻ em, xe đạp đường phố,...",
};

// layout gốc
export default function RootLayout(
  {children,}: Readonly<{children: React.ReactNode;}>) 
{
  return ( // trả về HTML hoàn chỉnh 
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `} 
      >  
        <div id="root">
          {/* <ReduxProviders> */}
             {/* biến toàn cục ảnh hưởng header, children, footer */}
             {/* <SearchProvider>  */}
            <div className="bg-white fixed top-0 left-0 z-50 w-full">
              <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto px-8">
                <Header />
              </div> 
            </div>  
            <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto px-8">
              {children}
            </div>
            <div className="bg-white pt-8 pb-1">
              <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto px-8">
                <Footer />
              </div> 
            </div>  
            {/* </SearchProvider> */}
          {/* </ReduxProviders> */}
        </div>
      </body>
      <Script src="/JS/main.js" strategy="afterInteractive" />
    </html>
  );
}
