import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
//import { ThemeProvider } from "@emotion/react";
import darkTheme from "./dark.theme";
import { Container, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./header/header";

import Providers from "./providers";
import authenticated from "./auth/authenticated";
import logout from "./auth/logout";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shoppy-ui",
  description: "Building NextJS Demo App",
};

const inter = Inter({ subsets: ["latin"] });

// export default function RootLayoutX({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <AppRouterCacheProvider>
//           <ThemeProvider theme={darkTheme}>
//             <CssBaseline />
//             <Header />
//             <Container>
//                 {children}
//             </Container>
            
//           </ThemeProvider>

//         </AppRouterCacheProvider>
        
//       </body>
//     </html>
//   );
// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await authenticated();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers authenticated={isAuthenticated}>
          <CssBaseline />
           <Header logout={logout} />
          <Container className={isAuthenticated ? "mt-10" : ""}>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
