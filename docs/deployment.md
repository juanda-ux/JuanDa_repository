# Guía de Despliegue

## TL;DR
```bash
docker compose -f docker-compose.yml up -d
pnpm install
pnpm build
docker build -t websmith-api -f apps/api/Dockerfile .
docker build -t websmith-web -f apps/web/Dockerfile .
```
Despliega API en Fly.io (`flyctl deploy -c infra/fly/api.toml`) y frontend en Vercel (`vercel --prod`).

## Detallado
1. **Infraestructura base**
   - Provisionar base de datos PostgreSQL y Redis utilizando Terraform (`infra/terraform`).
   - Configurar bucket S3 y credenciales.
2. **Backend (Fly.io)**
   - Configurar secretos: `flyctl secrets set DATABASE_URL=... STRIPE_API_KEY=...`
   - `flyctl deploy -c infra/fly/api.toml`
3. **Frontend (Vercel)**
   - Importar repo, definir variables (`NEXT_PUBLIC_API_URL`, `NEXTAUTH_URL`, etc.).
   - Activar `pnpm` como package manager.
4. **Workers**
   - Desplegar worker BullMQ como proceso adicional en Fly.io (`flyctl deploy -c infra/fly/worker.toml`).
5. **Static hosting alternativo (Netlify)**
   - Ejecutar `pnpm --filter apps/web export` para generar HTML estático.
   - Subir carpeta `apps/web/out` a Netlify.
6. **Observabilidad**
   - Configurar Prometheus para scrapear `/metrics` y OTLP endpoint.
   - Conectar logs a Grafana Cloud o Loki.
7. **Backups**
   - Programar `packages/database/scripts/backup.sh` vía cron/Cloud Scheduler.
