# Pipeline CI/CD

1. Instalación dependencias vía pnpm.
2. Migraciones y seeds contra Postgres efímero.
3. Lint global (`pnpm lint`).
4. Tests unitarios e integración (`pnpm test`).
5. Playwright headless.
6. Builds de Next.js y NestJS.
7. Artefactos generados se publican como outputs opcionales.

Despliegues se integran vía GitHub Actions environments apuntando a Fly.io (API) y Vercel/Netlify (web).
