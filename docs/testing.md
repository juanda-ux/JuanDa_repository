# Estrategia de Testing

## Unitarias
- Ejecutar `pnpm --filter apps/api test` para servicios de dominio.
- Ejecutar `pnpm --filter packages/ui test` y `pnpm --filter apps/web test` para componentes React.

## Integración
- `pnpm --filter apps/api test` incluye pruebas con Supertest sobre el módulo HTTP.

## End-to-End
- Playwright (`pnpm --filter apps/web test:e2e`) cubre onboarding (landing → CTA).

## Cobertura
- Configurable vía `vitest --coverage`. Objetivo ≥80% para dominio y servicios.
