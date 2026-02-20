import type { ReactNode } from "react";
import "@/app/(root)/globals.css";

export const metadata = {
  title: "Admin | Cypherzone",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
     <html lang="en" className="dark">
       <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Press+Start+2P&family=Rajdhani:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
        <link rel="icon" href="/public/logo-black.png" />
      </head>
      <body>
        <div className="min-h-screen bg-[#0b0f14] text-white cursor-auto">
          {children}
        </div>
      </body>
      </html>
  );
}
