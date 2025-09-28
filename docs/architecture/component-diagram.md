# C4 - Nivel Componente (API)

```mermaid
C4Component
    title Componentes núcleo API
    Container(api, "API", "NestJS") {
        Component(authController, "AuthController", "REST", "Login, registro, refresh tokens")
        Component(projectsController, "ProjectsController", "REST", "CRUD proyectos multi-tenant")
        Component(generatorService, "GeneratorService", "Servicio dominio", "Generación IA, plantillas")
        Component(exportService, "ExportService", "Servicio dominio", "Export a zip")
        Component(deployService, "DeployService", "Servicio dominio", "Deploy 1 clic Vercel/Netlify")
        Component(formHandler, "FormHandler", "REST", "Recepción submissions + spam filter")
        Component(metricsController, "MetricsController", "REST", "Métricas Prometheus")
        Component(webhookController, "StripeWebhook", "REST", "Gestión webhooks Stripe")
    }
    Rel(authController, projectsController, "Usa JWT guard")
    Rel(projectsController, generatorService, "Orquesta generación")
    Rel(generatorService, exportService, "Genera assets base")
    Rel(exportService, deployService, "Dispara despliegue opcional")
    Rel(formHandler, metricsController, "Emite métricas")
```
