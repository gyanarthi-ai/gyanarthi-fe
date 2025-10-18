import type { Metadata } from "next"
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router"
import "./globals.css"
import { ResearchProvider } from "@/context/ResearchContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: 'Research Dashboard',
  description: 'Find the best science, faster.',
};
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "TanStack Start Starter" }
    ],
  }),
  component: RootLayout,
})
function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
      <Toaster />
        <ResearchProvider>
          <Outlet />
        </ResearchProvider>
        <Scripts />
      </body>
    </html>
  )
}
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="light">
//           <ResearchProvider>
//             {children}
//           </ResearchProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }