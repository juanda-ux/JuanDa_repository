# Observabilidad

## Logging
- Pino configurado en NestJS (no incluido en stub) para emitir JSON estructurado.
- Next.js utiliza `console.info` canalizado a la plataforma.

## Métricas
- Endpoint `/metrics` compatible Prometheus.
- Dashboard sugerido en Grafana con tiempos de respuesta y jobs pendientes.

## Trazas
- OpenTelemetry Collector (`infra/otel/otel-config.yaml`) recibe spans OTLP.
- Instrumentación automática con `@opentelemetry/auto-instrumentations-node` en la API.

## Alertas
- Reglas Prometheus: latencia P95 > 1s durante 5m, errores 5xx > 1%.
- Integración con Slack/Email para incidentes.
