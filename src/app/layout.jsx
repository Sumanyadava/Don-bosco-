import "./globals.css";
import { SiteShell } from "./components/SiteShell";

export const metadata = {
  title: "Don Bosco Self Employment Research Institute",
  description:
    "Admission information, inquiry, results, events, and trade courses for Don Bosco Self Employment Research Institute, Liluah, Howrah."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('daisyui-theme');
                if (theme) {
                  document.documentElement.setAttribute('data-theme', theme);
                }
              })();
            `
          }}
        />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
