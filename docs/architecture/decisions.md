# Decisiones & Trade-offs

## Stack Next.js + NestJS
- **Decisión**: Utilizar Next.js con App Router para el frontend y NestJS con Fastify para el backend.
- **Motivación**: Equilibrio entre productividad, ecosistema maduro y soporte a SSR/SSG para SEO.
- **Riesgos**: Curva de aprendizaje para el equipo → mitigado con documentación interna.

## Multi-tenant por columna `tenant_id`
- **Decisión**: Implementar aislamiento lógico usando `tenant_id` en todas las tablas de negocio.
- **Motivación**: Sencillez operativa frente a esquemas por cliente.
- **Riesgos**: Necesidad de policies estrictas en Prisma y middleware de autorización.

## Generación asistida por IA local
- **Decisión**: Abstraer proveedor LLM mediante `packages/config` para permitir modelos self-hosted.
- **Motivación**: Evitar lock-in con APIs propietarias.
- **Riesgos**: Calidad del modelo inferior en local → permitir override por entorno.

## Almacenamiento S3-compatible
- **Decisión**: Usar MinIO en local y permitir AWS S3 u otros providers en producción.
- **Motivación**: Uniformidad API y facilidad de pruebas.
- **Riesgos**: Requiere configuración de credenciales → solucionado con `.env.example` y docs.

## BullMQ sobre Redis
- **Decisión**: BullMQ para orquestar jobs de generación/export/deploy.
- **Motivación**: Integración nativa con NestJS y patrones de retry/delay.
- **Riesgos**: Redis único punto de falla → configurar clustering en producción.

## Observabilidad con OpenTelemetry
- **Decisión**: Exponer métricas y trazas estándar con OTEL para ser consumidas por Prometheus/Grafana/Tempo.
- **Motivación**: Evitar vendors cerrados y cumplir requisitos de observabilidad.
- **Riesgos**: Sobrecoste de configuración → automatizado vía `packages/config`.
