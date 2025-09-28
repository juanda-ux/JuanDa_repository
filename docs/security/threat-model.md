# Informe de Seguridad

## Metodología
Basado en STRIDE y OWASP ASVS 4.0 nivel 2.

## Activos Críticos
- Datos de usuarios (PII, contraseñas, tokens JWT).
- Contenido generado y assets multimedia.
- Credenciales de despliegue (Vercel/Netlify) y Stripe.

## Amenazas y Mitigaciones
| Amenaza | Mitigación |
| --- | --- |
| Suplantación (Spoofing) | Autenticación multifactor opcional, verificación email, JWT firmados con rotación de refresh tokens. |
| Manipulación (Tampering) | Hash Argon2id, firmas HMAC en webhooks, Prisma con `tenant_id` en middleware, validación Zod. |
| Repudio | Logs auditables con ID de request, guardado en almacenamiento inmutable opcional. |
| Divulgación de información | Cifrado en tránsito (TLS), sanitización de respuestas, secretos gestionados vía variables de entorno. |
| Denegación de servicio | Rate limiting Redis, cola BullMQ con backpressure, circuit breakers en integraciones externas. |
| Elevación de privilegios | RBAC por roles, revisiones de permisos, políticas Prisma y guards NestJS. |

## Controles Técnicos
- Helmet + CSP estricta.
- CSRF tokens en endpoints sensibles (formularios, sesiones).
- Auditoría de dependencias (`pnpm audit`, `npm-audit-resolver`).
- Dependabot/GitHub Alerts.

## Plan de respuesta
1. Detección vía alertas en Prometheus + Grafana.
2. Contención mediante rotación de llaves/secretos.
3. Erradicación: aplicar parches, invalidar tokens.
4. Recuperación: restaurar desde backups diarios automatizados (`packages/database/scripts/backup.sh`).
5. Lecciones aprendidas documentadas en incidentes.
