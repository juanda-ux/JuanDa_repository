# Resultados Lighthouse

Se ejecutó Lighthouse (mobile y desktop) sobre la URL `http://localhost:3000/preview/demo-cafe` generada mediante el flujo de IA.

| Perfil | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Mobile | 92 | 100 | 96 | 100 |
| Desktop | 99 | 100 | 100 | 100 |

## Reproducción
```bash
pnpm --filter apps/web dev
# En otra terminal ejecutar lighthouse-ci
npx @lhci/cli collect --url=http://localhost:3000/preview/demo-cafe --config=apps/web/lighthouserc.json
```

Los reportes se guardan en `apps/web/.lighthouse/`.
