# Checklist de Accesibilidad (WCAG 2.1 AA)

| Ítem | Estado | Evidencia |
| --- | --- | --- |
| Contraste mínimo 4.5:1 | ✅ | Tokens `primary`/`surface` validados con `@accessibility-insights` |
| Navegación por teclado | ✅ | Tests Playwright `a11y.spec.ts` |
| Focus visible | ✅ | Estilos focus en `packages/ui` |
| Roles ARIA | ✅ | Componentes `Hero`, `NavBar`, `FormBuilder` con roles adecuados |
| Etiquetas en formularios | ✅ | Uso de `FormField` + `aria-describedby` |
| Skip links | ✅ | Presente en layout principal `apps/web/app/layout.tsx` |
| Soporte lector pantalla | ✅ | Live regions en notificaciones `ToastProvider` |
| Internacionalización | ✅ | i18next + archivos `apps/web/i18n` |
| Modo oscuro/claro accesible | ✅ | Preferencias `prefers-color-scheme` + tokens específicos |
| Captcha accesible | ✅ | hCaptcha accesible con aria-label personalizado |
