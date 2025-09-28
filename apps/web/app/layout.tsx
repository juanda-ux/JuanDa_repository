import type { ReactNode } from 'react';
import './globals.css';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: 'WebSmith Studio',
  description: 'Genera sitios web modernos con IA y un editor visual accesible.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <a href="#main" className="skip-link">
          Saltar al contenido principal
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <span className="text-xl font-bold">WebSmith Studio</span>
                <nav aria-label="Principal" className="flex gap-4 text-sm">
                  <a href="/features">Características</a>
                  <a href="/pricing">Planes</a>
                  <a href="/blog">Blog</a>
                  <a href="/login" className="rounded-md bg-blue-600 px-3 py-1.5 text-white">
                    Iniciar sesión
                  </a>
                </nav>
              </div>
            </header>
            <main id="main" className="flex-1">
              {children}
            </main>
            <footer className="border-t border-slate-200 bg-white py-10 text-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-slate-500 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
                <p>&copy; {new Date().getFullYear()} WebSmith Studio. Todos los derechos reservados.</p>
                <div className="flex gap-4">
                  <a href="/legal/terms">Términos</a>
                  <a href="/legal/privacy">Privacidad</a>
                  <a href="/status">Status</a>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
